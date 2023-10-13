let inInputMode = false;  // State variable to flag when the terminal is in "input mode"

async function ask(question) {
  return new Promise((resolve) => {
    inInputMode = true;
    const terminal = document.getElementById('terminal');
    const inputElement = document.getElementById('commandInput');
    const submitButton = document.getElementById('submitButton');

    const div = document.createElement('div');
    div.textContent = question;
    terminal.appendChild(div);

    const handleInput = (event) => {
      if (event.type === 'keydown' && event.key !== 'Enter') return;
      inputElement.removeEventListener('keydown', handleInput);
      submitButton.removeEventListener('click', handleInput);
      resolve(inputElement.value);
      inputElement.value = '';
      inInputMode = false;
    };

    inputElement.addEventListener('keydown', handleInput);
    submitButton.addEventListener('click', handleInput);
  });
}

// Define apps
async function personalInfo() {
  const name = await ask('What is your name?');
  const age = await ask('What is your age?');
  let driversLicense = '';

  if (parseInt(age) > 15) {
    driversLicense = await ask('Do you have a driver\'s license? (yes/no)');
  }

  const confirmation = `Your name is ${name} and you are ${age} years old.`;
  const licenseInfo = driversLicense ? ` Driver's License: ${driversLicense}.` : ' You are too young for a driver\'s license.';

  return confirmation + licenseInfo;
}

async function dragon () {
  const gender = await ask("You have been reincarnated as a dragon. Are you a [boy], a [girl], or something_else?");
  const dragonType = (await ask(`Okay, you are a ${gender}. Are a [Seawing], [Rainwing], [Nightwing], [Mudwing], [Sandwing], or [Skywing]?`)).toLowerCase();

  switch(dragonType) {
    case "seawing": return "Something something";
    case "rainwing": return "Something something";
    case "nightwing": return "Something something";
    case "mudwing": return "Something something";
    case "sandwing": return "Something something";
    case "skywing": return "Something something";
    default: return `What's a ${dragonType}? You aren't a even dragon!!`;
  }
}

function about() {
  return "The purpose of this web app is to run simple applications. Epsilon in math is a small positive number, and in our context, it symbolizes infinite curiosity. Founders: Danny Castonguay (your bio here), Pascale (Inspired by French math), Linus (Inspired by the creator of Linux), Ada (Inspired by the first programmer). We design all software products ourselves and publish content on what we learn. Try the following commands: about (this), hello_world, dragon, and prime_numbers NUM.";
}

function hello_world() {
  return "Hello world";
}

function prime_numbers(max = 100) {
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

// Route the apps
async function route_command(command, arg) {
  switch(command) {
    case "about": return about(arg);
    case "hello_world": return hello_world(arg);
    case "prime_numbers": return prime_numbers(arg);
    case "dragon": return dragon();
    case "boy": return boy();
    case "girl": return girl();
    case "something_else": return something_else();
    case "seawing": return seawing ();
    case "personal_info": return await personalInfo(arg);
    default: return "Command not found";
  }
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
    const [command, ...params] = input.toLowerCase().split(' ');
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
