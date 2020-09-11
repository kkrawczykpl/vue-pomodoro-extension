export default class Badge {

    constructor() {
        this.text = "";
        this.color = "#FF0000";
        this.setBadgeBackgroundColor(this.color);
    }

    getBadgeText() {
        return this.text;
    }

    setBadgeText(text) {
        chrome.browserAction.setBadgeText( {text: text} );
        this.text = text;
    }

    setBadgeBackgroundColor(color) {
        chrome.browserAction.setBadgeBackgroundColor( {color: color} );
        this.color = color;
    }

}