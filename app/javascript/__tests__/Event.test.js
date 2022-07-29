/**
 * @jest-environment jsdom
 */
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Event from "../components/Event";
import Router from "react-router-dom";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe('Event', () => {
  test('renders Event component without events', () => {
    jest.spyOn(Router, "useParams").mockReturnValue({id: undefined})
    render(
      <MemoryRouter>
        <Event events={[]} onDelete={jest.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Event not found!/)).toBeInTheDocument();
  })

  test('renders Event component with event', () => {
    jest.spyOn(Router, "useParams").mockReturnValue({id: '1'})
    render(
      <MemoryRouter>
        <Event events={[
          {
            id: 1,
            event_type: 'event type',
            event_date: '2022-01-01',
            title: 'event title',
            speaker: 'event speaker',
            host: 'event host',
            published: true
          }
        ]} onDelete={jest.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Edit/).closest('a')).toHaveAttribute('href', '/events/1/edit');
  })
});
