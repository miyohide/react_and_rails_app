import Editor from "../components/Editor";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {MemoryRouter} from "react-router-dom";
import {act} from "react-dom/test-utils";

test('renders Editor', async () => {
  const dummyEvents = [
    {
      id: 1,
      event_type: "event type1",
      event_date: "2022-01-01",
      title: "event title",
      speaker: "event speaker",
      host: "event host",
      published: true
    }
  ]
  global.fetch = jest.fn(
    () => {
      return Promise.resolve({
          ok: true,
          json: () => {
            return Promise.resolve(dummyEvents)
          }
        }
      )
    }
  )
  await act(async () => {
    render(
      <MemoryRouter>
        <Editor/>
      </MemoryRouter>
    );
  });
  expect(screen.getByText(/event type1/)).toBeInTheDocument();
})
