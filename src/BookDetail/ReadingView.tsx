import { type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type TBookMetadata } from "../OnboardedBooksMetadata";
import PageNotFound from "../Common/PageNotFound";

interface ReadingViewProps {
    book: TBookMetadata;
    contentKey: string;
    onBack: () => void;
    onPrevious: () => void;
    onNext: () => void;
    hasPrevious: boolean;
    hasNext: boolean;
}

export function ReadingView(props: ReadingViewProps): ReactNode {
    const { book, contentKey, onBack, onPrevious, onNext, hasPrevious, hasNext } = props;
    const content = book.content?.[contentKey] as Record<string, string>;

    if (!content) {
        return <PageNotFound />;
    }

    return (
        <>
            <div className="lp__readingHeader">
                <button className="lp__backBtn" onClick={onBack}>
                    ← Back
                </button>
                <h1 className="lp__readingTitle">{book.title}</h1>
            </div>
            <article className={`lp__article lp__article--${book.design}`}>
                <h2 className="lp__contentTitle">{content.title}</h2>
                <div className="lp__contentBody">
                    <p className="lp__contentText" data-testid="content">
                        {content.content}
                    </p>
                </div>

                <div className="lp__readingNavigation">
                    <button 
                        className="lp__modeBtn" 
                        onClick={onPrevious}
                        disabled={!hasPrevious}
                    >
                        <ChevronLeft size={20} /> Previous
                    </button>
                    <button 
                        className="lp__modeBtn" 
                        onClick={onNext}
                        disabled={!hasNext}
                    >
                        Next <ChevronRight size={20} />
                    </button>
                </div>
            </article>
        </>
    );
}
