import PlayInfo from './play-info.js'
import { songsList } from '../data/songs.js'

const Playlist = (() => {
  const playlistEl = document.querySelector('.playlist');

  let currentIndex = 0;

  const currentSong = new Audio(songsList[currentIndex].src);

  const switchPlay = (songIndex) => {
    currentIndex = songIndex;
    currentSong.src = songsList[currentIndex].src;
    togglePlay();
  }
  
  const toggleIcon = () => currentSong.paused ? 'fa-play' : 'fa-pause';
  
  const togglePlay = () => {
    currentSong.paused ? currentSong.play() : currentSong.pause();
    PlayInfo.setState(!currentSong.paused); 
    render();
  }

  const render = () => {
    let markup = '';

    songsList.forEach((song, index) => {
      markup += `
        <li class="playlist__song ${currentIndex === index ? 'playlist__song--active' : ''}">
          <div class="play-pause">
              <i class="fa ${currentIndex === index ? toggleIcon() : 'fa-play'} pp-icon"></i>
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
      playlistEl.innerHTML = markup;
    })
  }

 
  const listeners = () => {
    playlistEl.addEventListener('click', (e) => {
      if(e.target.classList.contains('fa')) {
        const clickedSong = e.target.parentElement.parentElement;
        const songIndex = [...playlistEl.children].indexOf(clickedSong);
        songIndex === currentIndex ? togglePlay() : switchPlay(songIndex);
      }
    })

    currentSong.addEventListener('ended', () => {
      if(songsList[currentIndex + 1]) {
        currentIndex++
        switchPlay(currentIndex)
      } else {
        currentIndex = 0;
        currentSong.src = songsList[currentIndex].src;
        render();
      }
    })
  }
  
  const init = () => {
    render();
    listeners();
  }

  return {
    init,
    togglePlay
  }
})(); 


export default Playlist