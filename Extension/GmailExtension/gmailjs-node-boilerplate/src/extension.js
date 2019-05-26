"use strict";

console.log("Extension loading...");
const jQuery = require("jquery");
const $ = jQuery;
const GmailFactory = require("gmail-js");
const responsiveVoice = require("./_responsivevoice.js");

const gmail = new GmailFactory.Gmail($);
window.gmail = gmail;

gmail.observe.on("load", () => {
    const userEmail = gmail.get.user_email();
    console.log("Hello, " + userEmail + ". This is your extension talking!");

    gmail.observe.on("view_email", (domEmail) => {
        console.log("Looking at email:", domEmail);
        const emailData = gmail.new.get.email_data(domEmail);
        console.log("Email data:", emailData);
        var dateVal = emailData["date"];
        var emailNameVal = emailData["from"]["name"];
        var emailAddressVal = emailData["from"]["address"];
        var subjectVal = emailData["subject"];
        var innerTextVal = domEmail["$el"][0]["innerText"];
        
        // break the textblock into an array of lines
		var lines = innerTextVal.split('\n');
		// remove one line, starting at the first position
		lines.splice(0,1);
		// join the array back into a single string
		var innerTextValCleaned = lines.join('\n');
		console.log("Email contents: \n", innerTextValCleaned);
		window.responsiveVoice.setDefaultVoice("US English Female");
		window.responsiveVoice.speak(innerTextValCleaned);
    });
});
