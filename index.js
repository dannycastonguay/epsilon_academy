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

async function is_it_good(){
await ask ("Please rate us 1-10")
switch (is_it_good){
case "1": return "Oh, I'm sorry we're not up to your standards."  
}  
} 


function joke() {
const j = Math.floor(Math.random() * 11) + 1;
if (j === 1){return "Knock, knock. Who's there? Copycat. Copycat who? Copycat who?";}  // You can add more conditions and jokes for other numbers here
if (j === 2){return "Why was the math book sad? Because it had too many problems."}   
if (j === 3){return "How do you organize a space party? You “planet”!"}
if (j === 4){return "What do you call a fish with no eyes? Fsh."}
if (j === 5){return "How does a penguin build its house? Igloos it together."}
if (j === 6){return "What did one wall say to the other wall? “I'll meet you at the corner!”"}
if (j === 7){return "Why did the scarecrow win an award? Because he was outstanding in his field!"}
if (j === 8){return "What kind of tree fits in your hand? A palm tree."}
if (j === 9){return "What's the best thing about Switzerland? I don't know, but the flag is a big plus."}
if (j === 10){return "Why do we tell actors to “break a leg?”Because every play has a cast"}
if (j === 11){return "Hah! Jokes on YOU."}
}

async function dragon() {
  const gender = await ask("You have been reincarnated as a dragon. Are you a [boy], a [girl], or something_else?");
  const dragonType = (await ask(`Okay, you are a ${gender}. Are you a [Seawing], [Rainwing], [Nightwing], [Mudwing], [Sandwing], or [Skywing]?`)).toLowerCase();

  let description;

  switch (dragonType) {
    case "seawing":
      description = "A seawing is a dragon that can breathe underwater, they have glowing scales to communicate.";
      break;
    case "rainwing":
      description = "A rainwing has color-changing scales, and can spit venom. But they have to have their suntime during the day.";
      break;
    case "nightwing":
      description = "Nightwings are nocturnal dragons, they are black to mimic the night sky with stars below their wings. And can breathe fire.";
      break;
    case "mudwing":
      description = "Mudwings are large and bulky dragons, they like to stay in a pack with their siblings and can breathe underwater for 2 hours.";
      break;
    case "sandwing":
      description = "These dragons are specially accustomed to the desert, they have a poisonous barb on their tail and their scales generate warmth.";
      break;
    case "skywing":
      description = "Skywings are tall dragons with large wings, they are the fastest flying dragons, they can breathe fire.";
      break;
    default:
      description = `What's a ${dragonType}? You aren't even a dragon!!`;
  }

  const option = await ask(`You have chosen to be a ${dragonType}.\n${description}\nAre you sure you want to be this dragon [yes] or [no]`);
  if (option.toLowerCase() === "yes") {
    const result = await story(gender, dragonType);
    console.log(result);
  } else {
    const newDragonType = (await ask("Are you a [Seawing], [Rainwing], [Nightwing], [Mudwing], [Sandwing], or [Skywing]?")).toLowerCase();
    dragon(newDragonType); // Recursive call with the new choice
  }
}

async function story(gender, dragonType) {
  const intro = (await ask(`You wake up as a ${gender} ${dragonType} dragon in your egg.\nWhat will you do?\n[1] Break out of the egg\n[2] Stay in the egg`)).trim();

  switch (intro) {
    case "one":description = "You burst out of your egg, floating in the water. Your mother picks you up into her arms.";
    case "two":description = "You decide it's too scary and wait inside the egg for a while.";
  }
}


// You can continue adding more story functions with different options as needed.

// Start the interaction without calling the dragon function

function about() {
  return "The purpose of this web app is to run simple applications. Epsilon in math is a small positive number, and in our context, it symbolizes infinite curiosity. Founders: Danny Castonguay (your bio here), Pascale (Inspired by French math), Linus (Inspired by the creator of Linux), Ada (Inspired by the first programmer). We design all software products ourselves and publish content on what we learn. Try the following commands: about (this), hello_world, dragon, joke, and prime_numbers NUM.";
}
  
async function axolotl() {
  const gender = await ask("You have been reincarnated as an axolotl. Are you a boy, a girl, or something else (for instance: a banana)?");
  const axolotlType = await ask(`Okay, you are a ${gender}. Are you a Wild Type, Leucistic, Albino, Golden, Melanoid, Piebald, Chimera, Copper, Green Fluorescent Protein, or Axanthic?`);

  switch (axolotlType.toLowerCase()) {
    case "wild type":
      return "Your skin is natural, with dark pigmentation and specks of lighter color.";
    case "leucistic":
      return "Your skin is pale or white, don't forget to put sunscreen on! And those red gills match well your rosy shoes! :-)";
    case "albino":
      return "You're completely white with pinkish gills and red eyes, like a little axolotl ghost!";
    case "golden":
      return "You shine with a golden-yellow skin, you're the axolotl with the Midas touch!";
    case "melanoid":
      return "You're dark and mysterious, almost like the Batman of axolotls!";
    case "piebald":
      return "You have irregular patches of white on a dark background, like a fashionable axolotl in polka dots!";
    case "chimera":
      return "You're a double dose of style, with two distinct color patterns on one body!";
    case "copper":
      return "You're unique with your copper-colored skin, quite the metalhead axolotl!";
    case "green fluorescent protein":
      return "You glow under UV light thanks to a special gene, you're the axolotl party light!";
    case "axanthic":
      return "You lack yellow pigment, giving you a cool grayish appearance, like a silver axolotl!";
    default:
      return `What's a ${axolotlType}? You're not even an axolotl!!`;
  }
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
    case "joke": return joke();
    case "is_it_good": return is_it_good();
    case "axolotl": return axolotl();
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
