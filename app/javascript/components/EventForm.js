import React, {useEffect, useRef, useState} from "react";
import { isEmptyObject, validateEvent } from "../helpers/helpers";
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';

const EventForm = () => {
  const [event, setEvent] = useState({
    // 初期化
    event_type: "",
    event_date: "",
    title: "",
    speaker: "",
    host: "",
    published: false,
  });
  const [formErrors, setFormErrors] = useState({});

  const dateInput = useRef(null);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setEvent({...event, [name]: value});
  };

  // エラーメッセージを出力する
  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the event from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateEvent(event);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors)
    } else {
      console.log(event);
    }
  };

  return (
    <section>
      {renderErrors()}

      <h2>New Event</h2>
      <form className="eventForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="event_type">
            <strong>Type:</strong>
            <input type="text" id="event_type" name="event_type" onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label htmlFor="event_date">
            <strong>Date:</strong>
            <input type="text" id="event_date" name="event_date" onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label htmlFor="title">
            <strong>Title:</strong>
            <textarea cols="30" rows="10" type="text" id="title" name="title" onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label htmlFor="speaker">
            <strong>Speakers:</strong>
            <input type="text" id="speaker" name="speaker" onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label htmlFor="host">
            <strong>Hosts:</strong>
            <input type="text" id="host" name="host" onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label htmlFor="published">
            <strong>Publish:</strong>
            <input type="checkbox" id="published" name="published" onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  );
};

export default EventForm;
