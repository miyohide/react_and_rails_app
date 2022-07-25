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

  test('renders EventList component with event', () => {
    render(
      <Router>
        <EventList events={[
          {
            id: 1,
            event_type: 'event type',
            event_date: '2022-01-01',
            title: 'event title',
            speaker: 'event speaker',
            host: 'event host',
            published: true
          }
        ]} />
      </Router>
    );
    // screen.debug();
    expect(screen.getByText(/event type/).closest('a')).toHaveAttribute('href', '/events/1');
  })
});
