import "./assets/styles/style.css";
import "./assets/styles/ImageStyling.scss";

import html2canvas from "html2canvas";
let display = document.getElementById("textToImage");
let diaplayImage = document.getElementById("mainContainer");

let loginBtn = document.getElementById("login-btn");
let logoutBtn = document.getElementById("logout-btn");

loginBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage({ message: "get_access_token" });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "send_access_token") {
      localStorage.setItem("token", request.token);
      onGettingProfile(request.token);
    }
  });
});

const onGettingProfile = async (token) => {
  await chrome.runtime.sendMessage({
    message: "get_google_profile",
    token: token,
  });

  chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
      if (request.message === "send_google_profile") {
        // const { email } = request.profile;
        console.log(request.profile);
        localStorage.setItem("g-profile", JSON.stringify(request.profile));
      }
    }
  );
};

logoutBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage({
    message: "logout",
    token: localStorage.getItem("token"),
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.message === "postData") {
    console.log(message.data);

    const getPostData = JSON.parse(localStorage.getItem("post")) || [];
    localStorage.setItem("post", JSON.stringify(message.data));

    console.log(getPostData);

    let html = "";

    html = `
            <div class="imageDisplay">
            <div class="userDetail">
               <img>
              <span>${getPostData.username}</span>
              <span>${getPostData.handle}</span>
              <span>${getPostData.timestamp}</span>
    </div>
    <p class="tweetText">${getPostData.tweetText}</p>
    <div class="tweetExpressions">  <span><i class="fas fa-message" aria-hidden="true"></i>${getPostData.reply}</span>
              <span><i class="fas fa-retweet" aria-hidden="true"></i>${getPostData.retweet}</span>
              <span><i class="fas fa-heart" aria-hidden="true"></i>${getPostData.likesCount}</span>
              <span><i class="fas fa-stats" aria-hidden="true"></i>${getPostData.statisitics}</span></div>
              </div>
              </div>
              `;
    display.innerHTML = html;

    imageConvertion();
  }
});

async function imageConvertion() {
  window.pageYOffset = 0;
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // transform to canvas
  html2canvas(diaplayImage, {
    allowTaint: true,
    taintTest: false,
    type: "view",
  }).then(function (canvas) {
    const sreenshot = document.getElementById("showImage");
    canvas.style.width = "100%";
    sreenshot.appendChild(canvas);
    canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
  });
}
