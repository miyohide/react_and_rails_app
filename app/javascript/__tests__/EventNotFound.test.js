/**
 * @jest-environment jsdom
 */
import {render, screen} from "@testing-library/react";
import EventNotFound from "../components/EventNotFound";
import '@testing-library/jest-dom/extend-expect';

test('renders EventNotFound', () => {
  render(<EventNotFound />);
  const notfound = screen.getByText(/Event/);
  expect(notfound).toHaveTextContent('Event not found!');
})
