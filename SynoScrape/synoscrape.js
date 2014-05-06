var selectedText;
var trimmedText;
var cleanedText;
var queryText;
var stringContainsSpaces;
var items = [];
var synonyms;

var createMenu = chrome.contextMenus.create({
    "title": "Scrape Synonyms",
    "contexts":["selection"],
    "onclick": genericOnClick
});

function genericOnClick(onClickData) {
    items = [];
    selectedText = onClickData.selectionText;
    trimmedText = selectedText.replace(/[\.,\/#!$%\^&\*;:{}=_`~()]/g,"");
    $.trim(trimmedText);
    hasWhiteSpace(trimmedText);
    function hasWhiteSpace(s) {
        stringContainsSpaces = trimmedText.indexOf(' ') >= 0;
        if(stringContainsSpaces) {
            //console.log("Spaces detected. Cleaning...");
            cleanedText = trimmedText.match(/^(\S+)\s(.*)/).slice(1);
            queryText = cleanedText[0];
            //console.log(queryText);
        }
        else {
            //console.log("no spaces");
            queryText = trimmedText;
            //console.log(queryText);
        }
    }
    $.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22www.thesaurus.com%2Fbrowse%2F" + queryText + "%22", function(data){useReturnData(data);}, 'xml');
    function useReturnData(data){
        for(i=0; i<=9; i++) {
            foundItem = $(data).find('#synonyms-0 .relevancy-list ul:first li:nth-child(' + (i+1) +') a span.text').text();
            items.push(foundItem);
            //console.log(foundItem);
            synonyms = items.join('\n');
        }
        window.alert("Synonyms for " + queryText + " are :" + "\n" + "\n" + synonyms);
    };
}