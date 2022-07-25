/**
 * @jest-environment jsdom
 */
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import EventList from "../components/EventList";
import { MemoryRouter as Router } from "react-router-dom";

describe('EventList', () => {
  test('renders EventList component without events', () => {
    render(
      <Router>
        <EventList events={[]} />
      </Router>
      );
    expect(screen.getByText('New Event')).toBeInTheDocument();
  })
});
