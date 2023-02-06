console.log("background");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == "postData") {
    chrome.runtime.sendMessage(request.data);
  }
});
