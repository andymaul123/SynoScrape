
chrome.contextMenus.create({
    "title": "Synonyms", 
    "contexts":["selection"],
    "onclick": genericOnClick
});
var selectedText;

function genericOnClick(onClickData) {
    //selectedText = onClickData.selectionText;
    //console.log(selectedText);

    $.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22www.thesaurus.com%2Fbrowse%2Fbright%22", function(data){useReturnData(data);}, 'xml');

    function useReturnData(data){
        for(i=0; i<=4; i++) {
            foundItem = $(data).find('#synonyms-0 .relevancy-list ul:first li:nth-child(' + (i+1) +') a span.text').text();
            console.log(foundItem);
        }
    };
};