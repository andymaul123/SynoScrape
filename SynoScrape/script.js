

window.oncontextmenu = function() {
    console.log("context was launched, omg!");
        /*chrome.storage.local.get('wasClicked', function (result) {
        wasClicked = result.wasClicked;
        if (wasClicked) {
            console.log("local storage working!");
            chrome.storage.local.set({'wasClicked': false});
            //wipe the local storage of entries to refresh everything
        }
    }); */
    chrome.storage.local.set({'wasFired': true});
};
