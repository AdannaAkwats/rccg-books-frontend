import { useNavigate } from "react-router-dom";
import { LOCALE } from "../LOCALE";

export default function PageNotFound() {
    const navigate = useNavigate();

    const handleBack = () => {
        void navigate('/library');
    };

    const content = (
        <div>
            <h1 className="lp__heroTitle">{LOCALE.notFound}</h1>
            <p className="lp__heroSubtitle">{LOCALE.notFoundSubtitle}</p>
            <img src="/book-not-found.PNG" alt="Book not found" />
            <button className="lp__ctaBtn lp__ctaBtn--gold" onClick={handleBack}>{LOCALE.backToLibrary}</button>
        </div>
    );
    return content;
}