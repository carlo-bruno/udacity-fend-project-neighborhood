import React from "react";

const VenueList = props => {
  const showInfo = place => {
    window.google.maps.event.trigger(place.marker, "click");
  };

  return (
    <div id="venue-list">
      <input
        className="search-input"
        type="text"
        placeholder="Filter by Name"
        onChange={event =>
          props.filterVenue(event.target.value.toLocaleLowerCase())
        }
      />
      {props.venues.length > 0 ? (
        <ul>
          {props.venues.map((venue, index) => {
            // console.log(venue);
            return (
              <li key={index} onClick={() => showInfo(venue)}>
                <a>{venue.venue.name}</a>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul> 0 venues found</ul>
      )}

      <p>powered by foursquare</p>
    </div>
  );
};

export default VenueList;
