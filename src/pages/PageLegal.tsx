
import Header from "../components/Header";

export function PageLegal() {
    return (
        <div className="h-dvh flex flex-col bg-slate-950">
            <Header />

            <div className="max-w-[1280px] w-2/3 mx-auto mt-8">
                <h2 className="text-yellow-300 text-4xl">Legal Disclosure</h2>
                <p className="text-yellow-400 text-xl mt-2">
                    Information in accordance with Section 5 TMG
                </p>
                <p className="text-yellow-400 text-xl mt-2">
                    Deniz Petzold
                </p>
                <p className="text-yellow-400 text-xl mt-2">
                   Rheinsberger Straße 13   
                </p>
                <p className="text-yellow-400 text-xl mt-2">
                    10115 Berlin
                </p>
                <h2 className="text-yellow-300 text-4xl mt-4">
                    Contact Information
                </h2>
                <p className="text-yellow-400 text-xl mt-2">
                    E-Mail: <a href="mailto:mail@dpetzold.dev" className="text-yellow-400 hover:text-yellow-300" target="_blank" rel="noreferrer noopener" aria-label="Send an email to the creator">
                        mail@dpetzold.dev
                    </a>
                </p>

            </div>
        </div>
    );
}
