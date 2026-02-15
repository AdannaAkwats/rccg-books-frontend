import { useState } from "react";
import { Header } from "../LandingPage/Header";
import { Footer } from "../LandingPage/Footer";
import { useNavigate } from "react-router-dom";
import { DatePickerSection } from "../Common/DatePickerSection";

type ReadMode = "date" | "chapter";

export function BookDetail() {
  const [mode, setMode] = useState<ReadMode>("chapter");
  const navigate = useNavigate();

  const handleNavigate = () => {
    void navigate("/library");
  }

  return (
    <div className="lp">
      <Header shouldRenderSearch={false} />

      <main className="lp__main lp__reader">
        <h1 className="lp__readerTitle">Workers in Training</h1>

        {/* Mode toggle */}
        <div className="lp__readerModes">
          <button
            className={`lp__modeBtn ${mode === "date" ? "is-active" : ""}`}
            onClick={() => setMode("date")}
          >
            By Date
          </button>
          <button
            className={`lp__modeBtn ${mode === "chapter" ? "is-active" : ""}`}
            onClick={() => setMode("chapter")}
          >
            By Chapter
          </button>
        </div>

        {/* Reading surface */}
        <section className="lp__readerSurface">
          {mode === "chapter" ? (
            <p>Select a chapter to begin reading.</p>
          ) : (
            <>
            <p>Select a date to begin reading.</p>
            <DatePickerSection
                years={[2025, 2026]}
                onSelect={({ year, month, day }) => {
                    // Example route: /book/open-heavens/date/2026-01-23
                    const mm = String(month).padStart(2, "0");
                    const dd = String(day).padStart(2, "0");
                    // set state, fetch content, or navigate
                    console.log(`${year}-${mm}-${dd}`);
                }}
                />
                </>
          )}
        </section>

        {/* Exit */}
        <div className="lp__readerFooter">
          <button
            className="lp__ctaBtn lp__ctaBtn--gold"
            onClick={handleNavigate}
          >
            Back to Library
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}



// import type { ReactNode } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "../Designs/Styles.css";
// import { LOCALE } from "../LOCALE";
// import { BOOK_ID_TO_METADATA } from "../OnboardedBooksMetadata";

// export function BookDetail(): ReactNode {
//     const { bookId } = useParams<{ bookId: string }>();
//     const navigate = useNavigate();
//     const book = bookId ? BOOK_ID_TO_METADATA[bookId] : undefined;

//     const handleBack = () => {
//         void navigate('/library');
//     };

//     if (!book) {
//         return (
//             <div className="lp">
//                 <main className="lp__main">
//                     <div className="lp__heroText">
//                         <h1 className="lp__heroTitle">{LOCALE.bookNotFound}</h1>
//                         <img src="/book-not-found.PNG" alt="Book not found" />
//                         <button onClick={handleBack}>{LOCALE.backToLibrary}</button>
//                     </div>
//                 </main>
//             </div>
//         );
//     }

//     return (
//         <div className="lp">
//             <main className="lp__main">
//                 <div className="lp__heroText">
//                     <h1 className="lp__heroTitle">
//                         <span>{book.title}</span>
//                     </h1>
//                     {renderDate()}
//                     {renderChapter()}
//                     <br />
//                     <article className="lp__card lp__card--clear">
                        
//                     </article>
//                     <button className="lp__cardBtn lp__cardBtn--gold" onClick={handleBack}>
//                         {LOCALE.backToLibrary}
//                     </button>
//                 </div>
//             </main>
//         </div>
//     );
// }

// function renderDate(): ReactNode {   
//     return (
//         <>
//           <button className="lp__cardBtn lp__cardBtn--gold">
//             {LOCALE.byDate}
//         </button>
//         </>
       
//     );
// }        

// function renderChapter(): ReactNode {   
//     return (
//          <button className="lp__cardBtn lp__cardBtn--gold">
//             {LOCALE.byChapter}
//         </button>
//     );
// }    