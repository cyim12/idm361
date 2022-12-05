// TEST BUTTON
const audioObj = document.getElementById('audioArea');
var testButton = document.getElementById('testBtn');

testButton.onclick = function () {
    audioObj.play();
}