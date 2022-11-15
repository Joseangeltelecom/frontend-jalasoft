import axios from "axios";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackArrowIcon from "../../assets/west_black_24dp.svg";
import LoadingSpinner from "../../hooks/LoadingSpinner";

const CommentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fetchedComment, setFetchedComment] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSelectedJob = async (id) => {
    setLoading(true);
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments/${id}`
    );
    setFetchedComment(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSelectedJob(id);
  }, [id]);

  const handleBackRedirection = () => {
    navigate("/dashboard/comments");
  };

  return (
    <Container>
      <SideBlock>
        <BackButton onClick={handleBackRedirection}>
          <Icon
            alt="Go back to search"
            src={BackArrowIcon}
            style={{ padding: "0 1rem 0 0" }}
          />
          Back To Dashboard
        </BackButton>
      </SideBlock>
      <MainBlock>
        {loading && !fetchedComment && (
          <SpinnerContainer>
            <LoadingSpinner />
          </SpinnerContainer>
        )}
        {!loading && fetchedComment && (
          <>
            <Title>
              <CommentName>
                {fetchedComment !== null && fetchedComment?.name}
              </CommentName>
            </Title>
            <Email>{fetchedComment !== null && fetchedComment?.email}</Email>
            <Description
              dangerouslySetInnerHTML={{
                __html: `${fetchedComment !== null && fetchedComment?.body}`,
              }}
            ></Description>
          </>
        )}
        {!loading && !fetchedComment && <p>Nothing to show...</p>}
      </MainBlock>
    </Container>
  );
};

export default CommentDetails;

export const Container = styled.div`
  margin-top: 20px;
  height: 100vh;
  display: flex;
  text-align: left;
  justify-content: center;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

const SideBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-right: 2rem;
`;

const MainBlock = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;

  .responsiveExtraStyles {
    @media screen and (max-width: 450px) {
      padding: 0;
      margin-left: 0;
    }
  }
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  padding: 0 0.5rem;
`;

const BackButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  cursor: pointer;
  width: max-content;

  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;

  color: #1e86ff;
`;

const CommentName = styled.h1`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;

  color: #334680;
  margin-top: 0;
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem 0 1rem 0;
  }

  .extraStyles {
    margin-left: 1rem;

    @media screen and (max-width: 767px) {
      margin: 0;
    }
  }
`;

const Email = styled.h2`
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;

  color: #334680;
  margin-top: 2rem;
`;

const Description = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;

  color: #334680;
  margin-top: 2rem;
`;

const SpinnerContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex: 2;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;
