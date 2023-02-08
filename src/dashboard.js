import "./assets/styles/dashboard.scss";
import html2canvas from "html2canvas";
let display = document.getElementById("textToImage");
let displayImage = document.getElementById("ImageCon");
let data;

chrome.storage.sync.get(["message"], function (result) {
  //   let array = [];
  //   array.push(result.message);
  //   console.log(array);
  //   console.log(array.username);
  console.log(result);
      data = result.message;
      console.log(data,"datahere")
;


  chrome.storage.local.set({
    data: result.message,
  });
  chrome.storage.local.get((getData) => {
    console.log("Full Local Storage -> ", getData);
    console.log(getData.data.username);
  });
  // set the message to the popup
  let html = "";
  //   array.map((item, index) => {
  html = `
              <div class="imageDisplay">
      <div class="userDetail">
        <img src="${data.avatar}" class="avatar" />
        <div class="userName">
          <h2 class="name">${data.username}</h2>
          <h5 class="handle">${data.handle}</h5>
        </div>
      </div>
      <p class="tweetText">${data.tweetText}</p>
      <h5 class="time">${data.timestamp}</h5>
      <div class="tweetExpressions">
        <h3 class="exp"
          >${data.reply}<span>reply</span></h3
        >
        <h3 class="exp"
          >${data.retweet}<span>Shares</span></h3
        >
        <h3 class="exp"
          >${data.likesCount}<span>likes</span></h3
        >
       
      </div>
    </div>
                    `;
  display.innerHTML = html;
  imageConvertion();
  //   });
  async function imageConvertion() {
    window.pageYOffset = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // transform to canvas
    html2canvas(displayImage, {
      allowTaint: true,
      taintTest: false,
      type: "view",
    }).then(function (canvas) {
      const sreenshot = document.getElementById("showImage");
      canvas.style.width = "100%";
      sreenshot.appendChild(canvas);
      canvas
        .toDataURL("image/jpeg")
        .replace("image/jpeg", "image/octet-stream");
    });
  }
});
