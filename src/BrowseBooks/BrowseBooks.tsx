import { useState } from "react";
import { ONBOARDED_BOOKS } from "../OnboardedBooksMetadata";
import "../LandingPage/LandingPage.css";
import { Header } from "../LandingPage/Header";
import { Footer } from "../LandingPage/Footer";
import Tile from "../Designs/Tile/Tile";
import { LOCALE } from "../LOCALE";

export default function BrowseBooks() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = ONBOARDED_BOOKS.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.header.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
     <div className="lp">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
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
              <Tile key={book.title} {...book} />
            ))}
          </div>
        </section>
       <Footer />
      </main>
    </div>
  );
}