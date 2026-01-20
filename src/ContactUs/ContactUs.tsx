import "../LandingPage/LandingPage.css";
import { LOCALE } from "../LOCALE";
import { renderFooter, renderHeader } from "../LandingPage/LandingPage";
import { useNavigate } from "react-router-dom";
import CONFIG from "../CONFIG";

export default function ContactUs() {
  const navigate = useNavigate();

  return (
    <div className="lp">
      {renderHeader(false, undefined, undefined, () => navigate('/contact'))}
      <main className="lp__main">
          <div className="lp__heroText">
            <h1 className="lp__heroTitle">
              <span>{"Contact Us"}</span>
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
      {renderFooter()}
    </div>
  );
}