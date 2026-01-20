export type TMetadata = {
  header: string;
  title: string;
  description: string;
  buttonLabel: string;
  design: "gold" | "green" | "purple";
};

export const ONBOARDED_BOOKS: TMetadata[] = [
  {
    header: "Daily devotional",
    title: "Open Heavens 2025 / 2026",
    description: "Read by date • Scripture-centered reflections",
    buttonLabel: "Read Today’s Devotional",
    design: "gold",
  },
  {
    header: "Lessons · Student & Teacher",
    title: "Sunday School Manual 2025 / 2026 EU",
    description: "Browse lessons by topic, date, or series.",
    buttonLabel: "Read",
    design: "green",
  },
  {
    header: "Training manual",
    title: "Workers in Training",
    description: "Being a worker in RCCG",
    buttonLabel: "Read",
    design: "purple",
  },
];