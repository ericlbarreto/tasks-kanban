import type { Task } from "./api"

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Tablet view",
    description: "Implement responsive tablet view for the application",
    status: "pending",
    priority: "medium",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Audio recording in note",
    description: "Show audio in a note and playback UI",
    status: "pending",
    priority: "high",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Bookmark in note",
    description: "Show rich link UI in a note, and feature to render website screenshot.",
    status: "pending",
    priority: "low",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Mobile view",
    description:
      "Functions for both web responsive and native apps. Note: Android and iOS will need unique share icons.",
    status: "in_progress",
    priority: "medium",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Desktop view",
    description: "PWA for website and native apps. Note: Windows and Mac will need unique share icons.",
    status: "in_progress",
    priority: "medium",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Formatting options",
    description: "Mobile formatting bar expands and collapses when tapping the format icon.",
    status: "in_progress",
    priority: "low",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Audio recording",
    description: "Interface for when recording a new audio note",
    status: "done",
    priority: "low",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    title: "Bookmarking",
    description: "Interface for when creating a new link note.",
    status: "done",
    priority: "low",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "9",
    title: "Mobile home screen",
    description: "Folders, tags, and notes lists are sorted by recent.",
    status: "done",
    priority: "medium",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

