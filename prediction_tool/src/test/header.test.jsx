import React from "react";
import {render} from "@testing-library/react";
import Header from "../components/header";
import '@testing-library/jest-dom/extend-expect';

it('Prediction Tool', () => {
    const { getByText } = render(<Header/>);
    const linkElement = getByText(/Prediction Tool/i);
    expect(linkElement).toBeInTheDocument();
});
