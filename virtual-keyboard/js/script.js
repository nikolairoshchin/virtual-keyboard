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
  ControlLeft: "control-left",
  MetaLeft: "meta-left",
  AltLeft: "alt-left",
  AltRight: "alt-right",
  ControlRight: "control-right",
};

const enLower = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "Del"],
  ["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "Enter"],
  ["Shift", "\\", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "▲", "Shift"],
  ["Ctrl", "Win", "Alt", " ", "Alt Gr", "◄", "▼", "►", "Ctrl"],
];

const enUpper = [
  ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace"],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "Del"],
  ["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "|", "Enter"],
  ["Shift", "|", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "▲", "Shift"],
  ["Ctrl", "Win", "Alt", " ", "Alt Gr", "◄", "▼", "►", "Ctrl"],
];

const ruLower = [
  ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "Del"],
  ["CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "\\", "Enter"],
  ["Shift", "\\", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "▲", "Shift"],
  ["Ctrl", "Win", "Alt", " ", "Alt Gr", "◄", "▼", "►", "Ctrl"],
];

const ruUpper = [
  ["Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace"],
  ["Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "Del"],
  ["CapsLock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "/", "Enter"],
  ["Shift", "/", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "▲", "Shift"],
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
keyboard.id = "keyboard";

let isCapsLock = false;
let isShift = false;
let isUpperCase = false;
let isAltLeft = false;
let lang = "en";

body.appendChild(container);
container.appendChild(textarea);
container.appendChild(keyboard);


for(let i = 0; i < enLower.length; i++) {
  let keyboardRow = keyboard.appendChild(document.createElement("div"));
  keyboardRow.className = "keyboard__row";
  for(let j = 0; j < enLower[i].length; j++) {
    let button = keyboardRow.appendChild(document.createElement("button"));
    button.innerHTML = enLower[i][j];
    button.id = eventCode[i][j];
    button.className = "button";
    if (button.id in funcButtonClass) button.classList.add(funcButtonClass[button.id]);
    button.addEventListener('click', inputText);
  }
}

function inputText(e) {
  let cursorPosition = textarea.selectionStart;
  switch (e.target.id) {
    case "Backspace":
  	  deleteSymbol(cursorPosition - 1);
  	  break;
    case "Delete":
      deleteSymbol(cursorPosition);
  	  break;
  	case "Tab":
  	  insertSymbol("    ", cursorPosition);
  	  break;
  	case "Enter":
  	  insertSymbol("\n", cursorPosition);
  	  break;
  	case "CapsLock":
  	  isCapsLock = !isCapsLock;
  	  isUpperCase = !isUpperCase;
      changeCase();
      break;
  	case "ShiftLeft":
  	case "ShiftRight":
      toggleShift(true);
  	  break;
  	case "AltLeft":
  		if (isShift) {
  		  if (lang === "en") {
            lang = "ru";
          } else {
      	    lang = "en";
          }
        toggleShift(false);
  		}
  		break;
  	default:
      if (!(e.target.id in funcButtonClass) || (e.target.id === "Space")) {
        insertSymbol(e.target.innerHTML, cursorPosition);
        if (isShift) {
          toggleShift(false);
        }
  	  }
  }
}

function deleteSymbol(position) {
	textarea.value =
  		  textarea.value.substring(0, position) +
  	      textarea.value.substring(position + 1);
  	      textarea.focus();
  	      textarea.selectionStart = position;
  	      textarea.selectionEnd = position;
}

function insertSymbol(symbol, position) {
  textarea.value =
        textarea.value.slice(0, position) +
        symbol +
  	    textarea.value.slice(position);
  	    textarea.focus();
  	    textarea.selectionEnd = position + symbol.length;
}

function changeCase() {
  let i = 0;
  let j = 0;
  if (lang === "en") {
    if (isUpperCase) {
  	  arr = enUpper;
    } else {
  	  arr = enLower;
    }
  }
  if (lang === "ru") {
    if (isUpperCase) {
  	  arr = ruUpper;
    } else {
      arr = ruLower;
    }
  }
  for (const el of keyboard.children) {
  	for (const keyS of el.children) {
      	keyS.innerHTML = arr[i][j];
      j++
    }
    j = 0;
    i++;
  }
}

function toggleShift(state) {
  isShift = state;
  isUpperCase = state;
  changeCase();
}