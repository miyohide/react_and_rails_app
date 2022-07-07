import React, {useEffect, useRef, useState} from "react";
import {formatDate, isEmptyObject, validateEvent} from "../helpers/helpers";
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";

const EventForm = ({events, onSave}) => {
  // URLから得た現在のEventのIDを取得する。新規の場合はundefined
  const { id } = useParams();

  const defaults = {
    event_type: "",
    event_date: "",
    title: "",
    speaker: "",
    host: "",
    published: false,
  }

  // 更新対象のEvent、もしくは空オブジェクト（新規の場合）を設定する
  const currEvent = id ? events.find((e) => e.id === Number(id)) : {};
  const initialEventState = {...defaults, ...currEvent}
  const [formErrors, setFormErrors] = useState(initialEventState);

  const dateInput = useRef(null);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    updateEvent(name, value);
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
      onSave(event);
    }
  };

  useEffect(() => {
    const p = new Pikaday({
      field: dateInput.current,
      toString: date => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        dateInput.current.value = formattedDate;
        updateEvent("event_date", formattedDate);
      },
    });
    // クリーンアップ用の関数を返す
    // Reactはアンマウントの前にこれを呼び出す
    return () => p.destroy();
  }, []);

  const updateEvent = (key, value) => {
    setEvent((prevEvent) => ({...prevEvent, [key]: value}));
  };

  return (
    <div>
      <h2>New Event</h2>
      {renderErrors()}

      <form className="eventForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="event_type">
            <strong>Type:</strong>
            <input type="text" id="event_type" name="event_type" onChange={handleInputChange} value={event.event_type} />
          </label>
        </div>
        <div>
          <label htmlFor="event_date">
            <strong>Date:</strong>
            <input type="text" id="event_date" name="event_date" ref={dateInput} autoComplete="off" value={event.event_date} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label htmlFor="title">
            <strong>Title:</strong>
            <textarea cols="30" rows="10" type="text" id="title" name="title" onChange={handleInputChange} value={event.title} />
          </label>
        </div>
        <div>
          <label htmlFor="speaker">
            <strong>Speakers:</strong>
            <input type="text" id="speaker" name="speaker" onChange={handleInputChange} value={event.speaker} />
          </label>
        </div>
        <div>
          <label htmlFor="host">
            <strong>Hosts:</strong>
            <input type="text" id="host" name="host" onChange={handleInputChange} value={event.host} />
          </label>
        </div>
        <div>
          <label htmlFor="published">
            <strong>Publish:</strong>
            <input type="checkbox" id="published" name="published" onChange={handleInputChange} value={event.published} />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;

EventForm.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      event_type: PropTypes.string.isRequired,
      event_date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      speaker: PropTypes.string.isRequired,
      host: PropTypes.string.isRequired,
      published: PropTypes.bool.isRequired,
    })
  ),
  onSave: PropTypes.func.isRequired,
};

EventForm.defaultProps = {
  events: [],
};
