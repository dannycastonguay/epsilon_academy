// Initialize cost per minute (replace with actual cost)
const costPerMinute = 0.006;

// Function to start and stop recording
const startStopRecording = async () => {
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
      alert(`Text: ${data.text}`);
      alert(`This API call cost you $${cost.toFixed(4)}`);
    } else {
      alert('Error with API call');
    }
  };

  // Start recording
  mediaRecorder.start();
  startTime = Date.now();

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

// Call the function to start recording and display the stop button
startStopRecording();
