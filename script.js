const apiKey = AIzaSyDz10enjkMdeWXkBxB2ziCLAAk0GrO4rOE;

document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("moodPicker").classList.remove("hidden");
});

async function pickMood(mood) {
  const planDiv = document.getElementById("plan");
  planDiv.innerHTML = "peelin' your plan... 🍌💭";

  const prompt = `You're Planana, a friendly, goofy Gen-Z life planner assistant. The user is feeling "${mood}". Give them a motivating, realistic daily plan with:
- music/creative time
- work or study focus
- breaks, food/water, self-care
Speak casually, like a supportive friend. Add emojis, affirmations, and banana energy.`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    planDiv.innerHTML = `<p>${reply}</p>`;
  } catch (err) {
    console.error(err);
    planDiv.innerHTML = "whoops, the banana tripped 😓 check your API key or try again later.";
  }
}
