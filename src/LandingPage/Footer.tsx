import type { ReactNode } from "react";
import { LOCALE } from "../LOCALE";

export function Footer(): ReactNode {
  return (
    <footer className="lp__footer">
      <div className="lp__footerRule" />
      <div className="lp__footerText">{LOCALE.footerText}</div>
    </footer>
  );
}