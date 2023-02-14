import "./assets/styles/dashboard.scss";
import html2canvas from "html2canvas";

let waterMark = document.querySelector(".waterMark");
let colorPalette = document.getElementById("colorPalette");
import arrows from "./assets/images/arrows.png";
import moon_full from "./assets/images/moon_full.png";
import sun_full from "./assets/images/sun_full.png";
import arrows_out from "./assets/images/arrows_out.png";
import ugrade_icon from "./assets/images/upgrade.svg";
import share from "./assets/images/share_full.png";
document.getElementById(
  "moonFull"
).innerHTML = `<img src="${moon_full}" alt="Your SVG file">`;
document.getElementById(
  "arrows"
).innerHTML = `<img src="${arrows}" alt="Your SVG file">`;
document.getElementById(
  "sunFull"
).innerHTML = `<img src="${sun_full}" alt="Your SVG file">`;
document.getElementById(
  "arrows_out"
).innerHTML = `<img src="${arrows_out}" alt="Your SVG file">`;
document.getElementById(
  "share"
).innerHTML = `<img src="${share}" alt="Your SVG file">`;
// document.getElementById(
//   "upgradeIcon"
// ).innerHTML = `<img src="${ugrade_icon}" alt="Your SVG file">`;

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
let color7 = document.querySelector("#color7");
let allButtonToChangeColor = colorContainer.querySelectorAll("button");
let colors = [
  "linear-gradient(104.34deg, #FFDEDE 0%, #FFF8DE 33.33%, #E9FFDE 66.67%, #59DFBF 100%)",
  " linear-gradient(104.34deg, #3C9494 0%, #246B6B 33.33%, #023F30 66.67%, #002824 100%)",
  "linear-gradient(104.34deg, #353778 0%, #222228 100%)",
  "linear-gradient(87.7deg, #303030 1.93%, #131313 98.07%)",
  " linear-gradient(104.34deg, #FFEE7D 0%, #B767FF 33.33%, #B7AFFF 66.67%, #44FADD 100%)",
  " linear-gradient(104.34deg, #7F6284 0%, #563363 50%, #1E0F27 100%)",
  " linear-gradient(101.55deg, rgba(210, 210, 210, 0.9) 0%, #585858 100%)",
];
color1.style.background = colors[0];
color2.style.background = colors[1];
color3.style.background = colors[2];
color4.style.background = colors[3];
color5.style.background = colors[4];
color6.style.background = colors[5];
color7.style.background = colors[6];

allButtonToChangeColor.forEach((button, index) => {
  button.addEventListener("click", () => {
    displayImage.style.background = colors[index];
    colorPalette.style.background = colors[index];
  });
});

var colorContainerVisible = false;

backgroundChangeBtn.addEventListener("mouseenter", function () {
  colorContainer.style.display = "flex";
  colorContainerVisible = true;
});

backgroundChangeBtn.addEventListener("mouseleave", function () {
  colorContainerVisible = false;
  setTimeout(function () {
    if (!colorContainerVisible) {
      colorContainer.style.display = "none";
    }
  }, 200);
});
colorContainer.addEventListener("mouseenter", function () {
  colorContainerVisible = true;
});

colorContainer.addEventListener("mouseleave", function () {
  colorContainerVisible = false;
  setTimeout(function () {
    if (!colorContainerVisible) {
      colorContainer.style.display = "none";
    }
  }, 200);
});
document.addEventListener("click", function (event) {
  if (
    colorContainer.style.display === "block" &&
    event.target !== colorContainer &&
    !colorContainer.contains(event.target)
  ) {
    colorContainer.style.display = "none";
  }
});

// dark and light mode
let cardCode = document.querySelector("#mode");
let darkMode = document.getElementById("sunFull");
let lightMode = document.getElementById("moonFull");
let currentCardColor = display.style.background;
console.log(currentCardColor);
cardCode.addEventListener("click", function () {
  let currentCardColor = display.style.background;
  if (
    currentCardColor ===
    `linear-gradient(101.55deg, rgba(19, 19, 19, 0.9) 22.23%, rgba(19, 19, 19, 0.3) 100%)`
  ) {
    display.style.background = "";
    display.style.color = "black";

    if (
      lightMode.style.display != "flex" &&
      waterMark.style.color !== "black"
    ) {
      lightMode.style.display = "flex";
      darkMode.style.display = "none";
      waterMark.style.color = "black";
    }
  } else {
    display.style.background = `linear-gradient(101.55deg, rgba(19, 19, 19, 0.9) 22.23%, rgba(19, 19, 19, 0.3) 100%)`;
    display.style.color = "white";
    darkMode.style.display = "flex";
    lightMode.style.display = "none";
    waterMark.style.color = "white";
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
        <img src="${data.avatar ? `${data.avatar}` : ``}" class="avatar" />
        <div class="userName">
          <h2 class="name">${data.username ? `${data.username}` : ``}</h2>
          <h5 class="handle">${data.handle ? `${data.handle}` : ``}</h5>
        </div>
      </div>
      <p class="tweetText">${data.tweetText ? `${data.tweetText}` : ``}
</p>
      <h5 class="time">${data.timestamp ? `${data.timestamp}` : ``}</h5>
      <div id="tweetExpressions" class="tweetExpressions" style="display:flex">
        <h3 class="exp"
          > <svg width="11" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 16C12.6421 16 16 12.6421 16 8.5C16 4.35786 12.6421 1 8.5 1C4.35786 1 1 4.35786 1 8.5C1 9.69976 1.28171 10.8337 1.7826 11.8394C1.9157 12.1066 1.96001 12.412 1.88284 12.7005L1.43613 14.37C1.24222 15.0947 1.90526 15.7578 2.63001 15.5639L4.29954 15.1172C4.58795 15.04 4.89341 15.0843 5.16065 15.2174C6.16627 15.7183 7.30024 16 8.5 16Z" stroke="#212121" stroke-width="1.5"/>
</svg>
</span>${data.reply}<span>replies</span></h3
        >
        <h3 class="exp"
          ><svg width="17" height="17" viewBox="0 0 27 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 16.75C16.9142 16.75 17.25 16.4142 17.25 16C17.25 15.5858 16.9142 15.25 16.5 15.25V16.75ZM6.53033 0.469671C6.23744 0.176778 5.76256 0.176778 5.46967 0.469671L0.696699 5.24264C0.403806 5.53553 0.403806 6.01041 0.696699 6.3033C0.989593 6.5962 1.46447 6.5962 1.75736 6.3033L6 2.06066L10.2426 6.3033C10.5355 6.5962 11.0104 6.5962 11.3033 6.3033C11.5962 6.01041 11.5962 5.53553 11.3033 5.24264L6.53033 0.469671ZM10.5 0.25C10.0858 0.25 9.75 0.585786 9.75 1C9.75 1.41421 10.0858 1.75 10.5 1.75L10.5 0.25ZM17.25 1V1.75V1ZM21 4.75H21.75H21ZM20.4697 16.5303C20.7626 16.8232 21.2374 16.8232 21.5303 16.5303L26.3033 11.7574C26.5962 11.4645 26.5962 10.9896 26.3033 10.6967C26.0104 10.4038 25.5355 10.4038 25.2426 10.6967L21 14.9393L16.7574 10.6967C16.4645 10.4038 15.9896 10.4038 15.6967 10.6967C15.4038 10.9896 15.4038 11.4645 15.6967 11.7574L20.4697 16.5303ZM16.5 15.25H9.75V16.75H16.5V15.25ZM6.75 12.25V1H5.25V12.25H6.75ZM9.75 15.25C8.09315 15.25 6.75 13.9069 6.75 12.25H5.25C5.25 14.7353 7.26472 16.75 9.75 16.75V15.25ZM10.5 1.75L17.25 1.75V0.250001L10.5 0.25L10.5 1.75ZM20.25 4.75L20.25 16H21.75L21.75 4.75H20.25ZM17.25 1.75C18.9069 1.75 20.25 3.09315 20.25 4.75H21.75C21.75 2.26472 19.7353 0.250001 17.25 0.250001V1.75Z" fill="#212121"/>
</svg>
</span>${data.retweet}<span>Shares</span></h3
        >
        <h3 class="exp"
          ><svg width="13" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.06596 14.6154L7.53027 14.0264L7.06596 14.6154ZM9.71329 2.93062L9.17292 3.45072C9.31431 3.59762 9.5094 3.68062 9.71329 3.68062C9.91717 3.68062 10.1123 3.59762 10.2537 3.45072L9.71329 2.93062ZM12.3606 14.6154L12.8249 15.2043L12.3606 14.6154ZM7.53027 14.0264C6.20391 12.9808 4.77053 11.9719 3.63237 10.6903C2.51992 9.43766 1.75 7.98372 1.75 6.09918H0.25C0.25 8.45185 1.2312 10.2455 2.5108 11.6864C3.76469 13.0983 5.36429 14.2289 6.60164 15.2043L7.53027 14.0264ZM1.75 6.09918C1.75 4.26117 2.78844 2.72483 4.19813 2.08046C5.56053 1.4577 7.40445 1.61334 9.17292 3.45072L10.2537 2.41052C8.10129 0.17429 5.58856 -0.204392 3.57453 0.716224C1.60778 1.61523 0.25 3.69997 0.25 6.09918H1.75ZM6.60164 15.2043C7.04708 15.5555 7.5314 15.935 8.02373 16.2227C8.51582 16.5102 9.08722 16.75 9.71329 16.75V15.25C9.46802 15.25 9.1681 15.154 8.78052 14.9276C8.39318 14.7012 7.9895 14.3884 7.53027 14.0264L6.60164 15.2043ZM12.8249 15.2043C14.0623 14.2289 15.6619 13.0983 16.9158 11.6864C18.1954 10.2455 19.1766 8.45185 19.1766 6.09918H17.6766C17.6766 7.98372 16.9067 9.43766 15.7942 10.6903C14.656 11.9719 13.2227 12.9808 11.8963 14.0264L12.8249 15.2043ZM19.1766 6.09918C19.1766 3.69997 17.8188 1.61523 15.852 0.716224C13.838 -0.204392 11.3253 0.17429 9.17292 2.41052L10.2537 3.45072C12.0221 1.61334 13.866 1.4577 15.2284 2.08046C16.6381 2.72483 17.6766 4.26117 17.6766 6.09918H19.1766ZM11.8963 14.0264C11.4371 14.3884 11.0334 14.7012 10.6461 14.9276C10.2585 15.154 9.95855 15.25 9.71329 15.25V16.75C10.3393 16.75 10.9108 16.5102 11.4028 16.2227C11.8952 15.935 12.3795 15.5555 12.8249 15.2043L11.8963 14.0264Z" fill="#212121"/>
</svg>
</span>${data.likesCount}<span>likes</span></h3
        >
       
      </div>
    </div>
                    `;
  display.innerHTML = html;
  document.querySelector("#response").addEventListener("click", function () {
    let tweetExpressions = document.querySelector(".tweetExpressions");
    let expVisible = document.getElementById("arrows");
    let expHide = document.getElementById("arrows_out");
    console.log("work");
    if (tweetExpressions.style.display != "flex") {
      tweetExpressions.style.display = "flex";
      if (expVisible.style.display != "flex") {
        expVisible.style.display = "flex";
        expHide.style.display = "none";
      }
    } else {
      tweetExpressions.style.display = "none";
      expHide.style.display = "flex";
      expVisible.style.display = "none";
    }
  });
  // imageConvertion();
  //   });
  async function imageConvertion() {
    window.pageYOffset = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // transform to canvas
    html2canvas(displayImage, {
      allowTaint: true,
      taintTest: false,
      scale: 2,
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
