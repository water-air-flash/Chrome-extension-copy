
var courseHTML = document.querySelector('#course_html');

var courseImage= document.querySelector('#course_image');

var courseFile= document.querySelector('#course_file');

courseHTML.addEventListener('click', function() {

  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {type: 'courseHTML'}, function(response) {
      console.log(response.farewell);
    });
  });
})


courseImage.addEventListener('click', function() {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {type: 'courseImage'}, function(response) {
      console.log(response.farewell);
    });
  });
})

courseFile.addEventListener('click', function() {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {type: 'courseFile'}, function(response) {
      console.log(response.farewell);
    });
  });
})