
/*
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


    };
//End
};

*/

var tabID;
var selectedText;
var trimmedText;
var cleanedText;
var queryText;
var stringContainsSpaces;
var items = [];

/* Injects script.js into page when new tab is created, which listens for onContextMenu events. */
chrome.tabs.onCreated.addListener(function() {
    chrome.tabs.getSelected(null, function(tab) { 
            tabID = tab.id;
     })

    if (tabID) {
        chrome.tabs.executeScript(tabID, {file: "script.js"});
    }

});


chrome.storage.onChanged.addListener(function() {
    items= [];
    chrome.storage.local.get('userSelection', function (result) {
        selectedText = result.userSelection;
        if (selectedText) {
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
                console.log("Function finished");
                createContext();
            };
        }
    }); 
});

var createContext = function() {
    chrome.contextMenus.removeAll();
    for(j=0; j < items.length; j++) {
        chrome.contextMenus.create({
            "title": items[j],
            "contexts":["selection"]
        });
    }
    console.log("Initial menu created");
}





