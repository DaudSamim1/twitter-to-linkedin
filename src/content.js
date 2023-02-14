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
            if (
              document.getElementsByTagName("body")[0].style.backgroundColor ==
              "rgb(255, 255, 255)"
            ) {
              btnSend.style.color = "black";
            } else if (
              document.getElementsByTagName("body")[0].style.backgroundColor ==
                "rgb(21, 32, 43)" ||
              document.getElementsByTagName("body")[0].style.backgroundColor ==
                "rgb(0, 0, 0)"
            ) {
              document.querySelector(".btn_unique").style.color = "white";
            }

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

              let imageUrl;
              try {
                const avatar = articleT.querySelector("img");
                imageUrl = avatar.src;
              } catch (error) {
                console.error(
                  "An error occurred while trying to get the avatar image URL:",
                  error
                );
                imageUrl = null;
              }

              let tweetText = articleT.querySelector(
                "div[data-testid='tweetText']"
              );
              try {
                tweetText = tweetText.innerHTML;
              } catch (error) {
                tweetText = null;
              }

              // let username = articleT.querySelector(
              //   "div[data-testid='User-Names']"
              // ).children[0].innerText;
              // try {
              //   username = username.innerText;
              // } catch (error) {
              //   username = null;
              // }
              let username;
              try {
                username = articleT.querySelector(
                  "div[data-testid='User-Names']"
                ).children[0].innerText;
              } catch (error) {
                console.error(
                  "An error occurred while trying to get the username:",
                  error
                );
                username = null;
              }
              console.log(username);
              // let handle = articleT.querySelector(
              //   "div[data-testid='User-Names']"
              // ).children[1].children[0].children[0].innerText;
              let handle;
              try {
                handle = articleT.querySelector("div[data-testid='User-Names']")
                  .children[1].children[0].children[0].innerText;
              } catch (error) {
                console.error(
                  "An error occurred while trying to get the handle:",
                  error
                );
                handle = null;
              }
              console.log(handle);
              let reply = articleT.querySelector(
                "div[data-testid='reply']"
              ).innerText;

              if (reply == null || reply == ``) {
                reply = "0";
              }

              let timestamp;
              try {
                const timeElement = articleT.querySelector("time");
                timestamp = timeElement.getAttribute("datetime");
              } catch (error) {
                console.error(
                  "An error occurred while trying to get the timestamp:",
                  error
                );
                timestamp = null;
              }

              // let timestamp = timeElement.getAttribute("datetime");
              console.log(timestamp);

              const date = new Date(timestamp);

              const months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];
              const month = months[date.getMonth()];
              const day = date.getDate();
              const timeString = date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              });
              const dateTimeString = ` ${timeString} . ${month} ${day} `;

              let retweet = articleT.querySelector(
                "div[data-testid='retweet']"
              ).innerText;
              if (retweet == null || retweet == ``) {
                retweet = "0";
              }
              console.log(retweet);
              let likesCount = articleT.querySelector(
                "div[data-testid='like']"
              ).innerText;
              if (likesCount == null || likesCount == ``) {
                likesCount = "0";
              }
              console.log(likesCount);
              let tweetData = {
                avatar: imageUrl,
                username: username,
                handle: handle,
                tweetText: tweetText,
                timestamp: dateTimeString,
                reply: reply,
                retweet: retweet,
                likesCount: likesCount,
              };

              chrome.runtime.sendMessage({
                message: "postData",
              });

              chrome.storage.sync.set({ message: tweetData }, function () {
                console.log("Message is stored in Chrome storage");
                document.querySelector('[role="menu"]').innerHTML = ``;
              });
            });
          }
        }
      }, 0);
    });
  });
}, 1000);
