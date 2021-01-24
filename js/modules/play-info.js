import Playlist from './playlist.js';

const PlayInfo = (() => {

    const state = {
        songsLength: 0,
        isPlaying: false
    }

    //cache the DOM
    const playerCountEl = document.querySelector('.player__count');
    const playerTriggerEl = document.querySelector('.player__trigger');

    const setState = (obj) => {
        state.songsLength = obj.songsLength;
        state.isPlaying = obj.isPlaying;
        render();
    }

    const render = () => {
        playerCountEl.innerHTML = state.songsLength;
        playerTriggerEl.innerHTML = state.isPlaying ? 'Pause' : 'Play';
    }

    const listeners = () => {
        playerTriggerEl.addEventListener('click', () => {
            //1.change our own {Playinfo's} state
            state.isPlaying = state.isPlaying ? false : true;
            //2.render
            render();
            //3. toggle play pause
            Playlist.flip();
        })
    }

    const init = () => {
        render();
        listeners();
    }


    return {
        init,
        setState
    }
})();

export default PlayInfo;