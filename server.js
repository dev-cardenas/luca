const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// Mapa básico de caracteres a IPA
const ipaMap = {
  j: "y",
  θ: "th",
  ʃ: "sh",
  ʤ: "j",
  ʧ: "ch",
};

function convertToIPA(text) {
  let ipaText = "";

  for (let char of text.toLowerCase()) {
    ipaText += ipaMap[char] || char;
  }

  return ipaText;
}

app.post("/translation", (req, res) => {
  const text = req.body.text;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const ipaText = convertToIPA(text);

  return res.json({ transcription: ipaText });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
