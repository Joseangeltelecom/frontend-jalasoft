import { expect, test } from "vitest";
import Welcome from "../Pages/Welcome/Welcome";
import { screen, render } from "../Utils/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

beforeEach(() => {
  // setup a DOM element as a render target
  render(
    <Router>
      <Welcome />
    </Router>
  );
});

test("should render the title", async () => {
  const title = screen.getByText("Welcome");
  expect(title).toBeInTheDocument();
});

test("should render the welcomeButton", async () => {
  const GoToDashboardButton = screen.getByTestId("welcomeButton");
  expect(GoToDashboardButton).toBeInTheDocument();
});
