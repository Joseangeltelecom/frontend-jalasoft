import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, test, vi } from "vitest";
import Welcome, { Button } from "../Pages/Welcome/Welcome";
import { screen, userEvent } from "../Utils/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";

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
  expect(title).toBeDefined();
});

test("should render the button", async () => {
  const GoToDashboardButton = screen.getByRole("button", {
    name: /Go to Dashboard/i,
  });
  expect(GoToDashboardButton).toBeDefined();

  const mockCallBack = vi.fn();
  await userEvent.click(GoToDashboardButton);
  expect(mockCallBack).toHaveBeenCalled();
});

// test("should click the button - v1", async () => {
//   const onClickButton = vi.fn();
//   const GoToDashboardButton = screen.getByRole("button", {
//     name: /Go to Dashboard/i,
//   });
//   //   await userEvent.click(GoToDashboardButton);
//   await fireEvent.click(GoToDashboardButton);
//   expect(onClickButton).toHaveBeenCalled();
// });

// test("should click the button - v2", async () => {
//   const mockCallBack = vi.fn();
//   const GoToDashboardButton = screen.getByRole("button", {
//     name: /Go to Dashboard/i,
//   });
//   render(<Button onClick={mockCallBack}>Go to Dashboard</Button>);
//   await userEvent.click(GoToDashboardButton);
//   expect(mockCallBack).toHaveBeenCalled();
// });
