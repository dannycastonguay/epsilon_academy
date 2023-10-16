
export let inInputMode = false;  // State variable to flag when the terminal is in "input mode"

export async function ask(question) {
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