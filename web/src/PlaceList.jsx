import React from "react";
import { Link } from "react-router";
import { isLoggedIn } from "./session";
import { encodeQueryString, checkResponse, fetchAuthd } from "./lib";
import Modal from "./Modal";

export default class PlaceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { places: null, showRemoveModal: false, placeToRemove: null };
    if (isLoggedIn()) {
      this.loadPlaces();
    }
  }

  loadPlaces() {
    fetchAuthd(API_HOST + "/places")
      .then(checkResponse)
      .then(response => response.json())
      .then(data => {
        this.setState({ places: data.data || [] });
      })
      .catch(error => {
        console.error("request failed", error);
      });
  }

  handleRemoveClick(e, i) {
    e.preventDefault();
    this.setState({
      placeToRemove: this.state.places[i],
      showRemoveModal: true
    });
  }

  handleOnClose() {
    this.setState({
      placeToRemove: null,
      showRemoveModal: false
    });
  }

  handleRemoveConfirm(e) {
    e.preventDefault();
    const place = this.state.placeToRemove;
    fetchAuthd(API_HOST + "/places/" + place.id, {
      method: "DELETE"
    })
      .then(checkResponse)
      .then(() => this.handleOnClose())
      .then(() => this.loadPlaces())
      .catch(error => {
        console.error("request failed", error);
      });
  }

  handleRemoveCancel(e) {
    e.preventDefault();
    this.handleOnClose();
  }

  render() {
    let listItems = null;
    if (this.state.places === null) {
      listItems = <div>Loading …</div>;
    } else {
      listItems = this.state.places.map((place, i) => {
        return (
          <li className="ca-place-list-item" key={"place-" + i}>
            <div className="ca-place-list-item-name">
              {place.name}
            </div>
            <div className="ca-place-list-item-link">
              <Link to={`/dashboard/places/${place.id}/edit`}>Edit</Link>
            </div>
            <div className="ca-place-list-item-link">
              <a
                href="#"
                onClick={e => this.handleRemoveClick(e, i)}
                title="Remove this place"
              >
                Remove
              </a>
            </div>
          </li>
        );
      });
    }
    const placeToRemove = this.state.placeToRemove !== null
      ? this.state.placeToRemove.name
      : "";
    return (
      <section className="usa-grid usa-section">
        <Modal
          isOpen={this.state.showRemoveModal}
          onClose={() => this.handleOnClose()}
        >
          <h3>Are you sure?</h3>
          <p>
            Are you sure you want to remove{" "}
            <b>{placeToRemove}</b>
            ?
          </p>
          <div>
            <button
              className="usa-button"
              onClick={e => this.handleRemoveConfirm(e)}
            >
              Yes, remove it
            </button>
            <a href="#" onClick={e => this.handleRemoveCancel(e)}>
              No, let’s keep it
            </a>
          </div>
        </Modal>
        <h2>Your places</h2>
        <ul className="ca-place-list">
          {listItems}
        </ul>
        <div>
          <Link to="/dashboard/places/new" className="usa-button">
            Add another place
          </Link>
        </div>
      </section>
    );
  }
}
