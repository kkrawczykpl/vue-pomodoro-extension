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
            minutes: 25,
            seconds: 0,
            minutesText: "25",
            secondsText: "00",
            duration: 0,
            interval: null,
            isRunning: false,
            mode: 0
        }
    },
    created() {
        this.parseText();
    },

    methods: {

        startTimer() {
            this.isRunning = true;
            this.duration = this.minutes * 60 + this.seconds;
            this.interval = setInterval(() => {
                this.minutes = parseInt(this.duration / 60, 10);
                this.seconds = parseInt(this.duration % 60, 10);

                this.parseText();

                if( --this.duration < 0 ) {
                    this.mode = this.mode == 0 ? 1 : 0;
                    alert("Time has passed.");
                    this.restart();
                }
            }, 1000);
        },

        pauseTimer() {
            this.isRunning = false;
            window.clearInterval(this.interval);
        },

        restart() {
            this.isRunning = false;
            window.clearInterval(this.interval);
            this.minutes = this.mode == 0 ? 25 : 5;
            this.seconds = 0;
            this.parseText();
        },

        parseText() {
            this.minutesText = this.minutes < 10 ? "0" + this.minutes.toString() : this.minutes.toString();
            this.secondsText = this.seconds < 10 ? "0" + this.seconds.toString() : this.seconds.toString();
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