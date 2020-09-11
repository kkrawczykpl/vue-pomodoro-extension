<template>
    <section>
        <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
            <div
                slot="trigger" 
                slot-scope="props"
                class="card-header"
                role="button"
                aria-controls="contentIdForA11y3">
                <p class="card-header-title">
                    Time Settings
                </p>
                <a class="card-header-icon">
                    <b-icon
                        :icon="props.open ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </a>
            </div>
            <div class="card-content">
                <div class="content">
                    <b-field label="Work Minutes">
                        <b-numberinput v-model="work" placeholder="25" :min="1" :max="59" type="is-danger"></b-numberinput>
                    </b-field>
                    <b-field label="Break Minutes">
                        <b-numberinput v-model="rest" placeholder="5" :min="1" :max="59" type="is-danger"></b-numberinput>
                    </b-field>
                    <b-field label="Long Break Minutes">
                        <b-numberinput v-model="long" placeholder="5" :min="1" :max="59" type="is-danger"></b-numberinput>
                    </b-field>
                    <b-field grouped>
                        <b-field label="Long Break Interval">
                            <b-numberinput v-model="breaksInterval" min="1" :max="100" controls-position="compact" type="is-danger"></b-numberinput>
                        </b-field>
                        <b-field label="Turn Notifications">
                            <b-switch v-model="notifications" type="is-danger"></b-switch>
                        </b-field>

                    </b-field>
                </div>
            </div>
            <footer class="card-footer">
                <a class="card-footer-item">Cancel</a>
                <a @click="save()" class="card-footer-item">Save</a>
            </footer>
        </b-collapse>
  </section>
</template>

<script>
export default {
    name: "Settings",
    data() {
        return {
            work: 25,
            rest: 7,
            long: 15,
            breaksInterval: 4,
            notifications: false
        }
    },
    created() {
        chrome.storage.sync.get("settings", result => {
            if(result.settings) {
                this.work = result.settings.work;
                this.rest = result.settings.rest;
                this.long = result.settings.long;
                this.breaksInterval = result.settings.longInterval;
                this.notifications = result.settings.notifications;
            }
        });
    },
    methods: {
        save() {
            chrome.storage.sync.set({
                settings: {
                    work: this.work,
                    rest: this.rest,
                    long: this.long,
                    longInterval: this.breaksInterval,
                    notifications: this.notifications
                }
            }, () => {
                this.$buefy.dialog.alert({
                    title: 'Saved',
                    type: 'is-danger',
                    message: 'Settings has been saved.',
                    confirmText: 'Cool!'
                })
            });
        }
    }
}
</script>

<style scoped>
    .field {
        text-align: center;
    }
</style>