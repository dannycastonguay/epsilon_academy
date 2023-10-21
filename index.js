import { inInputMode, ask, preprocessMarkdown, commandNames } from './common.js';

// Object to hold the imported commands
const commands = {};

for (const commandName of commandNames) {
  const module = await import(`./apps/${commandName}.js`);
  commands[commandName] = module[commandName];
}

// Routing function
async function route_command(command, arg) {
  if (commands[command]) {
    return await commands[command](arg);
  }
  return `
  Command not found 🤔
  
  Available commands: ${commandNames.map(cmd => `\`${cmd}\``).join(', ')}.`;
}

// Main terminal
async function run() {
  const history = [];
  let historyIndex = -1;

  async function executeCommand(cmd = '') {
    if (inInputMode) {
      return;  // Exit the function if in "input mode"
    }
    const terminal = document.getElementById('terminal');
    const inputElement = document.getElementById('commandInput');
    const input = cmd || inputElement.value;
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
    //function parseNoInternet(text) { return text }
    //outputElement.innerHTML = parseNoInternet(preprocessMarkdown(output)); // If offline
    outputElement.innerHTML = marked.parse(preprocessMarkdown(output)); // Use marked to convert
    terminal.appendChild(outputElement);
    terminal.scrollTop = terminal.scrollHeight;  // Keeps terminal scrolled to the bottom
  }

  const inputElement = document.getElementById('commandInput');
  const submitButton = document.getElementById('submitButton');

  submitButton.className = 'inactive';

  inputElement.addEventListener('input', function () {
    if (inputElement.value === '') {
      submitButton.className = 'inactive';
    } else {
      submitButton.className = 'active';
    }
  });

  inputElement.addEventListener('keydown', function (event) {
    if (event.key === 'Tab') {
      event.preventDefault();

      const currentInput = inputElement.value.trim();
      const suggestion = commandNames.find(cmd => cmd.startsWith(currentInput));

      if (suggestion) {
        inputElement.value = suggestion;
      }
    }

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
  
  submitButton.addEventListener('click', function () {
    executeCommand();
  });

  function executePredefinedCommand(cmd) {
    const inputElement = document.getElementById('commandInput');
    inputElement.value = cmd;
    executeCommand();
  }

  executePredefinedCommand('about');

  document.getElementById('commandInput').focus();

  function handleButtonClick(event) {
    if (event.target.className === 'command-button') {
      inputElement.value = event.target.dataset.cmd;
      submitButton.className = 'active';
      document.getElementById('commandInput').focus();
      //executeCommand(event.target.dataset.cmd);
    }
  }

  document.getElementById('terminal').addEventListener('click', handleButtonClick);

}

run();

