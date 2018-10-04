import React from "react";

import fslogo from "../images/powered-by-foursquare-white.png";

const VenueList = props => {
  const showInfo = place => {
    window.google.maps.event.trigger(place.marker, "click");
  };

  return (
    <section
      id="venue-list"
      className={props.openList ? "open" : "closed"}
    >
      <h1>Seattle Spots</h1>
      <input
        aria-label="search input"
        role="search"
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
              <li
                key={index}
                tabIndex="0"
                onClick={() => showInfo(venue)}
              >
                <a>{venue.venue.name}</a>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul>
          <li> 0 venues found</li>
        </ul>
      )}

      <img src={fslogo} alt="foursquare attribution" />
    </section>
  );
};

export default VenueList;
