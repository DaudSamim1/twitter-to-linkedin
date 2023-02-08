var window = window ?? self;
console.log("background");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == "postData") {
    // chrome.tabs.create({ url: "./dashboard.html" }, function (tab) {

    // });
    chrome.runtime.sendMessage(request.data);
  }
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.message === "get_access_token") {
    chrome.identity.getAuthToken({ interactive: true }, (authToken) => {
      chrome.runtime.sendMessage({
        message: "send_access_token",
        token: authToken,
      });
    });
  } else if (request.message === "get_google_profile") {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      }
    );
    const data = await response.json();

    chrome.runtime.sendMessage({
      message: "send_google_profile",
      profile: data,
    });
  } else if (request.message === "logout") {
    if (request.token) {
      var url =
        "https://accounts.google.com/o/oauth2/revoke?token=" + request.token;
      window.fetch(url);

      chrome.identity.removeCachedAuthToken({ token: request.token }, () => {
        console.log("removed from cache");
      });

      chrome.identity.clearAllCachedAuthTokens(() => {
        console.log("User Logged out");
      });
    }
  }
});
