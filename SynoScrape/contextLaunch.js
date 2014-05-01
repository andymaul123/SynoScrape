
chrome.contextMenus.create({
    "title": "Synonyms", 
    "contexts":["selection"],
    "onclick": genericOnClick
});
var selectedText;
var trimmedText;
var cleanedText;
var stringContainsSpaces;

function genericOnClick(onClickData) {
    selectedText = onClickData.selectionText;
    trimmedText = $.trim(selectedText);
    trimmedText.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");

    //console.log(trimmedText);
    hasWhiteSpace(trimmedText);

    function hasWhiteSpace(s) {
        stringContainsSpaces = trimmedText.indexOf(' ') >= 0;
        //console.log(stringContainsSpaces);
        
        if(stringContainsSpaces) {
            console.log("Spaces detected. Cleaning...");
            cleanedText = trimmedText.match(/^(\S+)\s(.*)/).slice(1);
            console.log(cleanedText[0]);
        }
        else {
            console.log("no spaces");
            cleanedText = trimmedText;
            console.log(cleanedText);
        }
    }


    /*
    $.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22www.thesaurus.com%2Fbrowse%2F" + selectedText + "%22", function(data){useReturnData(data);}, 'xml');

    function useReturnData(data){
        for(i=0; i<=4; i++) {
            foundItem = $(data).find('#synonyms-0 .relevancy-list ul:first li:nth-child(' + (i+1) +') a span.text').text();
            console.log(foundItem);
        }
    }; */
};