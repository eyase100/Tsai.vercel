export default async function handler(req, res) {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response.";

    res.status(200).json({ reply });

  } catch (err) {
    console.error("TSAI backend error:", err);
    res.status(500).json({ reply: "TSAI encountered an error." });
  }
      }
