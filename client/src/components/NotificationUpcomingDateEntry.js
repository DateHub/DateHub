import React from 'react';
import Moment from 'moment';

const NotificationUpcomingDateEntry = ({match, index}) => {
  return (
    <div className={index == 0 ? "item active" : "item"} >
      <img className="carousel-date-image" src={match.imageUrl} alt="..."/>
      <div className="carousel-caption">
        <h3>{match.name}, {Moment().diff(match.dob, "years")}</h3>
        <button className="btn btn-primary" type="button">Setup date</button>
      </div>
      <input type="hidden" value={match.id}/>
    </div>
  );
};

export default NotificationUpcomingDateEntry;