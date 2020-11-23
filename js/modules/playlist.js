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
        listeners();
    }

    const changeAudioSrc = _ => currentSong.src = songs[currentlyPlayingIndex].url

    const togglePlayPause = _ => currentSong.paused ? currentSong.play() : currentSong.pause()

    const mainPlay = clickedIndex => {
        if(currentlyPlayingIndex === clickedIndex) {
            togglePlayPause();
        }
        else {
            currentlyPlayingIndex = clickedIndex;
            changeAudioSrc();
            togglePlayPause();
        }
    } 

    const listeners = _ => {
        playlistEl.addEventListener('click', event => {
            if(event.target && event.target.matches('.fa')) {
                const listElem =  event.target.parentNode.parentNode;
                const listElemIndex = [...listElem.parentElement.children].indexOf(listElem);
                mainPlay(listElemIndex);
                render();
            }
        })
        //1. get the index of the li tag
        //2. change the currentPlayingIndex to current index of the li tag
        //3. play or pause
        //4. if it's not the same song, then change the src to that new song after changing the currentplayingindex
    }

    const render = _ => {
        let markup = '';

        const toggleIcon = itemIndex => {
            if(currentlyPlayingIndex === itemIndex) {
                return currentSong.paused ? 'fa-play' : 'fa-pause';
            }
            else {
                return 'fa-play';
            }
        }

        songs.forEach((song, index) => {
            markup += `
                <li class="playlist__song ${index === currentlyPlayingIndex ? 'playlist__song--active': ''}">
                    <div class="play-pause">
                        <i class="fa ${toggleIcon(index)} pp-icon"></i>
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