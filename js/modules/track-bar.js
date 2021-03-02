const TrackBar = (() => {
  const trackBarEl = document.querySelector('.track-bar__fill'); 

  const getPercentage = (current, total) => (current * 100) / total; 

  const render = (song) => {
    
    const fill = song.currentTime && song.duration ? getPercentage(song.currentTime, song.duration) : 0;

    trackBarEl.style.width = `${fill}%`
  }

  return {
    render
  }

})();

export default TrackBar