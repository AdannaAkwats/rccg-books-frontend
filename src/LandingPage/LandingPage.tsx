import "./LandingPage.css";
import { LOCALE } from "../LOCALE";
import { useNavigate } from "react-router-dom";
import { ONBOARDED_BOOKS } from "../OnboardedBooksMetadata";
import Tile from "../Designs/Tile/Tile";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export default function LandingPage() {
  const navigate = useNavigate();
  const handleBook = (id: string) => () => {
    void navigate(`/book/${id}`);
  };

  return (
    <div className="lp">
      <Header shouldRenderSearch={false} />

      <main className="lp__main">
        <section className="lp__hero">
          <div className="lp__heroText">
            <h1 className="lp__heroTitle">
              <span>{LOCALE.landingHeader.p1}</span>
              <span>{LOCALE.landingHeader.p2}</span>
            </h1>

            <p className="lp__heroSubtitle">
              {LOCALE.landingHeader.subtitle}
            </p>

            <div className="lp__heroCtas">
              <br />
              <button className="lp__ctaBtn lp__ctaBtn--gold" type="button">
                {LOCALE.todayDevotional}
              </button>
              <Link className="lp__heroLink" to="/library">
                {LOCALE.browseAllBooks}
              </Link>
            </div>
          </div>

          <div className="lp__heroDecor" aria-hidden="true">
            <div className="lp__blob lp__blob--a" />
            <div className="lp__blob lp__blob--b" />
          </div>
        </section>

        <section className="lp__library">
          <div className="lp__sectionLabel">{LOCALE.booksInLibrary}</div>

          <div className="lp__cards">
            {ONBOARDED_BOOKS.map((book) => (
              <Tile key={book.title} book={book} onClick={handleBook(book.id)} />
            ))}
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}