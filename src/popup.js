import "./assets/styles/style.css";
import "./assets/styles/ImageStyling.scss";
let display = document.getElementById("textToImage");

console.log("popup");

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
