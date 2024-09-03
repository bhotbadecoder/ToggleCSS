(function () {
  let removedStyles = [];

  // Function to disable CSS
  function disableCSS() {
    removedStyles = []; // Clear the array
    document
      .querySelectorAll('style, link[rel="stylesheet"]')
      .forEach((element) => {
        removedStyles.push({
          node: element,
          parent: element.parentNode,
          sibling: element.nextSibling,
          href: element.href, // Store href for link elements
        });
        element.remove();
      });
  }

  // Function to enable CSS
  function enableCSS() {
    removedStyles.forEach(({ node, parent, sibling, href }) => {
      // Create a new element if the original node was a link with href
      let newElement;
      if (href) {
        newElement = document.createElement("link");
        newElement.rel = "stylesheet";
        newElement.href = href;
      } else {
        newElement = node.cloneNode(true);
      }

      // Reinsert the element
      if (sibling) {
        parent.insertBefore(newElement, sibling);
      } else {
        parent.appendChild(newElement);
      }
    });
    removedStyles = []; // Clear the array after re-enabling
  }

  // Listen for messages from popup.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "disableCSS") {
      disableCSS();
      sendResponse({ status: "CSS Disabled" });
    } else if (request.action === "enableCSS") {
      enableCSS();
      sendResponse({ status: "CSS Enabled" });
    }
  });
})();
