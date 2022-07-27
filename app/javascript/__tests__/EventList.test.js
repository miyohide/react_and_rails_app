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
    // 与えたeventのevent_typeの値に紐づくaタグを探しURLが/events/+idとなっていることを確認する
    expect(screen.getByText(/event type/).closest('a')).toHaveAttribute('href', '/events/1');
  })

  test('renders EventList component with events', () => {
    render(
      <Router>
        <EventList events={[
          { id: 1, event_type: 'event type1', event_date: '2022-01-01', title: 'event title1', speaker: 'event speaker1', host: 'event host1', published: true },
          { id: 2, event_type: 'event type2', event_date: '2022-03-01', title: 'event title2', speaker: 'event speaker2', host: 'event host2', published: true },
          { id: 3, event_type: 'event type3', event_date: '2021-12-01', title: 'event title3', speaker: 'event speaker3', host: 'event host3', published: true },
        ]} />
      </Router>
    );
    // 与えたeventのevent_typeの値に紐づくaタグを探しURLが/events/+idとなっていることを確認する
    expect(screen.getByText(/event type1/).closest('a')).toHaveAttribute('href', '/events/1');
  })
});
