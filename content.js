// Script


function onevent(selector, signature, callback) {
    var array = document.querySelectorAll(selector);
    if (obj) {
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            element.addEventListener(signature, callback);
        }
    }
}

onevent('a', 'mouseover', function (event) {
    currentUrlElement = event.target;
})
var currentUrlElement = undefined;

document.addEventListener('keydown', function (event) {
    console.log(event)
    if (event.shiftKey) {
        if (event.keyCode === 81)//1
        {
            if (currentUrlElement !== undefined) {
                Clipboard.copy(currentUrlElement.textContent.trim());
                return false;
            }
        } else if (event.keyCode === 87) {
            if (currentUrlElement !== undefined) {
                Clipboard.copy(currentUrlElement.href.trim());
                return false;
            }
        }
    }
})



// Clipboard
var Clipboard, root;

Clipboard = {
    _createTextArea: function () {
        var textArea;
        textArea = document.createElement("textarea");
        textArea.style.position = "absolute";
        textArea.style.left = "-100%";
        return textArea;
    },
    copy: function (arg) {
        var data, textArea;
        data = arg;
        textArea = this._createTextArea();
        textArea.value = data;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        return document.body.removeChild(textArea);
    },
    paste: function () {
        var textArea, value;
        textArea = this._createTextArea();
        document.body.appendChild(textArea);
        textArea.focus();
        document.execCommand("Paste");
        value = textArea.value;
        document.body.removeChild(textArea);
        return value;
    }
};

root = typeof exports !== "undefined" && exports !== null ? exports : window;

root.Clipboard = Clipboard;