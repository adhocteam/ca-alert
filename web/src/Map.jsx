import React from "react";
import ReactDOM from "react-dom";

export default class Map extends React.Component {
  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    const maps = google.maps;
    const mapRef = this.refs.map;
    const node = ReactDOM.findDOMNode(mapRef);

    let zoom = 14;
    const center = new maps.LatLng(this.props.lat, this.props.lng);
    let map = new maps.Map(node, {
      zoom: zoom,
      center: center
    });
    let marker = new maps.Marker({
      position: center,
      map: map
    });
  }

  render() {
    // TODO(paulsmith): XXX
    const style = {
      width: "400px",
      height: "200px"
    };
    return (
      <div ref="map" style={style}>
        Loading …
      </div>
    );
  }
}
