import {songsList} from '../data/songs.js';

const Playlist = ( _ => {

    //data or state
    let songs = songsList;
    let currentlyPlayingIndex = 0;
    let currentSong = new Audio(songs[currentlyPlayingIndex].url)
    let isPlaying = false;

    //caching the DOM
    const playlistEl = document.querySelector('.playlist');


    const init = _ => {
        render();
    }

    const render = _ => {
        let markup = '';

        songs.forEach((song, index) => {
            markup += `
                <li class="playlist__song">
                    <div class="play-pause">
                        <i class="fa fa-play pp-icon"></i>
                    </div>
                    <div class="playlist__song-details">
                        <span class="playlist__song-name">${song.title}</span>
                        <br>
                        <span class="playlist__song-artist">${song.artist}</span>
                    </div>
                    <div class="playlist__song-duration">
                        ${song.time}
                    </div>
                </li>
            `;
        })

        playlistEl.innerHTML = markup;
    }

    return {
        init: init
    }

})(); 

export default Playlist;