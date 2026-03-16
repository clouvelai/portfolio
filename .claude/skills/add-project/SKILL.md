---
name: add-project
description: Add a new project to the portfolio's Projects section. Use this skill whenever the user wants to add, create, or insert a new project into their portfolio, mentions adding to the projects section, or says something like "add a project", "new project", "another project to my portfolio". Also trigger when the user provides project details (title, description, tech stack, URL) in the context of their portfolio.
---

# Add Project

This skill interactively collects project details from the user and adds the project to `src/components/Projects.jsx`, matching the exact structure of existing projects.

## Step 1: Read the current file

Read `src/components/Projects.jsx` to understand:
- Which lucide-react icons are already imported
- How many projects exist (to know where to append)
- The exact structure being used

## Step 2: Collect project details

Use AskUserQuestion to gather information. Batch questions where it makes sense (up to 4 per call). Here's what to collect:

**Batch 1 — Core info:**
- **Title**: Project name
- **Subtitle**: Short tagline (e.g., "AI Illustrator of Reddit")
- **Description**: 1-2 sentence description of what the project does

**Batch 2 — Links and tech:**
- **Tech tags**: Comma-separated list of technologies (e.g., "Python, React, Supabase")
- **Live site URL**: URL or "none"
- **GitHub URL**: URL or "none" (the GitHub button is hidden by default in the current design, so this is optional)

**Batch 3 — Visual theme:**
- **Gradient color theme**: Offer these presets as options:
  - `from-orange-500/10 via-red-500/10 to-pink-500/10` (warm/orange)
  - `from-blue-500/10 via-cyan-500/10 to-emerald-500/10` (cool/blue)
  - `from-purple-500/10 via-violet-500/10 to-indigo-500/10` (purple)
  - `from-emerald-500/10 via-teal-500/10 to-cyan-500/10` (green/teal)
  - Or let them specify a custom Tailwind gradient

**Batch 4 — Workflow steps (collect one at a time or together):**

The project card has a 3-step workflow/pipeline section. For each step, collect:
- **Step title** (e.g., "Data Streaming")
- **Step description** (one short sentence)
- **Icon name** from lucide-react (e.g., "Search", "Database", "BrainCircuit"). Suggest relevant icons based on what the project does.
- **Color theme**: a pair like `text-blue-600` / `bg-blue-50`. Offer presets:
  - Blue: `text-blue-600` / `bg-blue-50`
  - Purple: `text-purple-600` / `bg-purple-50`
  - Pink: `text-pink-600` / `bg-pink-50`
  - Cyan: `text-cyan-600` / `bg-cyan-50`
  - Emerald: `text-emerald-600` / `bg-emerald-50`
  - Orange: `text-orange-600` / `bg-orange-50`

Since AskUserQuestion supports up to 4 questions per call, you may need multiple rounds. Be efficient — if context from the conversation already provides some answers, skip those questions and confirm with the user instead.

## Step 3: Build and insert the project

1. **Construct the project object** following this exact structure:

```jsx
{
    title: "ProjectName",
    subtitle: "Short Tagline",
    description: "Description here.",
    tags: ["Tag1", "Tag2", "Tag3"],
    link: "https://example.com/",
    github: "#",
    gradient: "from-blue-500/10 via-cyan-500/10 to-emerald-500/10",
    workflow: [
        {
            icon: <IconName size={20} />,
            title: "Step Title",
            description: "Step description",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        // ... 3 steps total
    ]
}
```

2. **Update the imports**: Check which lucide-react icons are already imported at the top of the file. Add any new icon names that the workflow steps require to the existing import statement.

3. **Append the new project** to the end of the `projects` array using the Edit tool. Find the closing of the last project object (`}`) right before the array's closing `]`, and insert the new project after it with a comma.

## Important notes

- Always use the Edit tool (not Write) to modify Projects.jsx — only the diff should be sent.
- Preserve existing formatting and indentation (4 spaces).
- The `github` field should be `"#"` if the user says "none" — the GitHub button is hidden via CSS.
- The `link` field should be `"#"` if no live URL is provided.
- If the user provides info upfront in their message (e.g., "add my project called X, it uses Y and Z"), extract what you can and only ask about what's missing.
