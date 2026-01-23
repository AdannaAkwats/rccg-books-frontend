import type { ReactNode } from "react";
import { useState } from "react";
import "../LandingPage/LandingPage.css";
import { Link, useNavigate } from "react-router-dom";
import { LOCALE } from "../LOCALE";

interface HeaderProps {
  shouldRenderSearch?: boolean;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export function Header({ shouldRenderSearch = true, searchTerm, onSearchChange }: HeaderProps): ReactNode {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleRequestBook = () => {
    void navigate('/contact');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="lp__header">
        <Link to="/" className="lp__brand">{LOCALE.title}</Link>

        <div className="lp__headerRight">
          <button className="lp__hamburger" onClick={toggleSidebar} aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
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
            onClick={handleRequestBook}
          >
            {LOCALE.requestBook}
          </button>
        </div>
      </header>

      <nav className={`lp__sidebar ${isSidebarOpen ? 'lp__sidebar--open' : ''}`}>
        <button className="lp__sidebarClose" onClick={toggleSidebar} aria-label="Close navigation">×</button>
        <Link to="/" className="lp__sidebarLink" onClick={toggleSidebar}>Home</Link>
        <Link to="/library" className="lp__sidebarLink" onClick={toggleSidebar}>Library</Link>
        <Link to="/contact" className="lp__sidebarLink" onClick={toggleSidebar}>Request a Book</Link>
      </nav>
    </>
  );
}