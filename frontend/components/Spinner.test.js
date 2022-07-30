// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
import React from "react";
import Spinner from "./Spinner";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Spinner is working properly", () => {
  test("Spinner show up when the passed prop is true", () => {
    render(<Spinner on={true} />);
    screen.getByText(/please wait/i);
  });

  test("Spinner don't show up when the passed prop is false", () => {
    render(<Spinner on={false} />);
    const spinnerText = screen.queryByText(/please wait/i);
    expect(spinnerText).not.toBeInTheDocument();
    expect(spinnerText).toBeFalsy();
  });
});

