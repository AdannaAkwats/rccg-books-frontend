import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ONBOARDED_BOOKS } from "../OnboardedBooksMetadata";
import "../Designs/Styles.css";
import { useSearch } from "../Common/useSearch";
import Tile from "../Designs/Tile/Tile";
import { LOCALE } from "../LOCALE";

export default function BrowseBooks() {
  const { setVisible, searchTerm } = useSearch();
  const navigate = useNavigate();

  const handleBook = (id: string) => () => {
    void navigate(`/book/${id}`);
  };

  useEffect(() => {
    setVisible(true);
    return () => setVisible(true);
  }, [setVisible]);

  const filteredBooks = ONBOARDED_BOOKS.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.header.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lp">
     <main className="lp__main">
         <h3 className="lp__heroTitle">
              {LOCALE.library}
          </h3>

        <section className="lp__library">
          <div className="lp__sectionLabel"> {LOCALE.selectBookPrompt}</div>
          <div className="lp__cards">
            {filteredBooks.length === 0 && (
              <p>{LOCALE.noBooksFound}</p>
            )}
            {filteredBooks.map((book) => (
              <Tile key={book.title} book={book} onClick={handleBook(book.id)} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}