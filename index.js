import { inInputMode, ask } from './common.js';
import { helloWorld } from './apps/helloWorld.js'

// Define your command names directly
const commandNames = ["about", "axolotl", "dragon", "helloWorld", "isItGood", "joke", "personalInfo", "primeNumbers"];

// Object to hold the imported commands
const commands = {};

// Loop through the array and import each command function into the commands object
for (const commandName of commandNames) {
  const module = await import(`./apps/${commandName}.js`);
  commands[commandName] = module[commandName];
}

// Routing function
async function route_command(command, arg) {
  if (commands[command]) {
    return await commands[command](arg);
  }
  return 'Command not found';
}

// Main terminal
async function run() {
  const history = [];
  let historyIndex = -1;

  async function executeCommand() {
    if (inInputMode) {
      return;  // Exit the function if in "input mode"
    }
    const terminal = document.getElementById('terminal');
    const inputElement = document.getElementById('commandInput');
    const input = inputElement.value;
    inputElement.value = '';
    history.push(input);
    historyIndex = history.length;
    const [command, ...params] = input.split(' ');
    const joinedParams = params.join(' ').trim() || undefined;

    const commandElement = document.createElement('div');
    commandElement.textContent = '> ' + input;
    terminal.appendChild(commandElement);

    const output = await route_command(command, joinedParams);
    const outputElement = document.createElement('div');
    outputElement.textContent = output;
    terminal.appendChild(outputElement);
  }

  const inputElement = document.getElementById('commandInput');
  const submitButton = document.getElementById('submitButton');

  submitButton.className = 'inactive';

  inputElement.addEventListener('input', function() {
    if (inputElement.value === '') {
      submitButton.className = 'inactive';
    } else {
      submitButton.className = 'active';
    }
  });

  inputElement.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      executeCommand();
    }

    if (event.key === 'ArrowUp' && historyIndex > 0) {
      event.preventDefault();
      historyIndex--;
      inputElement.value = history[historyIndex];
      inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        inputElement.value = history[historyIndex];
      } else if (historyIndex === history.length - 1) {
        historyIndex++;
        inputElement.value = '';
      }
      inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);
    }
  });

  submitButton.addEventListener('click', function() {
    executeCommand();
  });

  function executePredefinedCommand(cmd) {
    const inputElement = document.getElementById('commandInput');
    inputElement.value = cmd;
    executeCommand();
  }

  executePredefinedCommand('about');

  document.getElementById('commandInput').focus();
}

run();
