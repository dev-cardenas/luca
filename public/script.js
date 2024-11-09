document
  .getElementById("translateButton")
  .addEventListener("click", async () => {
    const inputText = document.getElementById("inputText").value;

    if (!inputText.trim()) {
      alert("Please enter some text to translate.");
      return;
    }

    try {
      const response = await fetch("/translation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const result = await response.json();

      if (result.transcription) {
        document.getElementById("outputText").value = result.transcription;
      } else {
        alert("Failed to translate text.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while translating.");
    }
  });

document.getElementById("copyButton").addEventListener("click", () => {
  const outputText = document.getElementById("outputText");

  if (!outputText.value.trim()) {
    alert("Nothing to copy!");
    return;
  }

  outputText.select();
  document.execCommand("copy");
});
