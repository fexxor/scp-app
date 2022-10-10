import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// TODO: Write tests
test("renders navbar links", () => {
  render(<App />);
  expect(screen.getByText(/Utforska/i)).toBeInTheDocument();
  expect(screen.getByText(/Lägg till/i)).toBeInTheDocument();
  expect(screen.getByText(/Om SFB/i)).toBeInTheDocument();
});
