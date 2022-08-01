import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import EventForm from "../components/EventForm";
import { MemoryRouter } from "react-router-dom";

describe('EventForm', () => {
  test('renders EventForm component without events', () => {
    render(
      <MemoryRouter>
        <EventForm events={[]} onSave={jest.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByText(/New Event/)).toBeInTheDocument();
  })
});
