import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import Pagination from "../../Components/Pagination";
import LoadingSpinner from "../../hooks/LoadingSpinner";
import CommentList from "./CommentList";

const uniqueId = () => Math.floor(Math.random() * Date.now());

const DashBoard = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(99);

  useEffect(() => {
    const getComments = async (currentPage) => {
      try {
        setLoading(true);
        let paramsObject = {
          page: currentPage,
        };
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?_start=${currentPage}&_limit=4`,
          { params: paramsObject }
        );
        setLoading(false);
        setComments(response.data);
        setPageCount(
          Number(response.headers["x-total-count"]) > 99
            ? 99
            : Number(response.headers["x-total-count"])
        );
      } catch (error) {
        console.log(error.message);
      }
    };

    getComments(currentPage);
  }, [currentPage]);

  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/comments${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        Swal.fire(
          "Good job!",
          "Your comment has been deleted Successfully!",
          "success"
        );
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: `<a href="">${error.message}</a>`,
        });
      });
    const filtedComments = comments.filter((comment) => comment.id !== id);
    setComments(filtedComments);
  };

  const handleUpdate = async (id, newComment) => {
    if (newComment) {
      const name = newComment[0];
      const body = newComment[1];
      fetch(`https://jsonplaceholder.typicode.com/comments${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: name,
          body: body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          Swal.fire(
            "Good job!",
            "Your comment has been updated Successfully!",
            "success"
          );
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: `<a href="">${error.message}</a>`,
          });
        });
    }
    if (newComment) {
      const name = newComment[0];
      const body = newComment[1];
      const updatedComment = comments.map((comment) => {
        return comment.id === id ? { ...comment, name, body } : comment;
      });

      setComments(updatedComment);
    }
  };

  const handleCreate = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Multiple inputs",
      html:
        `<input placeholder="name" id="swal-input1" class="swal2-input">` +
        `<input placeholder="body" id="swal-input2" class="swal2-input">` +
        `<input placeholder="email" id="swal-input3" class="swal2-input">`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
        ];
      },
    });

    const newData = {
      name: formValues[0],
      body: formValues[1],
      email: formValues[2],
      id: uniqueId(),
    };
    setComments([...comments, newData]);
    fetch("https://jsonplaceholder.typicode.com/comments", {
      method: "POST",
      body: JSON.stringify({
        name: formValues[0],
        body: formValues[1],
        email: formValues[2],
        id: uniqueId(),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) =>
        Swal.fire("Good job!", "Your comment has been added", "success")
      );
  };

  return (
    <CommentListContainer>
      {loading && comments?.length === 0 && (
        <SpinnerContainer>
          <LoadingSpinner />
        </SpinnerContainer>
      )}
      {<CreateButton onClick={handleCreate}>Add new Comment</CreateButton>}
      {!loading &&
        !!comments?.length &&
        comments.map((comment) => (
          <CommentList
            key={comment.id}
            comment={comment}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))}
      {!loading && !!comments?.length && (
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          setCurrentPage={setCurrentPage}
        />
      )}
      {!loading && (comments?.length === 0 || !comments) && (
        <div>No Jobs available for this criteria!!!</div>
      )}
    </CommentListContainer>
  );
};

export default DashBoard;

const SpinnerContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex: 2;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;

const CreateButton = styled.button`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #334680;
  &:hover {
    background-color: white;
    color: #334680;
  }
`;

CreateButton;

const CommentListContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex: 2;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 767px) {
    max-width: 100%;
  }
`;
