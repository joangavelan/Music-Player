import Playlist from './playlist.js'
import { songsList } from '../data/songs.js'

const PlayInfo = (() => {
  const songsLengthEl = document.querySelector('.player__count');
  const playerEl = document.querySelector('.player__trigger');
  
  let isPlaying = false;

  const setState = (bool) => {
   isPlaying = bool;
   render();
  };

  const render = () => {
    playerEl.innerHTML = isPlaying ? 'Pause' : 'Play'; 
    songsLengthEl.innerHTML = songsList.length;
  }

  const listeners = () => {
    playerEl.addEventListener('click', () => {
      Playlist.togglePlay();
    }) 
  }

  const init = () => {
    listeners();
    render();
  }

  return {
    init,
    setState
  }

})();

export default PlayInfo;