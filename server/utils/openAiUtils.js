export const CATEGORY_WEIGHTS = {
  "Spiritual Health": 0.7,
  "Personal Growth": 0.8,
  "Career & Finances": 0.9,
  "Emotional/Mental Health": 1.0,
  "Physical Health": 1.1,
  "Social Relationships": 1.2,
};

export const ACTIVITY_CATEGORIES = {
  "Family & Friends": "Social Relationships",
  Dating: "Social Relationships",
  "Social Media": "Social Relationships",

  Meditation: "Spiritual Health",

  "Me-Time": "Emotional/Mental Health",
  "Watching TV": "Emotional/Mental Health",
  Gaming: "Emotional/Mental Health",

  "Healthy Eating": "Physical Health",
  Hydration: "Physical Health",
  "Sleep Early": "Physical Health",
  Sport: "Physical Health",
  Walking: "Physical Health",

  Learning: "Personal Growth",
  Reading: "Personal Growth",
  "Other Hobbyies": "Personal Growth",

  Working: "Career & Finances",
  "Review Finances": "Career & Finances",
  "Weekly Planning": "Career & Finances",
};

export const buildAIPrompt = (entries) => {
  const categoryCounts = {};

  for (const entry of entries) {
    for (const activity of entry.activities || []) {
      const category = ACTIVITY_CATEGORIES[activity];
      if (!category) continue;

      const weight = CATEGORY_WEIGHTS[category] || 1.0;
      categoryCounts[category] = (categoryCounts[category] || 0) + weight;
    }
  }

  const weightsText = Object.entries(CATEGORY_WEIGHTS)
    .map(([category, weight]) => `- ${category} (${weight})`)
    .join("\n");

  const categorySummary = Object.entries(categoryCounts)
    .map(([category, score]) => `- ${category}: ${score.toFixed(2)} pts`)
    .join("\n");

  const formattedDays = entries
    .map((entry) => {
      const activitiesText = (entry.activities || [])
        .map((activity) => {
          const category = ACTIVITY_CATEGORIES[activity];
          const weight = CATEGORY_WEIGHTS[category] || 1.0;
          return `${activity} (${category}, weight: ${weight})`;
        })
        .join(", ");

      return `Date: ${entry.date}
Emotion: ${entry.emotion}
Activities: ${activitiesText || "No activities recorded"}
Note: ${entry.note || "No note provided"}
`;
    })
    .join("\n");

  return `Task:
Evaluate the balance of the user’s life across different well-being categories. Use the provided weights to assess category importance. Identify which categories are well-represented and which are lacking. Based on your analysis, provide motivational and realistic suggestions to improve balance. Be encouraging, not judgmental.

Input:
You will receive:
- A list of categories with weights (representing their importance for a balanced life).
- A summary of how many points were accumulated in each category based on the user’s activities.
- Raw daily entries for the last 3 days, including emotion, activities, and an optional note.

Categories and weights:
${weightsText}

Category Score Summary:
${categorySummary}

User Journal Entries:
${formattedDays}

Output:
Write a concise and supportive summary that:
1. Highlights areas of life that are in balance.
2. Identifies categories that are underrepresented.
3. Offers 1-2 motivational and practical tips for improvement.
4. Uses a compassionate and supportive tone.

Finally, end your message with this exact line (on a separate line):
Balance Score: XX
(Where XX is a number between 0 and 100 reflecting how balanced the user’s last 3 days were overall.)`;
};
