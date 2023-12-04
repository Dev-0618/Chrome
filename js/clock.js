class Clock {
  constructor(options) {
    this._el = document.querySelector('#clock'); // Change $.el to document.querySelector
    this._delimiter = options.delimiter;
    this._twentyFourHourClock = options.twentyFourHourClock;
    this._showSeconds = options.showSeconds; // New option to control showing seconds
    this._setTime = this._setTime.bind(this);
    this._el.addEventListener('click', options.toggleHelp);
    this._start();
  }

  _setTime() {
    const date = new Date();
    let hours = $.pad(date.getHours());
    let amPm = '';

    if (!this._twentyFourHourClock) {
      hours = date.getHours();
      if (hours > 12) hours -= 12;
      else if (hours === 0) hours = 12;

      amPm =
        `&nbsp;<span class="am-pm">` +
        `${date.getHours() >= 12 ? 'PM' : 'AM'}</span>`;
    }

    const minutes = $.pad(date.getMinutes());
    const seconds = this._showSeconds ? $.pad(date.getSeconds()) : ''; // Include seconds if _showSeconds is true
    this._el.innerHTML = `${hours}${this._delimiter}${minutes}${seconds}${amPm}`;
    this._el.setAttribute('datetime', date.toTimeString());
  }

  _start() {
    this._setTime();
    setInterval(this._setTime, 1000);
  }
}

// Helper function to pad numbers with leading zeros
function pad(num) {
  return num < 10 ? `0${num}` : num;
}

// Example usage:
const myClock = new Clock({
  delimiter: ':',
  twentyFourHourClock: false,
  showSeconds: true, // Set this to true to show seconds
  toggleHelp: () => {
    // Add your help toggle functionality here
  },
});
