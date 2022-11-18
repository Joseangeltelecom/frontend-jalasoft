import { expect, test } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import DashBoard, { url } from "../Pages/DashBoard/DashBoard";
import {
  fireEvent,
  queryByText,
  render,
  screen,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "../Utils/test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";

export const comments = [
  {
    postId: 1,
    id: 1,
    name: "Jose Angel comment",
    email: "Eliseo@gardner.biz",
    body: "laudantium enim",
  },
  {
    postId: 1,
    id: 2,
    name: "id labore ex et quam laborummm",
    email: "Eliseoooo@gardner.biz",
    body: "laudantium enimooooo",
  },
];

const server = setupServer(
  rest.get(url, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(comments));
  }),

  rest.delete(
    "https://jsonplaceholder.typicode.com/comments/1",
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.delete(
    "https://jsonplaceholder.typicode.com/comments/2",
    (req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json({ errorMessage: "Error deleting post" })
      );
    }
  ),

  rest.post(
    "https://jsonplaceholder.typicode.com/comments",
    async (req, res, ctx) => {
      const request = await req.json();
      if (request.title === "Test error") {
        return res(
          ctx.status(403),
          ctx.json({ errorMessage: "Error creating the a comment" })
        );
      }
      return res(ctx.status(201), ctx.json({ ...req, id: 101 }));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Display spinner, displays data and disappear spinner", async () => {
  const { getByTestId, getAllByTestId, queryByTestId } = render(
    <Router>
      <DashBoard />
    </Router>
  );

  expect(getByTestId("loading")).toBeInTheDocument();
  const commentItem = await screen.findByText("Jose Angel comment");
  expect(commentItem).toBeVisible();
  const resolvedData = await waitFor(() => getAllByTestId("resolved"));
  expect(resolvedData).toBeDefined();
  await waitFor(() => {
    expect(queryByTestId("loading")).toBeNull();
  });
});

test("Renders the component without comments", async () => {
  server.use(
    rest.get(url, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    })
  );
  render(
    <Router>
      <DashBoard />
    </Router>
  );
  await screen.findByText(/No Comments available!/i);
});

test("Display add button and show modal when clicking", async () => {
  const { getByTestId } = render(
    <Router>
      <DashBoard />
    </Router>
  );
  const addButton = getByTestId("addButton");
  expect(addButton).toBeInTheDocument();
  fireEvent.click(addButton);
  await waitFor(() => screen.getByTestId("input-title"));
});

test("Display delete button, delete a comment", async () => {
  render(
    <Router>
      <DashBoard />
    </Router>
  );

  await waitFor(() =>
    expect(screen.getByText(comments[0].name)).toBeInTheDocument()
  );
  const deleteButton = screen.getByTestId(`deleteButton-1`);
  await userEvent.click(deleteButton);
  expect(screen.queryByText(comments[0].name)).toBeNull();
});

test("It displays a modal when deleting a comment and close it when clicking on 'Ok' button ", async () => {
  render(
    <Router>
      <DashBoard />
    </Router>
  );

  await waitFor(() =>
    expect(screen.getByText(comments[0].name)).toBeInTheDocument()
  );
  const deleteButton = screen.getByTestId(`deleteButton-1`);
  await userEvent.click(deleteButton);
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  fireEvent.click(screen.getByText("OK"));
  expect(screen.queryByRole("dialog")).toBeNull();
});

test("It displays a modal when clicking on the addButton", async () => {
  render(
    <Router>
      <DashBoard />
    </Router>
  );

  const createButton = screen.getByTestId("addButton");
  fireEvent.click(createButton);
  expect(screen.getByRole("dialog")).toHaveTextContent(
    "Insert a title, comment and email address"
  );
});

test("It displays the right content when typing in", async () => {
  render(
    <Router>
      <DashBoard />
    </Router>
  );

  const createButton = screen.getByTestId("addButton");
  fireEvent.click(createButton);
  expect(screen.getByRole("dialog")).toHaveTextContent(
    "Insert a title, comment and email address"
  );

  const inputTitle = screen.getByTestId("input-title");
  const inputComment = screen.getByTestId("input-comment");
  const inputEmail = screen.getByTestId("input-email");

  fireEvent.change(inputTitle, { target: { value: "comment title" } });
  fireEvent.change(inputComment, { target: { value: "my comment" } });
  fireEvent.change(inputEmail, { target: { value: "jose@gmail.com" } });

  expect(inputTitle).toHaveValue("comment title");
  expect(inputComment).toHaveValue("my comment");
  expect(inputEmail).toHaveValue("jose@gmail.com");
});

test("It creates a new post", async () => {
  render(
    <Router>
      <DashBoard />
    </Router>
  );

  const createButton = screen.getByTestId("addButton");
  fireEvent.click(createButton);
  expect(screen.getByRole("dialog")).toHaveTextContent(
    "Insert a title, comment and email address"
  );

  const inputTitle = screen.getByTestId("input-title");
  const inputComment = screen.getByTestId("input-comment");
  const inputEmail = screen.getByTestId("input-email");

  fireEvent.change(inputTitle, { target: { value: "comment title" } });
  fireEvent.change(inputComment, { target: { value: "my comment" } });
  fireEvent.change(inputEmail, { target: { value: "jose@gmail.com" } });

  fireEvent.click(screen.getByText("OK"));
  await waitFor(() =>
    expect(
      screen.getByText("Your comment has been deleted Successfully! 201")
    ).toBeInTheDocument()
  );

  fireEvent.click(screen.getByText("OK"));
  expect(screen.queryByRole("dialog")).toBeNull();
});

test("handles server error", async () => {
  server.use(
    rest.get(url, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  const { getByTestId } = render(
    <Router>
      <DashBoard />
    </Router>
  );

  await waitFor(() => getByTestId("alert"));
  expect(getByTestId("alert")).toHaveTextContent("Oops, failed to fetch");
});
