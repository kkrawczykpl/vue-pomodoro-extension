export default class Badge {

    constructor() {
        this.text = "";
        this.color = "#FF0000";
        chrome.browserAction.setBadgeBackgroundColor( {color: "#FF0000"} );
    }

    getBadgeText() {
        return this.text;
    }

    setBadgeText(text) {
        chrome.browserAction.setBadgeText( {text: text} );
        this.text = text;
    }

}