import React, {Component} from 'react';
import _ from 'lodash';
import NotificationUpcomingDateEntry from './NotificationUpcomingDateEntry';
import NotificationUpcomingDateCarouselIndicator from './NotificationUpcomingDateCarouselIndicator.js';

// UpcomingDate: this component will be displayed only if the upcomingdate button of notification component is clicked

// Display: the closest date information

export default class NotificationUpcomingDate extends Component {
  constructor(props){
    super(props);

    this.state = {
      matches: this.props.matches,
      hasMatches: this.props.hasMatches,
      popupOpen: this.props.popupOpen
    };
  }

  render() {
    if(!this.state.hasMatches) {
      return (
        <div>
          Sorry, there are no new matches. Try again later.
        </div>
      );
    }

    let popupOpen = this.state.popupOpen;
    let matches = _.map(this.state.matches, function(match, index) {
      return <NotificationUpcomingDateEntry 
                match={match} 
                index={index} 
                popupOpen={popupOpen}
                key={index} />;
    });

    let carouselId = "carousel-matches";
    let carouselIndicators = _.map(matches, function(match, index) {
      return <NotificationUpcomingDateCarouselIndicator 
                carouselId={carouselId}
                index={index} 
                key={index} />;
    });

    return (
      <div id={carouselId} className="carousel slide" data-ride="carousel" data-interval="false">
        <ol className="carousel-indicators">
          {carouselIndicators}
        </ol>

        <div className="carousel-inner" role="listbox">
          {matches}
        </div>

        <a className="left carousel-control" href={"#" + carouselId} role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href={"#" + carouselId} role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
};

export default NotificationUpcomingDate;