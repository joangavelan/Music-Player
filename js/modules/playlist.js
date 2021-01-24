import {songsList} from '../data/songs.js';
import PlayInfo from './play-info.js';
import TrackBar from './track-bar.js';

const Playlist = (() => {
    //cache the DOM
    const playlistEl = document.querySelector('.playlist');
    //data and state
    let songs = songsList;
    let currentPlayingIndex = 0;
    let currentSong = new Audio(songs[currentPlayingIndex].url);    

    const toggleIcon = (itemIndex) => {
        if(currentPlayingIndex === itemIndex) {
            return currentSong.paused ? 'fa-play' : 'fa-pause';
        }
        else return 'fa-play';
    }

    const render = () => {
        let markup = '';
        songs.forEach((song, index) => {
            markup += `
            <li class="playlist__song ${index === currentPlayingIndex ? 'playlist__song--active' : ''}">
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
        `
        })
        playlistEl.innerHTML = markup;
    }

    const flip = () => {
        togglePlayPause();
        render();
    }

    const playNext = () => {
        if(songs[currentPlayingIndex + 1]) {
            currentPlayingIndex++;
            changeAudioSrc();
            currentSong.play();
            render();
        }
    }

    const changeAudioSrc = () => currentSong.src = songs[currentPlayingIndex].url;

    const togglePlayPause = () => currentSong.paused ? currentSong.play() : currentSong.pause();

    const mainPlay = elemIndex => {
        if(currentPlayingIndex === elemIndex) {
            togglePlayPause();
        } else {
            currentPlayingIndex = elemIndex;
            changeAudioSrc();
            togglePlayPause();  
        }

        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused
        })
    }

    const listeners = () => {
        playlistEl.addEventListener('click', event => {
            if(event.target.matches('.fa')) {
                const playlistItem = event.target.parentNode.parentNode;
                const playlistItemIndex = [...playlistEl.children].indexOf(playlistItem);
                mainPlay(playlistItemIndex);
                render();
            }
        })

        currentSong.addEventListener('timeupdate', () => {
            TrackBar.setState(currentSong);
        })

        currentSong.addEventListener('ended', () => {
            playNext();
        })
    }

    const init = () => {
        render();
        listeners();
        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused
        })
    }

    return {
        init,
        flip
    }    

})();


export default Playlist;