import "./assets/styles/dashboard.scss";
import html2canvas from "html2canvas";
let display = document.querySelector("#textToImage");
let displayImage = document.getElementById("ImageCon");
let data;

// background color change
let backgroundChangeBtn = document.querySelector("#colors");
let colorContainer = document.querySelector("#colorContainer");

let iconColor = document.getElementById("colorIcon");
let color1 = document.querySelector("#color1");
let color2 = document.querySelector("#color2");
let color3 = document.querySelector("#color3");
let color4 = document.querySelector("#color4");
let color5 = document.querySelector("#color5");
let color6 = document.querySelector("#color6");
let allButtonToChangeColor = colorContainer.querySelectorAll("button");
let colors = [
  "linear-gradient(104.34deg,  #FFDEDE 0%, #FFF8DE 33.33%,#E9FFDE 66.67%,#59DFBF 100%)",
  "linear-gradient(104.34deg,#6E72D7 0%,#6E72D7 0%, #6E72D7 0%, #000467 66.67%,#000231 100%)",
  "linear-gradient(104.34deg, #9DFF6F 0%, #004624 100%)",
  "linear-gradient(104.34deg, #FFEE7D 0%, #B767FF 33.33%, #B7AFFF 66.67%, #44FADD 100%)",
  "linear-gradient(104.34deg, #FFDEFC 0%, #FD79D8 50%, #FF006B 100%)",
  "linear-gradient(101.55deg, rgba(255, 255, 255, 0.9) 34.75%, rgba(255, 255, 255, 0.3) 100%)",
];
color1.style.background = colors[0];
color2.style.background = colors[1];
color3.style.background = colors[2];
color4.style.background = colors[3];
color5.style.background = colors[4];
color6.style.background = colors[5];

allButtonToChangeColor.forEach((button, index) => {
  button.addEventListener("click", () => {
    displayImage.style.background = colors[index];
    // console.log((iconColor.style.color = colors[index]));
    iconColor.style.color = colors[index];
  });
});

// buttons for changing background color
backgroundChangeBtn.addEventListener("click", function () {
  if (colorContainer.style.display === "none") {
    colorContainer.style.display = "flex";
  } else {
    colorContainer.style.display = "none";
  }
});

// dark and light mode
let cardCode = document.querySelector("#mode");
let currentCardColor =
  " linear-gradient(101.55deg, rgba(255, 255, 255, 0.9) 34.75%, rgba(255, 255, 255, 0.3) 100%); ";
console.log(currentCardColor);
cardCode.addEventListener("click", function () {
  if (currentCardColor) {
    console.log('hit')
    display.style.background =
      `linear-gradient(101.55deg, rgba(19, 19, 19, 0.9) 22.23%, rgba(19, 19, 19, 0.3) 100%)`;
    currentCardColor =
      " linear-gradient(101.55deg, rgba(19, 19, 19, 0.9) 22.23%, rgba(19, 19, 19, 0.3) 100%)";
    display.style.color = "white";
  } else {
    display.style.backgroundColor = currentCardColor;
    currentCardColor = currentCardColor;
    display.style.color = "black";
  }
});

chrome.storage.sync.get(["message"], function (result) {
  data = result.message;

  console.log(result);
  data = result.message;
  console.log(data, "datahere");

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
      <p class="tweetText">${data.tweetText ? `${data.tweetText}` : ``}
</p>
      <h5 class="time">${data.timestamp}</h5>
      <div id="tweetExpressions" class="tweetExpressions" style="display:flex">
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
  document.querySelector("#response").addEventListener("click", function () {
    let tweetExpressions = document.querySelector(".tweetExpressions");
    console.log("work");
    if (tweetExpressions.style.display != "flex") {
      tweetExpressions.style.display = "flex";
    } else {
      tweetExpressions.style.display = "none";
    }
  });
  //   imageConvertion();
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

let dashLogin = document.getElementById("dashboardLogin");

dashLogin.addEventListener("click", () => {
  window.location.href = chrome.runtime.getURL("login.html");
});

let dashSignup = document.getElementById("dashboardsignup");

dashSignup.addEventListener("click", () => {
  localStorage.setItem("signup", true);
  window.location.href = chrome.runtime.getURL("popup.html");
});
