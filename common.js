
export let inInputMode = false;  // State variable to flag when the terminal is in "input mode"

export async function ask(question) {
    return new Promise((resolve) => {
      inInputMode = true;
      const terminal = document.getElementById('terminal');
      const inputElement = document.getElementById('commandInput');
      const submitButton = document.getElementById('submitButton');

      const outputElement = document.createElement('div');
      outputElement.innerHTML = marked.parse(question); // Use marked to convert
      terminal.appendChild(outputElement);

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