export const protectedRoutes = [
  "/",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/dashboard/:path*",
  "/tasks/:path*",
];

export const categories = [
  { key: "arts-and-craft", label: "Arts And Craft", value: "arts-and-craft" },
  { key: "nature", label: "Nature", value: "nature" },
  { key: "family", label: "Family", value: "family" },
  { key: "sport", label: "Sport", value: "sport" },
  { key: "meditation", label: "Meditation", value: "meditation" },
  { key: "friends", label: "Friends", value: "friends" },
  { key: "other", label: "Other", value: "other" },
];

export const priorityOptions = [
  { key: "low", label: "Low Priority", value: "low" },
  { key: "medium", label: "Medium Priority", value: "medium" },
  { key: "high", label: "High Priority", value: "high" },
];

export const statusOptions = [
  { key: "all", label: "All Status" },
  { key: "pending", label: "Pending" },
  { key: "ongoing", label: "Ongoing" },
  { key: "done", label: "Done" },
  { key: "collaborative-task", label: "Collaborative Task" },
];
