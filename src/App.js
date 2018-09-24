import React, { Component } from "react";
import "./App.css";

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

  getVenues = () => {
    const endPoint =
      "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "TUUYKFTMLO3FEBMIRNCR4SXC0HHHCIRWQKEQOLRORBLC1UUC",
      client_secret:
        "CID3CSGSYT3D2CB1RBRNSOFLQK5LUMRX4JOKRTYV3K2AVUDX",
      query: "food",
      near: "Sydney",
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

  initMap = () => {
    const map = new window.google.maps.Map(
      document.getElementById("map"),
      {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      }
    );

    this.state.venues.map(myVenue => {
      // let myLatLng = {
      //   lat: myVenue.venue.location.lat,
      //   lng: myVenue.venue.location.lng
      // };

      const marker = new window.google.maps.Marker({
        position: {
          lat: myVenue.venue.location.lat,
          lng: myVenue.venue.location.lng
        },
        map: map,
        title: myVenue.venue.name
      });
      return marker;
    });
  };

  render() {
    return (
      <main>
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
