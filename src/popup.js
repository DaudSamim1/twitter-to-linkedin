import "./assets/styles/style.css";
import "./assets/styles/customButtonstyle.scss";
let display = document.getElementById("textToImage");

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
    let array = [];
    array.push(message.data);
    console.log(array);

    let html = "";

    array.map((item, index) => {
      html += `
        <div class="imageDisplay">
        <div class="userDetail">
           <img>
          <span>${item.username}</span>
          <span>${item.handle}</span>
          <span>${item.timestamp}</span>
</div>
<p class="tweetText">${item.tweetText}</p>
<div class="tweetExpressions">  <span><i class="fas fa-message" aria-hidden="true"></i>${item.reply}</span>
          <span><i class="fas fa-retweet" aria-hidden="true"></i>${item.retweet}</span>
          <span><i class="fas fa-heart" aria-hidden="true"></i>${item.likesCount}</span>
          <span><i class="fas fa statistics" aria-hidden="true"></i>${item.statisitics}</span></div>
        </div>
      `;
    });
    display.innerHTML = html;
  }
});
