import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";

const CommentList = ({ comment, handleDelete, handleUpdate }) => {
  const navigate = useNavigate();
  const handleCommentDetailsRedirection = () => {
    navigate(`/dashboard/comments/${comment.id}`);
  };

  const handleUpdateComment = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Multiple inputs",
      html:
        `<input placeholder="name" id="swal-input1" class="swal2-input" value=${comment.name}>` +
        `<input placeholder="body" id="swal-input2" class="swal2-input" value=${comment.body}>`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });

    console.log(formValues);

    handleUpdate(comment.id, formValues);
  };

  return (
    <Card>
      <CardBlock1>
        <ButtonsContainer>
          <Button onClick={() => handleDelete(comment.id)}>Delete</Button>
          <Button onClick={handleUpdateComment}>update</Button>
        </ButtonsContainer>
        <CommentName>{comment?.name}</CommentName>
        <CommentBody onClick={handleCommentDetailsRedirection}>
          {comment?.body.slice(0, 100)}
          {comment?.body.length > 100 ? "...Read More" : ""}
        </CommentBody>
      </CardBlock1>
      <CardBlock2>
        <Email>{comment?.email}</Email>
      </CardBlock2>
    </Card>
  );
};

export default CommentList;

const Button = styled.button`
  display: flex;
  align-self: flex-end;
  margin-left: 20px;
`;

const CardBlock1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 10vh;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const CardBlock2 = styled.div`
  font-weight: 500;
  line-height: 14px;
  color: #b9bdcf;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-top: 1rem;

  @media screen and (max-width: 450px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Card = styled.div`
  height: 25vh;
  display: flex;
  flex-direction: column;
  margin: 0.2rem 0;
  padding: 12px;
  min-width: 40%;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  box-sizing: border-box;
  border: 2px solid #fff;
  transition: all 0.3s ease-in-out;

  &:hover {
    border: 2px solid #334680;
  }
`;

const CommentBody = styled.p`
  width: 60%;
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  color: #334680;
  word-break: break-word;
  cursor: pointer;
`;

const CommentName = styled.p`
  font-weight: bold;
  font-size: 12px;
  line-height: 21px;
  color: #334680;
  word-break: break-word;
`;

const Email = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: center;
  padding-right: 30px;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  align-self: flex-end;
  color: #b9bdcf;
  overflow: hidden;
`;
