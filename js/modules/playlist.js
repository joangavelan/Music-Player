import {songsList} from '../data/songs.js';
import PlayInfo from '../modules/play-info.js';

const Playlist = ( _ => {

    //data or state
    let songs = songsList;
    let currentlyPlayingIndex = 0;
    let currentSong = new Audio(songs[currentlyPlayingIndex].url);

    currentSong.currentTime = 255;

    //caching the DOM
    const playlistEl = document.querySelector('.playlist');


    const init = _ => {
        render();
        listeners();
        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused
        });
    }

    const flip = _ => {
        togglePlayPause();
        render();
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

        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused
        });
    }
    
    const playNext = _ => {
        if(songs[currentlyPlayingIndex + 1]) { 
            currentlyPlayingIndex++;
            changeAudioSrc();
            togglePlayPause();
            render();
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

        currentSong.addEventListener('ended', _ => {
            playNext();
        })
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
        init,
        flip
    }

})(); 

export default Playlist;