import { expect, test } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import DashBoard, { url } from "../Pages/DashBoard/DashBoard";
import { fireEvent, render, screen, waitFor } from "../Utils/test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";

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

test("Display spinner, displays data and disappear spinner", async () => {
  const { getByTestId, getAllByTestId, queryByTestId } = render(
    <Router>
      <DashBoard />
    </Router>
  );

  expect(getByTestId("loading")).toBeInTheDocument();
  const commentItem = await screen.findByText("id labore ex et quam laborum");
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
  await waitFor(() => screen.getAllByTestId("modal"));
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
