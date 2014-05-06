/* Listens for when a user right clicks and logs their selection to local storage. */
window.onmouseup = function() {
    var capturedSelection = window.getSelection().toString();
    if(capturedSelection.length >= 1) {
        chrome.storage.local.set({'userSelection': capturedSelection});
        console.log("Script.js ran successfully.");
    }
};

