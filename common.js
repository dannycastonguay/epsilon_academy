// common.js

// State variable to indicate whether the terminal is in "input mode".
// Useful for knowing whether the terminal is waiting for user input.
export let inInputMode = false;

// Define your command names directly
export const commandNames = ["about", "axolotl", "dragon", "helloWorld", "isItGood", "joke", "personalInfo", "primeNumbers", "wordle"];

/**
 * Asynchronously ask a question and wait for the user to respond.
 *
 * @param {string} question - The question to display in the terminal.
 * @returns {Promise<string>} - A Promise that resolves to the user's input.
 */
export async function ask(question) {
  return new Promise((resolve) => {
    inInputMode = true;
    const terminal = document.getElementById('terminal');
    const inputElement = document.getElementById('commandInput');
    const submitButton = document.getElementById('submitButton');

    const outputElement = document.createElement('div');
    outputElement.innerHTML = marked.parse(preprocessMarkdown(question)); // Use marked to convert
    terminal.appendChild(outputElement);
    terminal.scrollTop = terminal.scrollHeight;  // Keeps terminal scrolled to the bottom

    const handleInput = (event) => {
      if (event.type === 'keydown' && event.key !== 'Enter') return;
      inputElement.removeEventListener('keydown', handleInput);
      submitButton.removeEventListener('click', handleInput);
      resolve(inputElement.value);
      inputElement.value = '';
      inInputMode = false;
    };

    terminal.addEventListener('click', handleInput);
    inputElement.addEventListener('keydown', handleInput);
    submitButton.addEventListener('click', handleInput);
  });
}

/**
 * Preprocesses a markdown string to convert custom command links into HTML buttons.
 * 
 * Custom command links follow the pattern `[label](cmd://command)`.
 * 
 * @param {string} markdownString - The raw markdown string to preprocess.
 * @returns {string} - The preprocessed markdown string with custom command links
 *                     replaced by HTML button elements.
 */
export function preprocessMarkdown(markdownString) {
  return markdownString.replace(/\[([^\]]+)\]\(cmd:\/\/([^\)]+)\)/g, (match, label, cmd) => {
    return `<button class="command-button" data-cmd="${cmd}">${label}</button>`;
  });
}