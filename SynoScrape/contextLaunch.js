/*var tabID;
var selectedText;
var trimmedText;
var cleanedText;
var queryText;
var stringContainsSpaces;
var items = [];

var parent = chrome.contextMenus.create({
    "id": "SynoStart",
    "title": "Generate Synonyms",
    "contexts":["selection"],
    "onclick": genericOnClick
    });

chrome.tabs.onCreated.addListener(function() {
    
    chrome.tabs.getSelected(null, function(tab) { 
            tabID = tab.id;
            //console.log(tabID);
     })

    if (tabID) {
        chrome.tabs.executeScript(tabID, {file: "script.js"});
    }
});

function genericOnClick(onClickData) {
//Start
    chrome.storage.local.set({'wasClicked': true});
    selectedText = " ";
    items = [];
    selectedText = onClickData.selectionText;
    trimmedText = selectedText.replace(/[\.,\/#!$%\^&\*;:{}=_`~()]/g,"");
    $.trim(trimmedText);
    hasWhiteSpace(trimmedText);
    function hasWhiteSpace(s) {
        stringContainsSpaces = trimmedText.indexOf(' ') >= 0;
        if(stringContainsSpaces) {
            console.log("Spaces detected. Cleaning...");
            cleanedText = trimmedText.match(/^(\S+)\s(.*)/).slice(1);
            queryText = cleanedText[0];
            console.log(queryText);
        }
        else {
            console.log("no spaces");
            queryText = trimmedText;
            console.log(queryText);
        }
    }
    $.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22www.thesaurus.com%2Fbrowse%2F" + queryText + "%22", function(data){useReturnData(data);}, 'xml');
    function useReturnData(data){
        for(i=0; i<=4; i++) {
            foundItem = $(data).find('#synonyms-0 .relevancy-list ul:first li:nth-child(' + (i+1) +') a span.text').text();
            items.push(foundItem);
            console.log(foundItem);
        }
        console.info(items);
        updateContext();
    };
    
    function updateContext() {
        chrome.contextMenus.remove("SynoStart");
        chrome.contextMenus.create({
            "id": "SynoParent",
            "title": "Synonyms for: " + queryText,
            "contexts":["selection"],
            "onclick": genericOnClick
        });
        for(var j = 0; j < items.length; j++) {
                chrome.contextMenus.create({
                    "id": "SynoChild" + j,
                    "title": items[j],
                    "parentId": "SynoParent",
                    "contexts":["selection"]
                });
        }

    };
//End
};
*/
var tabID;
var name;
chrome.tabs.onCreated.addListener(function() {
    chrome.storage.local.set({'wasFired': false});
    chrome.tabs.getSelected(null, function(tab) { 
            tabID = tab.id;
            console.log(tabID);
     })

    if (tabID) {
        console.log("script should be working...");
        chrome.tabs.executeScript(tabID, {file: "script.js"});
    }
});


chrome.storage.onChanged.addListener(function() {
    chrome.storage.local.set({'wasFired': false});
    console.log("event firing");
    var master = chrome.contextMenus.create({
        "id": "SynoStart",
        "title": '%s',
        "contexts":["selection"]
    },
    function(){
        console.log(this.args[0].title);
    });
});







