import axios from 'axios'

export const askAi = async (messages) => {
    try {
        if(!messages || !Array.isArray(messages) || messages.length===0){
            throw new Error("Messages array is empty.")
        }
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",{
           model: "google/gemma-3-12b-it",
        messages,
        max_tokens: 500,
        temperature: 0.2
        },{
            headers: {
    Authorization:
     `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
        });
        const content = response?.data?.choices?.[0]?.message?.content;

        if(!content || !content.trim()){
            throw new Error("AI retirned empty response:")
        }
        return content
    } catch (error) {
    console.error("========== OPENROUTER ERROR ==========");

    console.error("Message:", error.message);

    console.error("Code:", error.code);

    console.error("Response:", error.response?.data);

    console.error("Status:", error.response?.status);

    console.error("Full Error:");
    console.error(error);

    throw new Error("Openrouter API Error");
}
}