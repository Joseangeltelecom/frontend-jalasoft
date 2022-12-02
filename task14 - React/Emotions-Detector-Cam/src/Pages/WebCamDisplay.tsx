import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRef, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import styled from "styled-components";
import { PhotoContext } from "../Context/PhotoContext";
import LoadingSpinner from "../hooks/LoadingSpinner";
import {
  FaceAnnotation,
  FaceDetectorProps,
  ImgObjProps,
  PhotoContextValue,
} from "../Types/Type";
import { style, uniqueId, videoConstraints } from "../Utils/Consts/Const";

export const WebCamDisplay = () => {
  const webcam = useRef<Webcam>(null);
  const [img, setImg] = useState<ImgObjProps | null>(null);
  const [imgPath, setImgPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const { photos, setPhotos } = useContext(PhotoContext) as PhotoContextValue;
  const navigate = useNavigate();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSave = () => {
    if (imgPath) {
      DetectEmotion(imgPath.slice(23));
    }
  };

  const capture = useCallback(() => {
    const imageSrc = webcam.current?.getScreenshot();
    if (imageSrc) {
      setImgPath(imageSrc);
    }
  }, [webcam]);

  const DetectEmotion = async (base64: string) => {
    const body: FaceDetectorProps = {
      requests: [
        {
          image: {
            content: base64,
          },
          features: [
            {
              maxResults: 5,
              type: "FACE_DETECTION",
            },
          ],
        },
      ],
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${
          import.meta.env.VITE_API_KEY
        }`,
        body
      );

      const ProccesedData = response.data.responses[0]
        .faceAnnotations[0] as FaceAnnotation;

      const ImageObj = {
        path: imgPath,
        id: uniqueId(),
        data: ProccesedData,
      };

      if (ImageObj) {
        setImg(ImageObj as ImgObjProps);
      }

      if (img) {
        setPhotos([...photos, img]);
        navigate("/photos");
        setImg(null);
        setImgPath(null);
      }

      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setOpen(true);
      }
    }
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <>
        {imgPath === null ? (
          <VideoContainer>
            <Webcam
              audio={false}
              mirrored={true}
              height={400}
              width={400}
              ref={webcam}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
            <Button
              variant="contained"
              sx={{ width: 400, padding: 1 }}
              onClick={capture}
            >
              Capture photo
            </Button>
          </VideoContainer>
        ) : (
          <div>
            {loading ? (
              <div style={style}>
                <LoadingSpinner />
              </div>
            ) : (
              <TakenImgContainer>
                <TakenImg src={imgPath} alt="screenshot" />
                <ButtonContainer>
                  <Button
                    variant="contained"
                    sx={{ width: 150, padding: 1 }}
                    onClick={() => setImgPath(null)}
                  >
                    Retake
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ width: 150, padding: 1 }}
                    onClick={handleSave}
                  >
                    Process
                  </Button>
                </ButtonContainer>
              </TakenImgContainer>
            )}
          </div>
        )}
      </>
    </>
  );
};

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 50px;
`;

export const TakenImgContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 65vh;
  width: 50vw;
  margin-top: 50px;
  border-radius: 20px;
`;

export const VideoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 65vh;
  width: 50vw;
  margin-top: 50px;
  border-radius: 20px;
`;

export const TakenImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 400px;
  border-radius: 20px;
  margin-top: 50px;
`;
