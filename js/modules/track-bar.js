const TrackBar = ( _ => {
    //state
    const state = {
        currentTime: 0,
        fullTrackTime: 0,
        fillWidth: 0
    }

    //cache DOM
    const trackBarFillEl = document.querySelector('.track-bar__fill');

    const render = _ => {
        trackBarFillEl.style.width = `${state.fillWidth}%`;
    }

    const getPercent = (current, full) => (current/full) * 100

    const setState = obj => {
        state.currentTime = obj.currentTime;
        state.fullTrackTime = obj.duration;
        state.fillWidth = getPercent(state.currentTime, state.fullTrackTime);
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

export default TrackBar;