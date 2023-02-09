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
            if (document.getElementsByTagName("body")[0].style.backgroundColor == "rgb(255, 255, 255)") {
              btnSend.style.color="black"
              
            }
            else if(document.getElementsByTagName("body")[0].style.backgroundColor == "rgb(21, 32, 43)" || document.getElementsByTagName("body")[0].style.backgroundColor == "rgb(0, 0, 0)"){
              document.querySelector(".btn_unique").style.color ="white"
              
            }  
            
            // Add a click event listener to the custom button
            btnSend.addEventListener("click", () => {
              // Get the data of the Twitter post
              let articleT = item.closest(
                "article[data-testid='tweet']"
              ).parentElement;

              let avatar = articleT.querySelector("img");
              let imageUrl = avatar.src;
              let tweetText = articleT.querySelector(
                "div[data-testid='tweetText']"
              ).innerText;
              // let username = articleT.querySelector(
              //   ".css-901oao.r-1awozwy.r-18jsvk2.r-6koalj.r-37j5jr.r-a023e6.r-b88u0q.r-rjixqe.r-bcqeeo.r-1udh08x.r-3s2u2q.r-qvutc0"
              // ).innerText;
              // let handle = articleT.querySelector(
              //   ".css-901oao.css-1hf3ou5.r-14j79pv.r-18u37iz.r-37j5jr.r-1wvb978.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0"
              // ).innerText;
              let reply = articleT.querySelector(
                "div[data-testid='reply']"
              ).innerText;
              // let timestamp = articleT.querySelector(
              //   ".css-1dbjc4n.r-18u37iz.r-1q142lx"
              // ).innerText;
              let retweet = articleT.querySelector(
                "div[data-testid='retweet']"
              ).innerText;
              let likesCount = articleT.querySelector(
                "div[data-testid='like']"
              ).innerText;
            
              let tweetData = {
                avatar: imageUrl,
                // username: username,
                // handle: handle,
                tweetText: tweetText,
                // timestamp: timestamp,
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
                  document.querySelector('[role="menu"]').innerHTML=``      
                  
                 
              });
            });
          }
    
        }
      }, 0);
    });
  });
}, 1000);



 