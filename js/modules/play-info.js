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

    const init = _ => {
        render();
    }


    return {
        init,
        setState
    }

})();

export default Playinfo;