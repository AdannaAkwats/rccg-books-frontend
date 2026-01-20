import "./LandingPage.css";
import { LOCALE } from "../LOCALE";
import { ONBOARDED_BOOKS } from "../OnboardedBooksMetadata";
import Tile from "../Designs/Tile/Tile";
import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="lp">
      {renderHeader(false, undefined, undefined, () => navigate('/contact'))}

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
              <Tile key={book.title} {...book} />
            ))}
          </div>
        </section>

        {renderFooter()}
      </main>
    </div>
  );
}

export function renderHeader(shouldRenderSearch: boolean = true, searchTerm?: string, onSearchChange?: (value: string) => void, onRequestBook?: () => void): ReactNode {
  return (
      <header className="lp__header">
        <Link to="/" className="lp__brand">{LOCALE.title}</Link>

        <div className="lp__headerRight">
          {shouldRenderSearch && (
          <div className="lp__search" role="search">
            <input
              type="text"
              className="lp__searchInput"
              placeholder={LOCALE.searchLabel}
              value={searchTerm || ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
            <span className="lp__searchIcon" aria-hidden="true">
              {/* magnifier */}
              <svg width="18" height="18" viewBox="0 0 18 18">
                <circle cx="7.5" cy="7.5" r="5.5" fill="none" />
                <path d="M11.5 11.5 L16 16" fill="none" />
              </svg>
            </span>
          </div>)}

          <button 
            className="lp__pillBtn lp__pillBtn--gold" 
            type="button"
            onClick={onRequestBook}
          >
            {LOCALE.requestBook}
          </button>
        </div>
      </header>
  );
}

export function renderFooter(): ReactNode {
  return (
    <footer className="lp__footer">
      <div className="lp__footerRule" />
      <div className="lp__footerText">{LOCALE.footerText}</div>
    </footer>
  );
}