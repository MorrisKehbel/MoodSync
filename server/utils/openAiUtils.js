export const CATEGORY_WEIGHTS = {
  "Spiritual Health": 0.7,
  "Personal Growth": 0.8,
  "Career & Finances": 0.9,
  "Emotional/Mental Health": 1.0,
  "Physical Health": 1.1,
  "Social Relationships": 1.2,
};

export const CATEGORY_ALIASES = {
  "Physical health": "Physical Health",
  Social: "Social Relationships",
  Finances: "Career & Finances",
  "Job satisfaction": "Career & Finances",
  Personal: "Personal Growth",
  Mental: "Emotional/Mental Health",
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

const PROMPT_TEMPLATES = {
  AISummary: ({ weightsText, categorySummary, formattedEntries }) =>
    `
Task:
Evaluate the balance of the user’s life across different well-being categories. Use the provided weights to assess category importance. Identify which categories are well-represented and which are lacking. Based on your analysis, provide motivational and realistic suggestions to improve balance. Be encouraging, not judgmental.

Input:
You will receive:
- A list of categories with weights (representing their importance for a balanced life).
- Raw daily entries for the last 3 days, including emotion, activities, and an optional note.
- Raw current and completed goals entries 
- additional a list of current and completed daily tasks entries. Tasks are not pre-assigned to categories. Based on their content (e.g. "Go for a run", "Call Mom", "Plan budget"), infer the likely well-being category they belong to using the known category weights. Include this categorization in your evaluation.

Categories and weights:
${weightsText}

Category Score Summary:
${categorySummary}

User Journal Entries:
${formattedEntries}

Output:
Write a concise and supportive summary that:
1. Highlights areas of life that are in balance.
2. Identifies categories that are underrepresented.
3. Offers 1-2 motivational and practical tips for improvement.
4. Uses a compassionate and supportive tone.

MUST: Finally, end your message with this exact line (on a separate line):
Balance Score: XX
(Where XX is a number between 0 and 100 reflecting how balanced the user’s last 3 days were overall.)`,

  goalInsight: ({ weightsText, categorySummary, formattedEntries }) =>
    `
  Task:
  The user has provided their current and completed goals with categories. Analyze these in terms of balance and wellbeing, and suggest how to improve their overall wellbeing based on life category weights.

Input:
You will receive:
- A list of categories with weights (representing their importance for a balanced life).
- Raw current and completed goals entries 

Categories and weights:
${weightsText}

Category Score Summary:
${categorySummary}

User Goals Entries:
${formattedEntries}


Output:
Write a concise and supportive summary that:
1. 1 sentence comparison to the previous summary.
2. 1 sentences reflecting on completed goals (if any).
3. 2-3 motivational tips for active goals.
4. 2 bullet-point suggestions for new goals, based on missing high-weight categories. Each bullet should include:
a concrete goal suggestion (e.g. “Meet a friend once a week”)
and a short explanation of its wellbeing benefit.
`,

  dailyInsight: ({ weightsText, categorySummary, formattedEntries }) =>
    `
Task:
Evaluate the balance of the user’s life across different well-being categories. Use the provided weights to assess category importance. Identify which categories are well-represented and which are lacking. Based on your analysis, provide motivational and realistic suggestions to improve balance.

Input:
You will receive:
- A list of categories with weights (representing their importance for a balanced life).
- Raw daily entries, including emotion, activities, and an optional note.
- Optionally a list of current and completed daily tasks entries. Tasks are not pre-assigned to categories. Based on their content (e.g. "Go for a run", "Call Mom", "Plan budget"), infer the likely well-being category they belong to using the known category weights. Include this categorization in your evaluation.

Categories and weights:
${weightsText}

Category Score Summary:
${categorySummary}

User Journal Entries:
${formattedEntries}


Output:
Write a short, conversational and supportive summary (5-6 sentences max) that:
- reflecting and motivational tips on recent activity trends
- Notes where balance is improving or missing
- 2 bullet-point suggestions for new activities, based on missing high-weight categories.
`,

  dailyTaskSuggestions: ({ weightsText, categorySummary, formattedEntries }) =>
    `
Task:
Based on the user's recent activities, emotions, and current tasks, suggest 4-6 short, actionable daily tasks that would help improve their well-being and life balance. Focus on areas that are underrepresented in their recent activities.

Input:
You will receive:
- A list of categories with weights (representing their importance for a balanced life).
- Raw daily entries, including emotion, activities, and an optional note.
- Current daily tasks entries.

Categories and weights:
${weightsText}

Category Score Summary:
${categorySummary}

User Journal Entries:
${formattedEntries}

Output:
Provide EXACTLY 4-6 short, actionable task suggestions. Each task should:
- Be 2-5 words maximum (like "Call a friend", "Take a walk", "Drink water")
- Target an underrepresented wellbeing category
- Be achievable in 15-60 minutes
- Be personalized based on the user's recent mood and activities

Format your response as a simple list, one task per line, like this:
- Call mom
- Take a walk
- Meditate 10 minutes
- Plan healthy meal
- Read a book
- Stretch

Do not include any explanations, just the short task list.
`,

  personalizedReminder: ({ weightsText, categorySummary, formattedEntries }) =>
    `
Task:
Generate a very short, action-oriented reminder that nudges the user to take action based on their incomplete tasks, recent activities, and goals.

Input:
You will receive:
- A list of categories with weights (representing their importance for a balanced life).
- Raw daily entries, including emotion, activities, and an optional note.
- Current goals entries.
- Today's incomplete tasks.

Categories and weights:
${weightsText}

Category Score Summary:
${categorySummary}

User Data:
${formattedEntries}

Output:
Write a very short action reminder (maximum 6-8 words) that:
- Does NOT mention specific task names
- Gently reminds the user to DO something
- Uses action-oriented language
- Is a gentle nudge, not motivation
- Focuses on taking steps or actions

Examples:
"Time to tackle your wellness tasks"
"Don't forget your self-care activities"
"Ready to check off some goals?"
"Your tasks are waiting for you"
"Time for your daily wellness steps"
"Remember to tend to yourself today"

Do not include explanations. Just return the short action reminder.
`,

  dailyMotivation: ({ weightsText, categorySummary, formattedEntries }) =>
    `
Task:
Generate a very short, encouraging daily motivation message based on the user's recent activities, goals, and pending tasks. Keep it to maximum 6-8 words.

Input:
You will receive:
- A list of categories with weights (representing their importance for a balanced life).
- Raw daily entries, including emotion, activities, and an optional note.
- Current goals entries.
- Today's incomplete tasks.

Categories and weights:
${weightsText}

Category Score Summary:
${categorySummary}

User Data:
${formattedEntries}

Output:
Write a very short motivation message (6-8 words maximum) that:
- Acknowledges their recent efforts or progress
- Encourages them towards their goals or pending tasks
- Is positive and uplifting
- Feels personal and specific to their situation

Examples:
"Keep building those healthy habits!"
"Your progress is inspiring today!"
"Great momentum with your goals!"
"Today's tasks await your energy!"

Do not include explanations. Just return the short motivational phrase.
`,
};

export const resolveWeightedCategory = (rawCategory) => {
  const mapped =
    ACTIVITY_CATEGORIES[rawCategory] || CATEGORY_ALIASES[rawCategory] || null;

  const finalCategory = mapped || rawCategory;
  const weight = CATEGORY_WEIGHTS[finalCategory] || 1.0;

  return {
    category: finalCategory,
    weight,
    valid: CATEGORY_WEIGHTS.hasOwnProperty(finalCategory),
  };
};

export const formatAndScoreEntries = ({
  goals = [],
  activities = [],
  tasks = [],
}) => {
  const categoryScores = {};
  const formattedBlocks = [];

  // Activities
  if (activities.length) {
    const formatted = activities.map((entry) => {
      const lines = (entry.activities || []).map((act) => {
        const { category, weight, valid } = resolveWeightedCategory(act);
        if (valid) {
          categoryScores[category] = (categoryScores[category] || 0) + weight;
        }
        return `${act} (${category}, weight: ${weight})`;
      });

      return `Date: ${entry.date}
Emotion: ${entry.emotion}
Activities: ${lines.join(", ") || "None"}
Note: ${entry.note || "No note"}\n`;
    });

    formattedBlocks.push("=== Daily Activities ===", ...formatted);
  }

  // Goals
  if (goals.length) {
    const formatted = goals.map((goal) => {
      const { category, weight, valid } = resolveWeightedCategory(
        goal.category
      );
      if (valid) {
        categoryScores[category] = (categoryScores[category] || 0) + weight;
      }
      return `Goal: ${goal.title}
Category: ${goal.category} → ${category} (weight: ${weight})
Description: ${goal.desc || "-"}
Status: ${goal.status}
Created: ${new Date(goal.createdAt).toLocaleDateString()}\n`;
    });

    formattedBlocks.push("=== Goals ===", ...formatted);
  }

  // Tasks
  if (tasks.length) {
    const formatted = tasks.map((task) => {
      return `Task: ${task.title}
Date: ${task.date}
Completed: ${task.completed ? "Yes" : "No"}`;
    });

    formattedBlocks.push("=== Tasks ===", ...formatted);
  }
  const formattedEntries = formattedBlocks.join("\n\n");

  const weightsText = Object.entries(CATEGORY_WEIGHTS)
    .map(([cat, weight]) => `- ${cat} (${weight})`)
    .join("\n");

  const categorySummary = Object.entries(categoryScores)
    .map(([cat, score]) => `- ${cat}: ${score.toFixed(2)} pts`)
    .join("\n");

  return {
    formattedEntries,
    weightsText,
    categorySummary,
  };
};

export const buildAIPrompt = (data, mode) => {
  const template = PROMPT_TEMPLATES[mode];
  if (!template) throw new Error(`Unknown prompt mode: ${mode}`);

  const { formattedEntries, weightsText, categorySummary } =
    formatAndScoreEntries(data);

  return template({ formattedEntries, weightsText, categorySummary });
};
