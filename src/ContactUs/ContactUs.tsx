import "../LandingPage/LandingPage.css";
import { LOCALE } from "../LOCALE";
import { Header } from "../LandingPage/Header";
import { Footer } from "../LandingPage/Footer";
import CONFIG from "../CONFIG";

export default function ContactUs() {
  return (
    <div className="lp">
      <Header shouldRenderSearch={false} />
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
      <Footer />
    </div>
  );
}