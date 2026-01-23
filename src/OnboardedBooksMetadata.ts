export type TBookMetadata = {
  header: string;
  title: string;
  description: string;
  buttonLabel: string;
  design: "gold" | "green" | "purple";
  id: string;
};

export const ONBOARDED_BOOKS: TBookMetadata[] = [
  {
    header: "Daily devotional",
    title: "Open Heavens 2025 / 2026",
    description: "Read by date • Scripture-centered reflections",
    buttonLabel: "Read Today’s Devotional",
    design: "gold",
    id: "open-heavens-2025-2026",
  },
  {
    header: "Lessons · Student & Teacher",
    title: "Sunday School Manual 2025 / 2026 EU",
    description: "Browse lessons by topic, date, or series.",
    buttonLabel: "Read",
    design: "green",
    id: "sunday-school-manual-2025-2026-eu",
  },
  {
    header: "Training manual",
    title: "Workers in Training",
    description: "Being a worker in RCCG",
    buttonLabel: "Read",
    design: "purple",
    id: "workers-in-training",
  },
];

export const BOOK_ID_TO_METADATA: Record<string, TBookMetadata> = ONBOARDED_BOOKS.reduce((acc, book) => {
  if (book.id) {
    acc[book.id] = book;
  }
  return acc;
}, {} as Record<string, TBookMetadata>);