var contentTabId;
var domain;
var event;
chrome.runtime.onMessage.addListener(function(msg, sender) {
  if (msg.from == "content" || msg.from == "reactapp") {
    //get content scripts tab id
    contentTabId = sender.tab.id;
    console.log("yeettb");
    chrome.tabs.sendMessage(contentTabId, {
      from: "background",
      event: "true",
      title: "hack",
      description: "description",
      link: "link"
    });
    // if (msg.from == "popup" && contentTabId) {
    //   //got message from popup
    //   chrome.tabs.sendMessage(contentTabId, {
    //     //send it to content script
    //     from: "background",
    //     first: msg.first,
    //     second: msg.second
    //   });
    // }
  }
});
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    // const url = new URL(tabs[0].url);
    domain = tabs[0].url;
    console.log(domain);
  });
  var xhr = new XMLHttpRequest(),
    method = "POST",
    url = "http://actnow-chrome.herokuapp.com/getevent/";

  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
      response = JSON.parse(xhr.responseText);
      if (response != "none") {
        console.log("response");
        event = {
          isEvent: "true",
          title: response.name,
          description: response.description,
          link: response.link
        };
      }
    }
    console.log(event);
  };

  xhr.send(
    JSON.stringify({
      url: domain
    })
  );
});
//https://www.theguardian.com/sustainable-business/2017/jul/10/100-fossil-fuel-companies-investors-responsible-71-global-emissions-cdp-study-climate-change
// function sendMessage() {
//   chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//     chrome.tabs.sendMessage(tabs[0].id, {
//       event: "true"
//     });
//   });
//   console.log("message sent");
// }
// chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//   chrome.tabs.executeScript(tab.ib, {
//     file: 'content.js'
//   });
//   chrome.storage.local.set({ event: "true" }, function() {
//   });
// var xhr = new XMLHttpRequest();
// xhr.open(
//   "GET",
//   "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAcDMBX90WX8ObfpKvlty8k22zapnWFPaU",
//   true
// );
// xhr.send();
// console.log("resp json: ", xhr.responseText, " readystate: ", xhr.readyState);
// var resp = JSON.stringify(xhr.responseText);
// console.log("resp no json", resp);
// // xhr.onreadystatechange = function() {
// //   console.log("statechange");
// //   if ( == 4) {
// //     // JSON.parse does not evaluate the attacker's scripts.
// //     var resp = JSON.parse(xhr.responseText);
// //     console.log(resp);
// //   }
// // };

// chrome.contextMenus.onClicked.addListener(() => {
//   chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//     chrome.tabs.sendMessage(tabs[0].id, {
//       title: "getEvents"
//     });
//   });
// });
// chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//   chrome.tabs.sendMessage(tabs[0].id, {
//     title: "HackHarvard",
//     synopsis:
//       "Join us for the fifth iteration of HackHarvard, a 36-hour hackathon hosted on Harvard University's historic campus.",
//     link: "https://hackharvard.io"
//   });
// });
