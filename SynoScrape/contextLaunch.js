/*
chrome.contextMenus.create({
    "title": "Synonyms", 
    "contexts":["selection"],
    "onclick": genericOnClick
});
var selectedText;

function genericOnClick(onClickData) {
    selectedText = onClickData.selectionText;
    console.log(selectedText);
//begin ajax request
    $('#container').load('http://google.com'); // SERIOUSLY!
 
    $.ajax({
        url: 'http://news.bbc.co.uk',
        type: 'GET',
        success: function(res) {
            var headline = $(res.responseText).find('a.tsh').text();
            alert(headline);
        }
    });
 
};
*/

$(document).ready(function() {
    requestCrossDomain('http://www.cnn.com', function(results) {
       $('#container').html(results);
});

})