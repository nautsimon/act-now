var contentTabId;

// chrome.webNavigation.onCompleted.addListener(function(details) {
//   chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
//     setTimeout(function() {
//       domain = tabs[0].url;
//       console.log("domain", domain);
//     }, 500);
//   });
// });
var eventResp = {
  isEvent: "false",
  title: "false",
  description: "false",
  link: "false"
};
let getUrl = function() {
  console.log("domain");
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      var domain = tabs[0].url;
      console.log("domain", domain);

      resolve(domain);
    });
  });
};
let getApi = function(pageUrl) {
  var pageUrl = pageUrl;
  console.log("pageurl", pageUrl);
  var xhr = new XMLHttpRequest(),
    method = "POST",
    url = "http://actnow-chrome.herokuapp.com/getevent/";
  return new Promise(function(resolve, reject) {
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
        response = JSON.parse(xhr.responseText);
        console.log("string", response);
        if (response != "none") {
          console.log("response");
          eventResp = {
            isEvent: "true",
            title: response.name,
            description: response.description,
            link: response.link
          };
          resolve(eventResp);
        } else {
          eventResp = {
            isEvent: "false",
            title: "false",
            description: "false",
            link: "false"
          };
          resolve(eventResp);
        }
      }
    };
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(eventResp);
    xhr.send(
      JSON.stringify({
        url: pageUrl
      })
    );
  });
};
let sendMessage = function(msg, sender, result) {
  var response = eventResp;
  console.log("evvenne", response);
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(contentTabId, {
      from: "background",
      event: response.isEvent,
      title: response.title,
      description: "description",
      link: "link"
    });
    resolve("message sent");
  });
};
chrome.runtime.onMessage.addListener(function(msg, sender) {
  if (msg.from == "content" || msg.from == "reactapp") {
    console.log("messagereciver");
    contentTabId = sender.tab.id;
    getUrl()
      .then(result => {
        return getApi(result);
      })
      .then(() => {
        return sendMessage(msg, sender);
      })
      .then(result => {
        console.log(result);
      });
  }
});
