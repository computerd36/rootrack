import { Link } from "react-router-dom";
import Header from "../components/Header";

export function PageAbout() {
    return (
        <div className="h-dvh flex flex-col bg-slate-950">
            <Header />

            <div className="max-w-[1280px] w-2/3 mx-auto mt-8">
                <h2 className="text-yellow-300 text-4xl">About Rootrack</h2>
                <p className="text-yellow-400 text-xl mt-2">
                    Rootrack is a free web application that allows you to track your
                    betting journey on Roobet. It provides a wide array of statistics and
                    charts to help you gain valuable insights into your profits, losses,
                    and trends. Rootrack is user-friendly and completely free to use.
                </p>

                {/* Key Features */}
                <h3 className="text-yellow-300 text-3xl mt-8">Key Features</h3>
                <ul className="list-disc list-inside text-yellow-400 text-lg mt-4 space-y-2">
                    <li>
                        <strong>Comprehensive Tracking:</strong> Monitor your deposits,
                        withdrawals, and bets seamlessly.
                    </li>
                    <li>
                        <strong>Detailed Statistics:</strong> Gain insights into your
                        profits, losses, and betting trends.
                    </li>
                    <li>
                        <strong>Interactive Charts:</strong> Visualize your data with a
                        variety of charts powered by Recharts.
                    </li>
                    <li>
                        <strong>Customizable Layout:</strong> Rearrange the stats to suit
                        your preferences.
                    </li>
                    <li>
                        <strong>Screenshot Downloads:</strong> Download images of your stats
                        to share with others.
                    </li>
                    <li>
                        <strong>Persistent Data:</strong> Your stats and layouts are saved in local
                        storage, allowing you to revisit them later.
                    </li>
                    <li>
                        <strong>Local Data Processing:</strong> All calculations are
                        performed locally, ensuring your data remains private.
                    </li>
                    <li>
                        <strong>User-Friendly Interface:</strong> Easy to navigate, even for
                        beginners.
                    </li>
                </ul>

                {/* Creator Information */}
                <p className="text-yellow-400 text-lg mt-8">
                    Rootrack was created by <a className="font-bold underline" href="https://dpetzold.dev/" target="_blank">me</a> to help Roobet
                    users gain better insights into their gambling behavior.
                </p>

                {/* Disclaimer */}
                <p className="text-yellow-500 text-sm mt-6">
                    <em>
                        Disclaimer: Rootrack is an independent tool and is not affiliated
                        with Roobet in any way. It was created to help Roobet users gain
                        better insights into their gambling behavior by providing detailed
                        tracking and analysis of their betting activities.
                    </em>
                </p>

                <Link to="/legal" className="text-yellow-400 hover:text-yellow-300 text-sm my-8 block underline">Impress and Legal Information</Link>
            </div>
        </div>
    );
}
