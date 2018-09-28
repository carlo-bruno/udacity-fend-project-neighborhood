import React, { Component } from "react";
import "./App.css";

import VenueList from "./Components/VenueList";

import axios from "axios";

class App extends Component {
  state = {
    venues: []
  };

  componentDidMount() {
    this.getVenues();
    // this.renderMap();
  }

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCKp1_4GchKu7yMf2H6CmMo04Fs2SWocYA&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  // get venues data from FourSquare API using axios
  // then set state
  getVenues = () => {
    const endPoint =
      "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "TUUYKFTMLO3FEBMIRNCR4SXC0HHHCIRWQKEQOLRORBLC1UUC",
      client_secret:
        "CID3CSGSYT3D2CB1RBRNSOFLQK5LUMRX4JOKRTYV3K2AVUDX",
      query: "food",
      near: "Seattle",
      v: "20180323"
    };

    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        // console.log(response.data.response.groups[0].items);
        this.setState(
          {
            venues: response.data.response.groups[0].items
          },
          this.renderMap()
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  // TODO: figure out how to add more info to venues
  // getMoreInfo = place => {
  //   const endPoint = "https://api.foursquare.com/v2/venues/";
  //   const parameters = {
  //     client_id: "TUUYKFTMLO3FEBMIRNCR4SXC0HHHCIRWQKEQOLRORBLC1UUC",
  //     client_secret:
  //       "CID3CSGSYT3D2CB1RBRNSOFLQK5LUMRX4JOKRTYV3K2AVUDX",
  //     v: "20180323"
  //   };
  //   axios
  //     .get(
  //       endPoint +
  //         place.venue.id +
  //         "?" +
  //         new URLSearchParams(parameters)
  //     )
  //     .then(response => console.log(response.data.response));
  // };

  initMap = () => {
    const map = new window.google.maps.Map(
      document.getElementById("map"),
      {
        // Seattle coordinates
        center: { lat: 47.608013, lng: -122.335167 },
        zoom: 12
      }
    );

    const infowindow = new window.google.maps.InfoWindow();

    this.state.venues.map(myVenue => {
      // Create Markers
      // directly bind venue marker to venue for easier access by onClick function
      myVenue.marker = new window.google.maps.Marker({
        position: {
          lat: myVenue.venue.location.lat,
          lng: myVenue.venue.location.lng
        },
        map: map,
        title: myVenue.venue.name
      });

      // this.getMoreInfo(myVenue);

      // infowindow content
      let contentString = `
      <h2>${myVenue.venue.name}</h2>
      <img src=${myVenue.venue.categories[0].icon.prefix +
        "32.png"} >
      <h3>${myVenue.venue.categories[0].name}</h3>
      <p>${myVenue.venue.location.address} <br>
      ${myVenue.venue.location.city} </p>
      <a href="https://foursquare.com/v/${
        myVenue.venue.id
      }" target="_blank">Read More</a>
      `;

      // Add event listeners to markers
      myVenue.marker.addListener("click", function() {
        // Animate Marker when opened, remove after 3 bounce
        myVenue.marker.setAnimation(
          window.google.maps.Animation.BOUNCE
        );
        setTimeout(() => myVenue.marker.setAnimation(null), 2100);

        infowindow.setContent(contentString);
        infowindow.open(map, myVenue.marker);
      });
      return myVenue.marker;
    });
  };

  render() {
    return (
      <main>
        <VenueList venues={this.state.venues} />
        <div id="map" />
      </main>
    );
  }
}

/* <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
  async defer></script> */

// AIzaSyCKp1_4GchKu7yMf2H6CmMo04Fs2SWocYA

function loadScript(url) {
  const index = window.document.getElementsByTagName("script")[0];

  const script = window.document.createElement("script");

  script.src = url;
  script.async = true;
  script.defer = true;

  index.parentNode.insertBefore(script, index);
}

export default App;
