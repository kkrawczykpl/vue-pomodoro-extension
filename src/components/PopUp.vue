<template>
    <div class="time">
        <section>
            <b-tabs v-model="activeTab" @input="onTabChange">
                <template v-for="tab in tabs">
                    <b-tab-item
                        :key="tab.id"
                        :value="tab.id.toString()"
                        :label="tab.label">
                        <h2>Pomodoro - {{ tab.label }}</h2>
                        <p>{{ minutesText }}:{{ secondsText }}</p>
                    </b-tab-item>
                </template> 
            </b-tabs>
        </section>
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
            activeTab: 0,
            tabs: [
                {
                    id: 0,
                    label: "Work",
                    content: "hey",
                    minutes: "25"
                },
                {
                    id: 1,
                    label: "Break",
                    content: "Break",
                    minutes: "05"
                },
                {
                    id: 2,
                    label: "Long Break",
                    content: "Long Break",
                    minutes: "15"
                }
            ]
        }
    },

    created() {
        this.getBackgroundTimer();

        chrome.runtime.sendMessage({
            action: "isRunning"
        }, (response) => {
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
            setTimeout(() => { // timeout to synchronize intervals
                this.interval = setInterval(() => {
                    this.getBackgroundTimer();
                }, 1000);
            }, 1000 - new Date().getMilliseconds())
        },

        pauseTimer() {
            this.isRunning = false;
            chrome.runtime.sendMessage({ action: "pauseTimer"});
            clearInterval(this.interval);
        },

        restart() {
            this.isRunning = false;
            chrome.runtime.sendMessage({ action: "resetTimer"});
            clearInterval(this.interval);
            this.startTimer();
        },

        getBackgroundTimer() {
            chrome.runtime.sendMessage({
                action: "getTime"
            }, (res) => {
                this.minutesText = res.minutes;
                this.secondsText = res.seconds;
                this.activeTab = res.mode;
            });  
        },

        onTabChange(index) {
            chrome.runtime.sendMessage({ action: "changeMode", mode: this.activeTab});
            this.minutesText = this.tabs[index].minutes;
            this.secondsText = "00";
            this.pauseTimer();
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
        // background: rgba(0,0,0,0.25);
        padding: 5px 100px;
        color: #000000;
        // box-shadow: 0 0 9px 0px rgb(0 0 0 / 0.3); // adds some glossy effect

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
    .tab-item {
        text-align: center;

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
    }

</style>