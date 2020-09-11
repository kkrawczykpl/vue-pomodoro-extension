<template>
    <div class="time">
        <h2>Pomodoro session</h2>
        <p>{{ minutesText }}:{{ secondsText }}</p>
        <div class="controls">
            <div v-if="isRunning === false" v-on:click="startTimer();" class="control">▶</div>
            <div v-else v-on:click="pauseTimer()" class="control">❚❚</div>
            <div v-on:click="restart()" class="control">↻</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PopUp",
    data() {
        return {
            minutesText: "00",
            secondsText: "00",
            interval: null,
            isRunning: false,
        }
    },
    created() {
        this.getBackgroundTimer();

            chrome.runtime.sendMessage({
                action: "isRunning"
            }, (response) => {
                console.log(response);
                if(response == true) {
                    this.isRunning = true;
                    this.displayTimer();
                }
            }); 
    },

    methods: {
        startTimer() {
            chrome.runtime.sendMessage({ action: "setTimer"});
            this.isRunning = true;
            this.displayTimer();
        },

        displayTimer() {
            this.interval = setInterval(() => {
                this.getBackgroundTimer();
            }, 1000);
        },

        pauseTimer() {
            this.isRunning = false;
            chrome.runtime.sendMessage({ action: "pauseTimer"});
        },

        restart() {
            this.isRunning = false;
            chrome.runtime.sendMessage({ action: "resetTimer"});
        },

        getBackgroundTimer() {
            chrome.runtime.sendMessage({
                action: "getTime"
            }, (time) => {
                this.minutesText = time.minutes;
                this.secondsText = time.seconds;
            });  
        }

    }
}
</script>

<style lang="scss" scoped>
    .time {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: rgba(0,0,0,0.25);
        padding: 5px 100px;
        color: #ffffff;
        box-shadow: 0 0 9px 0px rgb(0 0 0 / 0.3); // adds some glossy effect

        h2 {
            font-weight: 400;

            &, +p {
                padding: 0;
                margin: 0;
            }
        }

        p {
            font-size: 56px;
            font-weight: 100;
        }

        .controls {
            display: inline-flex;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;

            .control {
                font-size: 22px;
                cursor: pointer;
                padding: 5px;
            }
        }
    }
</style>