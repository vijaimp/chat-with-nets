import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders login page", () => {
  render(<App />);
  const chatServerInputTextElement = screen.getByText(/Chat Server address/i);
  const usernameInputTextElement = screen.getByText(/Username/i);
  expect(chatServerInputTextElement).toBeInTheDocument();
  expect(usernameInputTextElement).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
});
