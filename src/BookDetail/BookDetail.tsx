import type { ReactNode } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../LandingPage/LandingPage.css";
import { LOCALE } from "../LOCALE";
import { BOOK_ID_TO_METADATA } from "../OnboardedBooksMetadata";

export function BookDetail(): ReactNode {
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();
    const book = bookId ? BOOK_ID_TO_METADATA[bookId] : undefined;

    const handleBack = () => {
        void navigate('/library');
    };

    if (!book) {
        return (
            <div className="lp">
                <main className="lp__main">
                    <div className="lp__heroText">
                        <h1 className="lp__heroTitle">{LOCALE.bookNotFound}</h1>
                        <img src="/book-not-found.PNG" alt="Book not found" />
                        <button onClick={handleBack}>{LOCALE.backToLibrary}</button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="lp">
            <main className="lp__main">
                <div className="lp__heroText">
                    <h1 className="lp__heroTitle">
                        <span>{book.title}</span>
                    </h1>
                    {renderDate()}
                    {renderChapter()}
                    <br />
                    <article className="lp__card lp__card--clear">
                        
                    </article>
                    <button className="lp__cardBtn lp__cardBtn--gold" onClick={handleBack}>
                        {LOCALE.backToLibrary}
                    </button>
                </div>
            </main>
        </div>
    );
}

function renderDate(): ReactNode {   
    return (
        <>
          <button className="lp__cardBtn lp__cardBtn--gold">
            {LOCALE.byDate}
        </button>
        </>
       
    );
}        

function renderChapter(): ReactNode {   
    return (
         <button className="lp__cardBtn lp__cardBtn--gold">
            {LOCALE.byChapter}
        </button>
    );
}    