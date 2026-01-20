import "../../LandingPage/LandingPage.css";
import type { TMetadata } from "../../OnboardedBooksMetadata";

export default function Tile(book: TMetadata) {
  return (
    <article key={book.title} className={`lp__card lp__card--${book.design}`}>
        <div className="lp__cardEyebrow">{book.header}</div>
        <h2 className="lp__cardTitle">{book.title}</h2>
        <p className="lp__cardDesc">{book.description}</p>
        <button className={`lp__cardBtn lp__cardBtn--${book.design}`} type="button">
            {book.buttonLabel}
        </button>
    </article>
 );
}