/**
 * @jest-environment jsdom
 */
import {render, screen} from "@testing-library/react";
import EventNotFound from "../components/EventNotFound";
import '@testing-library/jest-dom/extend-expect';

describe('EventNotFound', () => {
  test('renders EventNotFound component', () => {
    render(<EventNotFound />);
    // 'Event not found!'を持つ要素を検索し、toBeInTheDocument()で
    // ドキュメント内にあることを検索する
    expect(screen.getByText('Event not found!')).toBeInTheDocument();
  })
});
