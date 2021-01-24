const TrackBar = (() => {
    //state
    const state = {
        currentTrackTime: 0,
        fullTrackTime: 0,
        fillWidth: 0
    }
    //cache the DOM
    const trackBarFillEl = document.querySelector('.track-bar__fill');

    const render = () => {
        trackBarFillEl.style.width = `${state.fillWidth}%`;
    }

    const getPercentage = (x, y) => (x / y) * 100; 

    const setState = (obj) => {
        state.currentTrackTime = obj.currentTime;
        state.fullTrackTime = obj.duration;
        state.fillWidth = getPercentage(state.currentTrackTime, state.fullTrackTime);
        render();
    }
 
    const init = () => {
        render();
    }

    return {
        init,
        setState
    }

})();

export default TrackBar;