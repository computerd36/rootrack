import { useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Button } from "../UI/Button";

interface ApiChangeModalProps {
    onClose: () => void;
}

const STORAGE_KEY = "apiChangeModalDismissed";

export function ApiChangeModal({ onClose }: Readonly<ApiChangeModalProps>) {
    const alreadyDismissed = localStorage.getItem(STORAGE_KEY) === "true";

    useEffect(() => {
        if (alreadyDismissed) {
            onClose();
        }
    }, [alreadyDismissed, onClose]);

    if (alreadyDismissed) return null;

    const handleClose = () => {
        localStorage.setItem(STORAGE_KEY, "true");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-slate-700 rounded-lg shadow-lg max-w-md w-full mx-4">
                <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
                        <FaExclamationTriangle className="text-yellow-500" /> Important Notice
                    </h3>

                    <h4 className="mt-2 text-md font-normal text-slate-300">
                        Roobet has changed their API. The tool will now only show the <span className="font-bold text-slate-200">last 6 months</span> of deposit and withdrawal data.
                        <br /><br />
                        Older transactions are no longer available through the API.
                    </h4>
                </div>

                <div className="bg-slate-800 rounded-b-lg flex justify-center p-4">
                    <Button inverted ariaLabel="Dismiss notice" onClick={handleClose}>
                        Got it
                    </Button>
                </div>
            </div>
        </div>
    );
}
