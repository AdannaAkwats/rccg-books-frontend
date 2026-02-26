import "../Designs/Styles.css";
import { LOCALE } from "../LOCALE";
import { useEffect } from "react";
import { useSearch } from "../Common/useSearch";
import CONFIG from "../CONFIG";

export default function ContactUs() {
  const { setVisible } = useSearch();

  useEffect(() => {
    setVisible(false);
    return () => setVisible(true);
  }, [setVisible]);

  return (
    <div className="lp">
      <main className="lp__main">
          <div className="lp__heroText">
            <h1 className="lp__heroTitle">
              <span>{LOCALE.contactUs}</span>
            </h1>

            <p className="lp__heroSubtitle">
              {LOCALE.assistanceContact}
            </p>
            <br />
            <a
              href={`mailto:${CONFIG.email}?subject=Book%20Request`}
              className="lp__emailLink"
            >
              {CONFIG.email}
            </a>
            <p className="lp__emailNote">
              {LOCALE.emailTip}
            </p>
          </div>
      </main>
    </div>
  );
}