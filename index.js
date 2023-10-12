// Define utility functions
function dragon () {
  return "You have been reincarnated as a dragon are you a boy or girl?"
}

function about() {
  return "The purpose of this web app is to run simple applications. Epsilon in math is a small positive number, and in our context, it symbolizes infinite curiosity. Founders: Danny Castonguay (your bio here), Pascale (Inspired by French math), Linus (Inspired by the creator of Linux), Ada (Inspired by the first programmer). We design all software products ourselves and publish content on what we learn. Try the following commands: about (this), hello_world, and prime_numbers NUM.";
}

function hello_world() {
  return "Hello world";
}

function prime_numbers(max) {
  let result = [];
  for(let i = 2; i <= max; i++) {
    if (is_prime(i)) {
      result.push(i);
    }
  }
  return result.join(", ");
}

function is_prime(n) {
  for(let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return n > 1;
}

function route_command(command, arg) {
  switch(command) {
    case "about": return about();
    case "hello_world": return hello_world();
    case "prime_numbers": return prime_numbers(arg);
    default: return "Command not found";
  }
}

async function run() {

  const history = [];
  let historyIndex = -1;

  function executeCommand() {
    const terminal = document.getElementById('terminal');
    const inputElement = document.getElementById('commandInput');
    const input = inputElement.value;
    history.push(input);
    historyIndex = history.length;
    const [command, ...params] = input.toLowerCase().split(' ');

    const commandElement = document.createElement('div');
    commandElement.textContent = '> ' + input;
    terminal.appendChild(commandElement);

    const output = route_command(command, params.join(' '));
    const outputElement = document.createElement('div');
    outputElement.textContent = output;
    terminal.appendChild(outputElement);
    inputElement.value = '';
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


}

run()
