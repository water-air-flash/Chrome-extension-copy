// Script


function onevent(selector, signature, callback) {
  var array = document.querySelectorAll(selector);
  if (array) {
    for (var index = 0; index < array.length; index++) {
      var element = array[index];
      element.addEventListener(signature, callback);
    }
  }
}

onevent('a', 'mouseover', function(event) { currentUrlElement = event.target; })
    var currentUrlElement = undefined;

document.addEventListener('keydown', function(event) {
  console.log(event);

  if (event.altKey) {
    if (event.keyCode === 90)  // q
    {
      if (currentUrlElement !== undefined) {
        Clipboard.copy(currentUrlElement.textContent.trim());
        return false;
      }
    } else if (event.keyCode === 88) {  // w

      if (typeof currentUrlElement !== 'undefined') {
        var h = currentUrlElement.href;
        console.log(currentUrlElement);
        while (!h) {
          currentUrlElement = currentUrlElement.parentNode;

          h = currentUrlElement.href;
        }
        Clipboard.copy(h.trim());
        return false;
      }
    } else if (event.keyCode === 67) {  // z
      var img = document.querySelector('#banner-thumbnail img');
      if (img) {
        var url = img.getAttribute('src');
        window.open(url, '_blank')
      }
    }
  }
});


/**
 *
 */

function copyCourse() {
  var obj = document.querySelector('#toc-content .course-toc');
  console.log(obj);
  if (obj) Clipboard.copy(obj.outerHTML);
}
function courseImage() {
  var img = document.querySelector('#banner-thumbnail img');
  if (img) {
    var url = img.getAttribute('src');
    window.open(url, '_blank');
  }
}

function downloadFileFromText(url) {
  var a = document.createElement('a');
  a.href = url;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();  // this is probably the key - simulating a click on a download
              // link
  delete a;   // we don't need this anymore
}


// Clipboard
var Clipboard, root;

Clipboard = {
  _createTextArea: function() {
    var textArea;
    textArea = document.createElement('textarea');
    textArea.style.position = 'absolute';
    textArea.style.left = '-100%';
    return textArea;
  },
  copy: function(arg) {
    var data, textArea;
    data = arg;
    textArea = this._createTextArea();
    textArea.value = data;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('Copy');
    return document.body.removeChild(textArea);
  },
  paste: function() {
    var textArea, value;
    textArea = this._createTextArea();
    document.body.appendChild(textArea);
    textArea.focus();
    document.execCommand('Paste');
    value = textArea.value;
    document.body.removeChild(textArea);
    return value;
  }
};

root = typeof exports !== 'undefined' && exports !== null ? exports : window;

root.Clipboard = Clipboard;

/**
 *
 */
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.type == 'courseHTML') {
    copyCourse();
    sendResponse({farewell: 'goodbye'});
  } else if (request.type == 'courseImage') {
    courseImage();
    sendResponse({farewell: 'goodbye'});
  } else if (request.type == 'courseFile') {
    var obj = document.querySelector('a.course-file .exercise-name');
    if (obj) Clipboard.copy(obj.innerHTML);
  } else {
    sendResponse({});  // snub them.
  }
});
