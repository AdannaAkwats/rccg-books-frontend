import "../Styles.css";
import type { TBookMetadata } from "../../OnboardedBooksMetadata";

export default function Tile({ book, onClick }: { book: TBookMetadata; onClick?: (arg?: unknown) => void | undefined }) {
  return (
    <article key={book.title} className={`lp__card lp__card--${book.design}`}>
        <div className="lp__cardEyebrow">{book.header}</div>
        <h2 className="lp__cardTitle">{book.title}</h2>
        <p className="lp__cardDesc">{book.description}</p>
        <button className={`lp__cardBtn lp__cardBtn--${book.design}`} type="button" onClick={onClick}>
            {book.buttonLabel}
        </button>
    </article>
 );
}