import React from "react";
import "./Modal.css";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClose();
  }

  render() {
    const styles = {
      display: this.props.isOpen ? "block" : "none"
    };
    return (
      <div className="modal" style={styles}>
        <div className="modal-content">
          <span className="modal-close" onClick={e => this.handleClick(e)}>
            ×
          </span>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  isOpen: React.PropTypes.bool.isRequired
};
