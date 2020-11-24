import Playlist from './playlist.js';

const Playinfo = ( _ => {

    const state = {
        songsLength: 0,
        isPlaying: false
    }

    //cache the DOM 
    const playerCountEl = document.querySelector('.player__count')
    const playerTriggerEL = document.querySelector('.player__trigger')

    const render = _ => {
        playerCountEl.innerHTML = state.songsLength;
        playerTriggerEL.innerHTML = state.isPlaying ? 'Pause' : 'Play';
    }

    const setState = obj => {
        state.songsLength = obj.songsLength;
        state.isPlaying = obj.isPlaying;
        render();
    }

    const listeners = _ => {
        playerTriggerEL.addEventListener('click', _ => {
            //1. change our own (Playinfo's) state
            state.isPlaying = state.isPlaying ? false : true;
            //2. render
            render();
            //3. toggle the playpause song functionality
            Playlist.flip();
        })
    }

    const init = _ => {
        render();
        listeners();
    }


    return {
        init,
        setState
    }

})();

export default Playinfo;