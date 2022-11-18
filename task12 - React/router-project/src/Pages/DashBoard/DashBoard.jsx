import axios from "axios";
import fetch from "cross-fetch";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import Pagination from "../../Components/Pagination";
import LoadingSpinner from "../../hooks/LoadingSpinner";
import CommentList from "./CommentList";

const uniqueId = () => Math.floor(Math.random() * Date.now());
let currentPage;
export const url = `https://jsonplaceholder.typicode.com/comments?_start=${(currentPage = 0)}&_limit=4`;

const DashBoard = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(99);

  useEffect(() => {
    const getComments = async (currentPage = 0) => {
      try {
        setLoading(true);
        let paramsObject = {
          page: currentPage,
        };
        const response = await axios.get(url, { params: paramsObject });
        setLoading(false);
        setComments(response.data);
        setPageCount(
          Number(response.headers["x-total-count"]) > 99
            ? 99
            : Number(response.headers["x-total-count"])
        );
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };

    getComments(currentPage);
  }, [currentPage]);

  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: `<a href="">${response.status}</a>`,
          });
        }
        Swal.fire(
          "Good job!",
          `Your comment has been deleted Successfully! ${response.status}`,
          "success"
        );

        return response.json();
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
      fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: name,
          body: body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          if (!response.ok) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: `<a href="">${response.status}</a>`,
            });
          }
          Swal.fire(
            "Good job!",
            `Your comment has been updated Successfully! ${response.status}`,
            "success"
          );

          return response.json();
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
      title: "Insert a title, comment and email address",
      html:
        `<input placeholder="Title" data-testid="input-title" id="swal-input1" class="swal2-input">` +
        `<input placeholder="comment" data-testid="input-comment" id="swal-input2" class="swal2-input">` +
        `<input placeholder="email"data-testid="input-email" id="swal-input3" class="swal2-input">`,
      focusConfirm: false,

      preConfirm: () => {
        const value1 = document.getElementById("swal-input1").value;
        const value2 = document.getElementById("swal-input2").value;
        const value3 = document.getElementById("swal-input3").value;

        if (value1 && value2 && value3) {
          return [value1, value2, value3];
        } else {
          Swal.showValidationMessage("one input is missing");
        }
      },
    });

    if (formValues) {
      Swal.fire(JSON.stringify(formValues));
    }

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
      .then((response) => {
        if (!response.ok) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: `<a href="">${response.status}</a>`,
          });
        }
        Swal.fire(
          "Good job!",
          `Your comment has been deleted Successfully! ${response.status}`,
          "success"
        );

        return response.json();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: `<a href="">${error.message}</a>`,
        });
      });
  };

  return (
    <CommentListContainer>
      {loading && comments?.length === 0 && (
        <SpinnerContainer data-testid="loading">
          <LoadingSpinner />
        </SpinnerContainer>
      )}
      {
        <CreateButton data-testid="addButton" onClick={handleCreate}>
          Add new Comment
        </CreateButton>
      }
      {!loading &&
        !!comments?.length &&
        comments.map((comment) => (
          <div data-testid="resolved">
            <CommentList
              key={comment.id}
              comment={comment}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          </div>
        ))}
      {error && (
        <p data-testid="alert" role="alert">
          Oops, failed to fetch
        </p>
      )}
      {!loading && !!comments?.length && (
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          setCurrentPage={setCurrentPage}
        />
      )}
      {!loading && (comments?.length === 0 || !comments) && (
        <div>No Comments available!</div>
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
