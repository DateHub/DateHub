import React from 'react';

const NotificationUpcomingDateCarouselIndicator = ({carouselId, index}) => {
  return (
    <li data-target={"#" + carouselId} 
        data-slide-to={index} 
        className={index == 0 ? "active" : ""}>
    </li>
  );
};

export default NotificationUpcomingDateCarouselIndicator;