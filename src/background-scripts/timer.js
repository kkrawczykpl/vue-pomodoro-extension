import Badge from "./badge";
export default class Timer {

    constructor() {
        this.minutes = 0;
        this.seconds = 0;
        this.badge = new Badge();
        this.duration = 0;
        this.interval = null;
        this.isRunning = false;
        this.mode = 0;
        this.cycles = 0;
        this.userSettings = {
            work: 25,
            rest: 5,
            long: 15,
            cycles: 3
        }  
        this.setListeners();
        this.resetTimer();
    }
    
    resetTimer() {
        if(this.interval) {
            clearInterval(this.interval);
        }
        this.isRunning = false;
        switch (this.mode) {
            case 0:
                this.resetTimerWork();
                break;
            case 1:
                this.resetTimerBreak();
                break;
            case 2:
                this.resetTimerLong();
                break;
            default:
                break;
        }
    }

    resetTimerWork() {
        this.minutes = this.userSettings.work;
        this.seconds = 0;
        this.mode = 0;
        ++this.cycles;
    }

    resetTimerBreak() {
        this.minutes = this.userSettings.rest;
        this.seconds = 0;
        this.mode = 1;
    }

    resetTimerLong() {
        this.minutes = this.userSettings.long;
        this.seconds = 0;
        this.mode = 2;
        this.cycles = 0;
    }

    setTimer() {
        this.isRunning = true;
        this.duration = this.minutes * 60 + this.seconds;
        setTimeout(() => { // timeout to synchronize intervals
            this.interval = setInterval(() => {
                this.minutes = parseInt(this.duration / 60, 10);
                this.seconds = parseInt(this.duration % 60, 10);
                
                if( this.badge.getBadgeText() !== this.minutes.toString()) {
                    this.minutes >= 1 ? this.badge.setBadgeText(this.minutes.toString()) : this.badge.setBadgeText("<1");
                }
                if(--this.duration < 0) {
                    alert("Hey! Time has passed.");
                    this.changeMode(null);
                }
                
            }, 1000);
        }, 1000 - new Date().getMilliseconds())
    }

    pauseTimer() {
        this.isRunning = false;
        clearInterval(this.interval);
    }

    parseText() {
        let minutesText = this.minutes < 10 ? "0" + this.minutes.toString() : this.minutes.toString();
        let secondsText = this.seconds < 10 ? "0" + this.seconds.toString() : this.seconds.toString();
        return {
            minutes: minutesText,
            seconds: secondsText,
            mode: this.mode
        }
    }

    changeMode(mode) {
        if(mode) {
            this.mode = mode;
        }else{
            if(this.cycles > this.userSettings.cycles) {
                this.mode = 2;
            }else{
                this.mode = this.mode === 0 ? 1 : 0;
            }
        }
        this.resetTimer();
    }

    setListeners() {
        const _this = this;
        chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
            switch(message.action) {
                case "setTimer":
                    _this.setTimer();
                    break;
                case "getTime":
                    sendResponse(_this.parseText());
                    break;
                case "resetTimer":
                    _this.resetTimer();
                    break;
                case "pauseTimer":
                    _this.pauseTimer();
                    break;
                case "isRunning":
                    sendResponse(_this.isRunning);
                    break;
                case "changeMode":
                    _this.changeMode(message.mode);
                    break;
                default:
                    break;
            }
        });
    }
}

