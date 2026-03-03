export type TReadMode = "date" | "chapter" | "page";

export type TBookMetadata = {
  header: string;
  title: string;
  description: string;
  buttonLabel: string;
  design: "gold" | "green" | "purple";
  id: string;
  readingModes: TReadMode[];
  chapters?: string[]; // Mock: the values are from the API
  content?: Record<string, unknown>; // Mock: the values are from the API
};

export const ONBOARDED_BOOKS: TBookMetadata[] = [
  {
    header: "Daily devotional",
    title: "Open Heavens 2025 / 2026",
    description: "Read by date • Scripture-centered reflections",
    buttonLabel: "Read Today’s Devotional",
    design: "gold",
    id: "open-heavens-2025-2026",
    readingModes: ["date", "chapter", "page"],
    chapters: ["foo", "bar", "baz"], // Mock: the values are from the API 
    content: {
      "foo": { title: "Foo Chapter", content: "Content for Foo Chapter" },
      "bar": { title: "Bar Chapter", content: "This is pretty great!" },
      "baz": { title: "Baz Chapter", content: "Content for Baz Chapter" },
      // numeric page keys (mocked)
      "1": { title: "Page 1", content: "Page 1 content (also accessible by page)" },
      "2": { title: "Page 2", content: "Page 2 content (also accessible by page)" },
    },
  },
  {
    header: "Lessons · Student & Teacher",
    title: "Sunday School Manual 2025 / 2026 EU",
    description: "Browse lessons by topic, date, or series.",
    buttonLabel: "Read",
    design: "green",
    id: "sunday-school-manual-2025-2026-eu",
    readingModes: ["date", "chapter", "page"],
    chapters: ["foo", "bar", "baz"], // Mock: the values are from the API 
    content: {
      "foo": { title: "Foo Chapter", content: "Content for Foo Chapter" },
      "bar": { title: "Bar Chapter", content: "This is pretty great!" },
      "baz": { title: "Baz Chapter", content: "Content for Baz Chapter" },
      "2026-02-20": { title: "Date example Chapter", content: "Rendered from date" },
      "1": { title: "Page 1", content: "Page-based content 1" },
    },

  },
  {
    header: "Training manual",
    title: "Workers in Training",
    description: "Being a worker in RCCG",
    buttonLabel: "Read",
    design: "purple",
    id: "workers-in-training",
    readingModes: ["chapter"],
    chapters: ["foo", "bar", "baz"], // Mock: the values are from the API 
    content: {
      "foo": { title: "Foo Chapter", content: "Content for Foo Chapter" },
      "bar": { title: "Bar Chapter", content: "Content for Bar Chapter" },
      "baz": { title: "Baz Chapter", content: "Content for Baz Chapter" },
    },
  },
];

export const BOOK_ID_TO_METADATA: Record<string, TBookMetadata> = ONBOARDED_BOOKS.reduce((acc, book) => {
  if (book.id) {
    acc[book.id] = book;
  }
  return acc;
}, {} as Record<string, TBookMetadata>);