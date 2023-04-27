const eventCode = [
  ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
  ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Delete"],
  ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Backslash", "Enter"],
  ["ShiftLeft", "IntlBackslash", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"],
  ["ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"],
];

const funcButtonClass = {
	Backspace: "backspace",
	Tab: "tab",
	Delete: "del",
	CapsLock: "capslock",
	Enter: "enter",
	Space: "space",
	ShiftLeft: "shift-left",
	ShiftRight: "shift-right",
};

const english = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "Del"],
  ["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "Enter"],
  ["Shift", "\\", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "▲", "Shift"],
  ["Ctrl", "Win", "Alt", " ", "Alt Gr", "◄", "▼", "►", "Ctrl"],
];

let body = document.querySelector("body");
let container = document.createElement("div");
container.className = "container";

let textarea = document.createElement("textarea");
textarea.rows = 5;
textarea.cols = 50;
textarea.className = "textarea";

let keyboard = document.createElement("div");
keyboard.className = "keyboard";

body.appendChild(container);
container.appendChild(textarea);
container.appendChild(keyboard);


for(let i = 0; i < english.length; i++) {
  let keyboardRow = keyboard.appendChild(document.createElement("div"));
  keyboardRow.className = "keyboard__row";
  for(let j = 0; j < english[i].length; j++) {
    let key = keyboardRow.appendChild(document.createElement("button"));
    key.innerHTML = english[i][j];
    key.id = eventCode[i][j];
    key.className = "button";
    if (key.id in funcButtonClass) key.classList.add(funcButtonClass[key.id]);
  }
}