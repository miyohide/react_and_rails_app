import React, { useEffect, useState } from 'react';
import Header from './Header';
import EventList from './EventList';
import { Routes, Route, useNavigate } from "react-router-dom";
import Event from "./Event";
import EventForm from "./EventForm";

const Editor = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/events');
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // newEventオブジェクトを受け取り、新しいEventを作成するそのデータを用いて
  // 新しいイベントを作成するリクエストをAPIに送信する
  const addEvent = async (newEvent) => {
    try {
      const response = await window.fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(newEvent),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw Error(response.statusText);
      // リクエストが成功すると、新しく作成したイベントがステート内に保持されている
      // イベント配列に追加されてUIを更新する
      const savedEvent = await response.json();
      const newEvents = [...events, savedEvent];
      setEvents(newEvents);
      window.alert("Event Added!");
      navigate(`/events/${savedEvent.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="grid">
        {isError && <p>Something went wrong. Check the console.</p>}
        {isLoading ? (
          <p>Loading...</p>
        ): (
          <>
            <EventList events={events} />

            <Routes>
              <Route path="new" element={<EventForm onSave={addEvent} />} />
              <Route path=":id" element={<Event events={events} />} />
            </Routes>
          </>
        )}
      </div>
    </>
  );
};

export default Editor;
