import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// TODO: Write actual tests
test("renders navbar links", () => {
  render(<App />);
  expect(screen.getByText(/Säkra, Förvara, Beskydda/i)).toBeInTheDocument();
});
