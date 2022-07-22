/**
 * @jest-environment jsdom
 */
import Header from "../components/Header";
import {render, screen} from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';

test('renders Header', () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  const header = screen.getByText(/Event Manager/);
  expect(header).toHaveTextContent('Event Manager');
})
