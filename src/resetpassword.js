import "./assets/styles/customButtonstyle.scss";

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

let NextBtn=document.getElementById("nextBtn")

NextBtn.addEventListener("click" ,() =>{

  window.location.href=chrome.runtime.getURL("login.html");
 
})

