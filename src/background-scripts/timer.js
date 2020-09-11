export default class Timer {

    constructor() {
        this.minutes = 25;
        this.seconds = 0;
        this.minutesText = "25";
        this.secondsText = "00";
        this.duration = 0;
        this.interval = null;
        this.isRunning = false;
        this.mode = null;
        this.resetTimer();
        this.setListeners();
    }
    resetTimer() {
        if(this.interval) {
            clearInterval(this.interval);
        }
    }

    setTimer() {
        this.resetTimer();
        this.isRunning = true;
        this.duration = this.minutes * 60 + this.seconds;
        this.interval = setInterval(() => {
            this.minutes = parseInt(this.duration / 60, 10);
            this.seconds = parseInt(this.duration % 60, 10);
            console.log(this.seconds);
            --this.duration;
        }, 1000);
    }

    parseText() {
        this.minutesText = this.minutes < 10 ? "0" + this.minutes.toString() : this.minutes.toString();
        this.secondsText = this.seconds < 10 ? "0" + this.seconds.toString() : this.seconds.toString();
        return {
            minutes: this.minutesText,
            seconds: this.secondsText
        }
    }

    setListeners() {
        const _this = this;
        chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
            switch(message.action) {
                case "setTimer":
                    _this.setTimer();
                    sendResponse(true);
                    break;
                case "getTime":
                    sendResponse(_this.parseText());
                    break;
                case "isRunning":
                    sendResponse(_this.isRunning);
                    break;
                default:
                    break;
            }
        });
    }
}

