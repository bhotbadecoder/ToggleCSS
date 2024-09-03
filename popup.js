document.getElementById("disable-css").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ["content.js"],
      },
      () => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "disableCSS" },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
              return;
            }
            if (response && response.status === "CSS Disabled") {
              document.getElementById("disable-css").disabled = true;
              document.getElementById("enable-css").disabled = false;
            }
          }
        );
      }
    );
  });
});

document.getElementById("enable-css").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ["content.js"],
      },
      () => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "enableCSS" },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
              return;
            }
            if (response && response.status === "CSS Enabled") {
              document.getElementById("disable-css").disabled = false;
              document.getElementById("enable-css").disabled = true;
            }
          }
        );
      }
    );
  });
});
