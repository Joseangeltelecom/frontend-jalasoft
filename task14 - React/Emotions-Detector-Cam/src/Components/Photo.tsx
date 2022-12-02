import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "../.././src/App.css";
import { useContext } from "react";
import { PhotoContext } from "../Context/PhotoContext";
import { PhotoContextValue, PhotoProps } from "../Types/Type";

export default function Photo({ img, id, data }: PhotoProps) {
  console.log(data);
  const { photos, setPhotos } = useContext(PhotoContext) as PhotoContextValue;

  const handleDelete = (photoId: number) => {
    const FilteredPhotos = photos.filter((photo) => photo.id !== photoId);
    setPhotos(FilteredPhotos);
  };

  return (
    <Card sx={{ height: "80vh", mt: "40px", width: "400px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          width="100"
          image={img}
          alt="Photo"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <p>
              <b>Anger:</b> {data?.angerLikelihood}
            </p>
            <p>
              <b>Joy:</b> {data?.joyLikelihood}
            </p>
            <p>
              <b>Sorrow:</b> {data?.sorrowLikelihood}
            </p>
            <p>
              <b>Surprise:</b> {data?.surpriseLikelihood}
            </p>
            <p>
              <b>Confidance:</b> {data?.detectionConfidence}
            </p>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => handleDelete(id)}
          size="small"
          color="warning"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
