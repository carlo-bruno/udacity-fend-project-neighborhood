import React from "react";

const VenueList = props => {
  const showInfo = place => {
    window.google.maps.event.trigger(place.marker, "click");
  };

  return (
    <div id="venue-list">
      <input />
      <ul className="venue-ul">
        {props.venues.map((venue, index) => {
          return (
            <li key={index} onClick={() => showInfo(venue)}>
              <a>{venue.venue.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default VenueList;
