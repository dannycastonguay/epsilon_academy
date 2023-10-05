import init, { route_command } from '/pkg/epsilon_academy.js';

async function run() {
  await init();

  function executeCommand() {
    const terminal = document.getElementById('terminal');
    const inputElement = document.getElementById('commandInput');
    const input = inputElement.value;

    const [command, ...params] = input.split(' ');

    // Append the command to terminal
    const commandElement = document.createElement('div');
    commandElement.textContent = '> ' + input;
    terminal.appendChild(commandElement);

    // Append the output to terminal
    const output = route_command(command, params.join(' '));
    const outputElement = document.createElement('div');
    outputElement.textContent = output;
    terminal.appendChild(outputElement);

    // Clear the input
    inputElement.value = '';
  }


  document.getElementById('commandInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      executeCommand();
    }
  });

  document.getElementById('submitButton').addEventListener('click', function() {
    executeCommand();
  });

}

run();
