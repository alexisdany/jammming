import React from 'react';

import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.onNameChange = this.props.onNameChange.bind(this);
  }
  handleNameChange(event) {

    this.props.onNameChange(event.target.value);
  }
  render() {
    return(
      <div className="Playlist">
         <input defaultValue={'New Playlist'}/>
         <TrackList tracks={this.props.playlistTracks}
         onRemove={this.props.onRemove}
         onChange={this.props.handleNameChange}
         />
         <a className="Playlist-save" onClick={this.props.onSave}>
         SAVE TO SPOTIFY
         </a>
      </div>
    );
};
}
export default Playlist;