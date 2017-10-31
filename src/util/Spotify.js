const clientId = 'b03ad1b165604783a592ce8e8f5f4b2d';
const redirectUri = "http://localhost:3000/";
let accessToken;
const Spotify = {
  getAccessToken () {
    if(accessToken) {
      return accessToken;
    }
      const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expireMatch = window.location.href.match(/expires_in=([^&]*)/);
      if (tokenMatch && expireMatch) {
        accessToken = tokenMatch[1];
        let expiresIn = Number (expireMatch[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
    }  else {
        console.log('Error retrieving spotify API');
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
      }
  },
  search(searchTerm) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      { headers: {Authorization: `Bearer ${accessToken}` }})
    .then(response => {
        if(response.ok) {
          // console.log(response);
          return response.json();
        }
        throw new Error('Request failed');
      }, networkError => console.log(networkError.message))
      .then(jsonResponse => {
        // console.log(jsonResponse);
        if(!jsonResponse.tracks.items) {
          return [];
        } else {
            return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }));
        }
      })
    },
  userPlayList(PlayListName, ListOfTrack ) {
    if(!PlayListName && !ListOfTrack) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: PlayListName})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({trackUris: ListOfTrack})
        });
      });
    });
  }
};

export default Spotify;
