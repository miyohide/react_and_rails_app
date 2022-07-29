/**
 * @jest-environment jsdom
 */
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Event from "../components/Event";
import { MemoryRouter as Router } from "react-router-dom";

describe('Event', () => {
  test('renders Event component without events', () => {
    render(
      <Router>
        <Event events={[]} onDelete={jest.fn()} />
      </Router>
    );
    expect(screen.getByText(/Event not found!/)).toBeInTheDocument();
  })
});
