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
    var gmailList = gmail.dom.inbox_content();
    var actualEmails = gmailList[0].querySelectorAll('.zA');
    for (let i=0; i<actualEmails.length; i++) {
    	var singleEmail = actualEmails[i];
    	let isRead = true;
    	// console.log(singleEmail);
    	let stringBuilder;
    	let singleEmailName;
    	let singleEmailTitle;
    	if (singleEmail.className === "zA yO") {
    		// email is read
    		//console.log(singleEmail);
    		stringBuilder = "Read email by: "
    		singleEmailName = singleEmail.getElementsByClassName("yP")[1].innerHTML;
    		singleEmailTitle = singleEmail.getElementsByClassName("y6")[0].children[0].children[0].innerHTML;
    		//console.log(singleEmailTitle);
    		//console.log(singleEmailName);

    	} else {
    		// email is not read
    		// console.log(singleEmail);
    		stringBuilder = "Unread email by: "
    		let singleEmailName = singleEmail.getElementsByClassName("zF")[1].innerHTML;
    		singleEmailTitle = singleEmail.getElementsByClassName("bqe")[1].children[0];
    		//console.log(singleEmailTitle);
    		// console.log(singleEmailName);
    	}
    	var rowMessage = stringBuilder.concat(singleEmailName).concat(". Subject: ").concat(singleEmailTitle);
    	console.log(rowMessage);
    	// var name = 
    }

    console.log(actualEmails);
    gmail.observe.on("view_email", (domEmail) => {
        console.log("Looking at email:", domEmail);
        const emailData = gmail.new.get.email_data(domEmail);
        console.log("Email data:", emailData);
        var dateVal = emailData["date"].toString();
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
		//console.log("Email contents: \n", innerTextValCleaned);
		//console.log(typeof dateVal);
		//console.log(typeof emailNameVal);
		//console.log(typeof emailAddressVal);
		//console.log(typeof subjectVal);
		//console.log(typeof innerTextVal);
		window.responsiveVoice.setDefaultVoice("US English Female");
		window.responsiveVoice.speak(innerTextValCleaned);
    });
});
