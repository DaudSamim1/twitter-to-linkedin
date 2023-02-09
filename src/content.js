import "./assets/styles/customButtonstyle.scss";
let sendButton;
// Initialize an interval to check for the menu button every second
let initialInterval = setInterval(() => {
  document.querySelectorAll(".r-1joea0r").forEach((item) => {
    item.addEventListener("click", () => {
      setTimeout(() => {
        if (document.querySelector("[data-testid='Dropdown']")) {
          let parentDiv = document.querySelector("[data-testid='Dropdown']");

          let child = parentDiv.querySelector(".btn_unique");
          if (!child) {
            sendButton = document.querySelector("[data-testid='Dropdown']");
            sendButton = document.querySelector("[data-testid='Dropdown']");
            console.log("sendButton");
            const sndList = document.createElement("div");
            const span = document.createElement("span");
            span.classList.add("linkinIcon");
            const icon = document.createElement("i");
            icon.classList.add("fab", "fa-linkedin-in");
            span.appendChild(icon);
            const btnSend = document.createElement("button");
            btnSend.classList.add("btn_unique");
            const btnText = document.createTextNode("Send to Linkedin");
            btnSend.appendChild(btnText);
            sndList.appendChild(span);
            sndList.appendChild(btnSend);
            sendButton.appendChild(sndList);

            // Add a click event listener to the custom button
            btnSend.addEventListener("click", () => {
              let array = [];

              var parentDiv = document.querySelector(
                "div[data-testid='User-Names']"
              ).innerText;
              array.push(parentDiv);
              let separatedStrings = array[0].split("\n");

              // Get the data of the Twitter post
              let articleT = item.closest(
                "article[data-testid='tweet']"
              ).parentElement;

              let avatar = articleT.querySelector("img");
              let imageUrl = avatar.src;
              let tweetText = articleT.querySelector(
                "div[data-testid='tweetText']"
              );
              try {
                tweetText = tweetText.innerText;
              } catch (error) {
                tweetText = null;
              }
              let username = separatedStrings[0];
              let handle = separatedStrings[1];
              let reply = articleT.querySelector(
                "div[data-testid='reply']"
              ).innerText;
              let timestamp = separatedStrings[3];
              let retweet = articleT.querySelector(
                "div[data-testid='retweet']"
              ).innerText;
              let likesCount = articleT.querySelector(
                "div[data-testid='like']"
              ).innerText;

              let tweetData = {
                avatar: imageUrl,
                username: username,
                handle: handle,
                tweetText: tweetText,
                timestamp: timestamp,
                reply: reply,
                retweet: retweet,
                likesCount: likesCount,
              };

              chrome.runtime.sendMessage({
                message: "postData",
                // data: tweetData,
              });

              chrome.storage.sync.set({ message: tweetData }, function () {
                console.log("Message is stored in Chrome storage");
              });
            });
          }
        }
      }, 0);
    });
  });
}, 1000);
