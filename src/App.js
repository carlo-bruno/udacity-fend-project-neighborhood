import React, { Component } from "react";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCKp1_4GchKu7yMf2H6CmMo04Fs2SWocYA&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  initMap = () => {
    const map = new window.google.maps.Map(
      document.getElementById("map"),
      {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      }
    );
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
