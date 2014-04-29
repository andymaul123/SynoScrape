function genericOnClick(info, tab) {
    console.log("yay!");
}

var testVar = chrome.contextMenus.create({"title": "Synonyms", "contexts":["selection"],"onclick": genericOnClick});