chrome.runtime.sendMessage({ from: "domain" }); //first, tell the background page that this is the tab that wants to receive the messages.
chrome.runtime.onMessage.addListener(function(msg) {
  if (msg.from == "background" && msg.event == "true") {
    console.log("yee");
    var title = msg.title;
    var description = msg.description;
    var link = msg.link;
    console.log(title, description, link);
    //here you use the values as you wish, for example:
    //document.getElementById("anInput").value = first;

    // chrome.runtime.onMessage.addListener(request => {
    //   console.log(request.event);
    //   // chrome.runtime.onInstalled.addListener(() => {
    //   console.log(chrome.storage.local.get(["event"]));

    //     console.log(request.type);
    //     console.log(request.title);
    //     console.log(request.link);
    const eventDiv = document.createElement("div");
    eventDiv.id = "myDivId";
    eventDiv.style.position = "fixed";
    eventDiv.style.margin = "0px";
    eventDiv.style.padding = "0px";
    eventDiv.style.bottom = "0px";
    eventDiv.style.left = "0px";
    eventDiv.style.zIndex = "200000";
    eventDiv.style.width = "100%";
    eventDiv.style.height = "11vh";
    eventDiv.style.opacity = "0.9";
    eventDiv.style.backgroundColor = "#FF8686";
    eventDiv.innerHTML = `<iframe id="actNow"style="height:100%; width:100%"></iframe>
          <div-z style="position:absolute; top:2vh; right:18px; ">  
              <h6-z id="unique" style="cursor:pointer; font-size: 30px; padding:0px; margin:0px; color:#ffffff;" onmouseout="this.style.color='#ffffff'" onmouseover="this.style.color='#FF0B0B'">x</h6-z>
          </div-z>`;
    document.body.appendChild(eventDiv);
    const iframe = document.getElementById("actNow");
    iframe.src = chrome.extension.getURL("index.html");
    iframe.frameBorder = 0;

    //     const dialog = document.querySelector("dialog");
    //     dialog.showModal();
    //     const iframe = document.getElementById("headlineFetcher");
    //     iframe.src = chrome.extension.getURL("index.html");
    //     iframe.frameBorder = 0;
    //     dialog.querySelector("button").addEventListener("click", () => {
    //       dialog.close();
    eventDiv.querySelector("h6-z").addEventListener("click", () => {
      eventDiv.remove();
    });
  }
});
console.log("script run");
//   }
// });
// chrome.runtime.onConnect.addListener(function(port) {
//   port.postMessage({ greeting: "hello" });
// });
// chrome.runtime.onMessage.addListener(request => {
//   //   console.log(request.type);
//   if (request.type === "getHeadlines") {
//     const modal = document.createElement("dialog");
//     modal.setAttribute(
//       "style",
//       "height:40%",
//       "margin-top: -20px",
//       "position: fixed",
//       "left: 0px;",
//       "top: 0px",
//       "background-color: rgb(100, 255, 25)",
//       "opacity: 0.5",
//       "z-index: 2000",
//       "width: 100%"
//     );
//     modal.innerHTML = `<iframe id="headlineFetcher"style="height:100%"></iframe>
//           <div style="position:absolute; top:0px; left:5px;">
//               <button>x</button>
//           </div>`;
//     document.body.appendChild(modal);
//     const dialog = document.querySelector("dialog");
//     dialog.showModal();
//     const iframe = document.getElementById("headlineFetcher");
//     iframe.src = chrome.extension.getURL("index.html");
//     iframe.frameBorder = 0;
//     dialog.querySelector("button").addEventListener("click", () => {
//       dialog.close();
//     });
//   }
// });
