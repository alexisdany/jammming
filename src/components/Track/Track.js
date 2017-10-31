import React from 'react';

import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
  }
  renderAction() {
    if (this.props.isRemoval) {
      return <a className="Track-action" onClick={this.removeTrack}>-</a>
    } else {
    return <a className="Track-action" onClick={this.addTrack}>+</a>;
  }

  }


  removeTrack() {
    this.props.track(this.props.onRemove);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }
  render() {
    return(
      <div className="Track">
        <div className="Track-information">
        { this.renderAction() }


        </div>

     </div>
    );
  }
};

export default Track;
