import { ask } from '../common.js';

// Initialize cost per minute (replace with actual cost)
const costPerMinute = 0.006;


export async function whisper() {
  // Prompt for OpenAI API key
  const apiKey = prompt("Enter your OpenAI API key:");

  let startTime = 0;
  let endTime = 0;

  // Initialize MediaRecorder
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  let audioChunks = [];

  mediaRecorder.ondataavailable = event => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = async () => {
    endTime = Date.now();
    const durationMinutes = (endTime - startTime) / 60000;
    const cost = durationMinutes * costPerMinute;

    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('file', audioBlob);

    // Send audio to Whisper ASR API
    const response = await fetch('https://api.openai.com/v1/whisper/asr', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      alert(`This API call cost you $${cost.toFixed(4)}. Text: ${data.text}`);
    } else {
      alert('Error with API call');
    }
  };

  // Start recording
  mediaRecorder.start();
  startTime = Date.now();

  const doneRecording = await ask(`
  # Whisper 🎙️

  You are being recorded! (unless your browser doesn't allow it). OpenAI will charge you $${costPerMinute} per minute. 
  
  Please reply [stop](cmd://stop) when you are done.`);

  if (doneRecording.toLowerCase() === "stop") {
    mediaRecorder.stop();
  }


  // Create and display the stop button
  const stopButton = document.createElement("button");
  stopButton.innerHTML = "Stop Recording";
  document.body.appendChild(stopButton);

  // Stop recording when the button is clicked
  stopButton.onclick = () => {
    mediaRecorder.stop();
    document.body.removeChild(stopButton);
  };
};
