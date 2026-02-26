import { useState, type ReactNode, useEffect } from "react";
import { useSearch } from "../Common/useSearch";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from "../Common/ReactAriaComponents/DatePicker";
import { ReadingView } from "./ReadingView";
import { LOCALE } from "../LOCALE";
import { today, getLocalTimeZone, parseDate } from "@internationalized/date";
import { BOOK_ID_TO_METADATA, type TReadMode } from "../OnboardedBooksMetadata";
import PageNotFound from "../Common/PageNotFound";

interface IBookDetailProps {
    onboardedBookId: string;
}

type ReadingState = "selector" | "reading";

export function BookDetail(props: IBookDetailProps): ReactNode {
    const book = BOOK_ID_TO_METADATA[props.onboardedBookId];
    const params = useParams<{ contentId?: string }>();
    const navigate = useNavigate();
    const defaultDate =  today(getLocalTimeZone());

    const [viewState, setViewState] = useState<ReadingState>(params.contentId ? "reading" : "selector");
    const [mode, setMode] = useState<TReadMode | undefined | null>(book?.readingModes[0] || null);
    const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(params.contentId || defaultDate.toString());
    const [chapterSearchQuery, setChapterSearchQuery] = useState<string>("");

    const handleNavigate = () => {
        void navigate("/library");
    }
    const { setVisible } = useSearch();

    useEffect(() => {
      setVisible(false);
      return () => setVisible(true);
    }, [setVisible]);
    
    if (!book) {
        return <PageNotFound />;
    }

    return (
        <div className="lp">
            {viewState === "selector" ? (
                <>
                    <h1 className="lp__readerTitle">{book.title}</h1>
                    {renderReadingModes()}
                    <section className="lp__readerSurface">
                        {renderReadingView(mode)}
                        <br />
                        {renderSelectButton()}
                    </section>
                    {renderExit()}
                </>
            ) : (
                <ReadingView
                    book={book}
                    contentKey={contentKey()}
                    onBack={handleBackFromReading}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    hasPrevious={getPreviousKey() !== null}
                    hasNext={getNextKey() !== null}
                />
            )}
        </div>
    );

    function renderReadingView(mode: TReadMode | null | undefined): ReactNode {
        if (!mode) {
            return <PageNotFound />;
        }

        switch (mode) {
            case "chapter":
                return renderChapterView();
            case "date":
                return renderDateView();
            default:
                return null;
        }
    }

    function renderChapterView(): ReactNode {
        return (
            <div className="lp__chapterView">
                <input
                    type="text"
                    className="lp__chapterSearch"
                    placeholder={LOCALE.searchChapters}
                    value={chapterSearchQuery}
                    onChange={(e) => setChapterSearchQuery(e.target.value)}
                />
                <div className="lp__chapterList">
                    {filteredChapters().map((chapter) => (
                        <button
                            key={chapter}
                            className={`lp__chapterItem ${selectedChapter === chapter ? "is-selected" : ""}`}
                            onClick={() => setSelectedChapter(chapter)}
                        >
                            {chapter}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    function renderDateView(): ReactNode {
        return (
            <DatePicker 
                defaultValue={selectedDate ? parseDate(selectedDate) : today(getLocalTimeZone())}
                onChange={(date) => setSelectedDate(date ? date.toString() : null)}
            />
        );
    }

    function renderReadingModes(): ReactNode {
        const modeLabels: Record<TReadMode, string> = {
            date: LOCALE.byDate,
            chapter: LOCALE.byChapter,
            page: LOCALE.byPage,
        };

        return (
        <div className="lp__readerModes">
            {book.readingModes.map((readMode) => 
                renderReaderButton(readMode, modeLabels[readMode])
            )}
            </div>
            );
        }

    function renderReaderButton(selectedMode: TReadMode, label: string): ReactNode {
      return (
        <button
            className={`lp__modeBtn ${mode === selectedMode ? "is-active" : ""}`}
            onClick={() => setMode(selectedMode)}
          >
           {label}
          </button>
      );
    }

    function renderSelectButton(): ReactNode {
      return (
        <button 
            className="lp__ctaBtn lp__ctaBtn--gold" 
            type="button"
            disabled={(mode === "chapter" && !selectedChapter) || (mode === "date" && !selectedDate)}
            onClick={handleRead}
        >
            {LOCALE.read}
        </button>
      );
    }

    function renderExit(): ReactNode {
        return (
        <div className="lp__readerFooter">
            <button
                className="lp__ctaBtn lp__ctaBtn--gold"
                onClick={handleNavigate}
            >
                {LOCALE.backToLibrary}
            </button>
            </div>
        );
    }

    function handleRead(): void {
        let contentId = "";
        if (mode === "chapter") {
            contentId = selectedChapter || "";
        } else if (mode === "date") {
            contentId = selectedDate || today(getLocalTimeZone()).toString();
        } // add more modes as needed
        if (contentId) {
            setViewState("reading");
            window.history.pushState(null, "", `/book/${props.onboardedBookId}/${contentId}`);
        }
    };

    function handleBackFromReading(): void {
        setViewState("selector");
        window.history.pushState(null, "", `/book/${props.onboardedBookId}`);
    }

    function getContentKey(): string {
        if (mode === "chapter") return selectedChapter || "";
        return selectedDate || today(getLocalTimeZone()).toString();
        // add more modes as needed
    }

    function contentKey(): string {
        return getContentKey();
    }

    function filteredChapters(): string[] {
        return (book.chapters || []).filter((chapter) =>
            chapter.toLowerCase().includes(chapterSearchQuery.toLowerCase())
        );
    }   

    function getAllKeys(): string[] {
        return Object.keys(book.content || {});
    };

    function getCurrentIndex(): number {
        return getAllKeys().indexOf(contentKey());
    }

    function getPreviousKey(): string | null {
        const index = getCurrentIndex();
        return index > 0 ? getAllKeys()[index - 1] : null;
    }

    function getNextKey(): string | null {
        const index = getCurrentIndex();
        const keys = getAllKeys();
        return index < keys.length - 1 ? keys[index + 1] : null;
    };

    function handlePrevious(): void {
        const prevKey = getPreviousKey();
        if (prevKey) {
            if (mode === "chapter") {
                setSelectedChapter(prevKey);
            } else {
                setSelectedDate(prevKey);
            } // add more modes as needed
            window.history.pushState(null, "", `/book/${props.onboardedBookId}/${prevKey}`);
        }
    };

    function handleNext(): void {
        const nextKey = getNextKey();
        if (nextKey) {
            if (mode === "chapter") {
                setSelectedChapter(nextKey);
            } else {
                setSelectedDate(nextKey);
            } // add more modes as needed
            window.history.pushState(null, "", `/book/${props.onboardedBookId}/${nextKey}`);
        }
    };
}
