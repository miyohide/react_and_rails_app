import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

// イベントオブジェクトの配列を受け取り、ソート済みリストとしてレンダリングする
const EventList = ({ events }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchInput = useRef(null);

  const updateSearchTerm = () => {
    setSearchTerm(searchInput.current.value);
  };

  // 検索語を含むイベント（ただし、idやpublished, created_at, updated_atを除く）
  // を返すメソッド。文字列はすべて小文字にして検索する
  const matchSearchTerm = (obj) => {
    const {id, published, created_at, updated_at, ...rest} = obj;
    return Object.values(rest).some(
      (value) => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
  };

  const renderEvents = (eventArray) =>
    eventArray
      .filter((el) => matchSearchTerm(el))  // フィルタリングする
      .sort((a, b) => new Date(b.event_date) - new Date(a.event_date))  // ソートする
      .map((event) => (
        <li key={event.id}>
          <NavLink to={`/events/${event.id}`}>
            {event.event_date}
            {'-'}
            {event.event_type}
          </NavLink>
        </li>
      ));

  return (
    <section className="eventList">
      <h2>
        Events
        <Link to="/events/new">New Event</Link>
      </h2>

      <input
        className="search"
        placeholder="Search"
        type="text"
        ref={searchInput}
        onKeyUp={updateSearchTerm}
      />
      <ul>{renderEvents(events)}</ul>
    </section>
  );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    event_type: PropTypes.string,
    event_date: PropTypes.string,
    title: PropTypes.string,
    speaker: PropTypes.string,
    host: PropTypes.string,
    published: PropTypes.bool,
  })).isRequired,
};

export default EventList;
