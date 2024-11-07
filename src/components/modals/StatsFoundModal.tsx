import { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { useBettingData } from "../../context/bettingDataContext";
import { getPassedTime } from "../../util/dateFormat";
import { FaHistory, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


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

    return (
        <>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Body>
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold text-gray-700">Load stats</h3>

                        <h4 className="mt-2 text-md font-normal text-gray-500 dark:text-gray-400">
                            {
                                creationDate ? <>We found stats from <span className="font-bold">{getPassedTime(creationDate)}</span>.</> : <>We found your last stats.</>
                            }
                            <br />
                            Do you want to load them or calculate new stats?
                        </h4>
                    </div>
                </Modal.Body>

                <Modal.Footer className="bg-gray-200 flex justify-center items-center">
                    <div className="flex justify-center gap-4 items-center">
                        <Button color="gray" onClick={loadExistingStats}>
                            <div className="flex items-center gap-1">
                                <FaHistory /> <span>Load existing</span>
                            </div>
                        </Button>
                        <Button color="success" onClick={calculateNewStats}>
                            <div className="flex items-center gap-1">
                                <FaPlus /> <span>Calculate new</span>
                            </div>
                        </Button>
                    </div>
                </Modal.Footer >
            </Modal >
        </>
    );
}