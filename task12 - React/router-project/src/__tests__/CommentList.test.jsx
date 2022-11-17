import { expect, test } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { url } from "../Pages/DashBoard/DashBoard";
import { render } from "../Utils/test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import CommentList from "../Pages/DashBoard/CommentList";

const server = setupServer(
  rest.get(url, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          postId: 1,
          id: 1,
          name: "id labore ex et quam laborum",
          email: "Eliseo@gardner.biz",
          body: "laudantium enim",
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Display delete button", async () => {
  const { getByTestId } = render(
    <Router>
      <CommentList />
    </Router>
  );

  const deleteButton = getByTestId("deleteButton");
  expect(deleteButton).toBeInTheDocument();
});

test("Display update button", async () => {
  const { getByTestId } = render(
    <Router>
      <CommentList />
    </Router>
  );
  const updateButton = getByTestId("updateButton");
  expect(updateButton).toBeInTheDocument();
});
