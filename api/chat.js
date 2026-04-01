export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt, model } = req.body;
        const apiKey = process.env.API_KEY; // Vercel Dashboard se uthayega

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "X-Title": "Ansh AI Playground"
            },
            body: JSON.stringify({
                "model": model,
                "messages": [{ "role": "user", "content": prompt }]
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Server Error: " + error.message });
    }
}
