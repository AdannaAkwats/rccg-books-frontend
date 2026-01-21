import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOCALE } from "../LOCALE";

interface HeaderProps {
  shouldRenderSearch?: boolean;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export function Header({ shouldRenderSearch = true, searchTerm, onSearchChange }: HeaderProps): ReactNode {
  const navigate = useNavigate();

  const handleRequestBook = () => {
    void navigate('/contact');
  };

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
            onClick={handleRequestBook}
          >
            {LOCALE.requestBook}
          </button>
        </div>
      </header>
  );
}