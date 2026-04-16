import { useEffect, useState } from "react";
import { useBettingData } from "../../hooks/bettingDataContext";
import { getPassedTime } from "../../util/dateFormat";
import { FaHistory, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "../UI/Button";


export function StatsFoundModal() {
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const { isBettingDataStored, creationDate, clearBettingData } = useBettingData();

    useEffect(() => {
        if (isBettingDataStored()) {
            setOpenModal(true);
        }
    }, [isBettingDataStored]);

    const loadExistingStats = () => {
        setOpenModal(false);
        navigate('/stats');
    };

    const calculateNewStats = () => {
        setOpenModal(false);
        clearBettingData();
    };

    if (!openModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-slate-800 rounded-lg shadow-lg max-w-md w-full mx-4">
                <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-100">Load stats</h3>

                    <h4 className="mt-2 text-md font-normal text-slate-400">
                        {
                            creationDate ? <>We found stats from <span className="font-bold text-slate-300">{getPassedTime(creationDate)}</span>.</> : <>We found your last stats.</>
                        }
                        <br />
                        Do you want to load them or calculate new stats?
                    </h4>
                </div>

                <div className="bg-slate-900 rounded-b-lg flex justify-center gap-4 p-4">
                    <Button ariaLabel="Load existing stats" onClick={loadExistingStats} icon={<FaHistory />}>
                        Load existing
                    </Button>
                    <Button ariaLabel="Calculate new stats" onClick={calculateNewStats} inverted icon={<FaPlus />}>
                        Calculate new
                    </Button>
                </div>
            </div>
        </div>
    );
}
