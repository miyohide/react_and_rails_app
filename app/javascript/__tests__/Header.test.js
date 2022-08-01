import Header from "../components/Header";
import {render, screen} from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';

test('renders Header', () => {
  // <MemoryRouter>を使わない場合、useHref() may be used only in the
  // context of a <Router> componentというエラーメッセージが出て
  // テストに失敗するため、MemoryRouterを使う。
  // see. https://reactrouter.com/docs/en/v6/routers/memory-router
  render(
    <Router>
      <Header />
    </Router>
  );
  expect(screen.getByText('Event Manager')).toBeInTheDocument();
})
