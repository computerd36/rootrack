import { useEffect, useState } from "react";
import { FormDownloadFiles } from "../components/form/FormDownloadFiles";
import { Button } from "flowbite-react";
import { FormUploadFiles } from "../components/form/FormUploadFiles";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { useBettingData } from "../context/bettingDataContext";
import { useNavigate } from "react-router-dom";
import { FormDownloadBets } from "../components/form/FormDownloadBets";
import { FormLogin } from "../components/form/FormLogin";

export function PageForm() {
    const { withdrawals, deposits } = useBettingData();
    const navigate = useNavigate();

    // Form step
    const [step, setStep] = useState(1);

    // Plattform dependend keybind logic
    const [ctrlKeybind, setCtrlKeybind] = useState('Ctrl');
    useEffect(() => {
        const isMac = navigator.userAgent.includes('Mac'); // returns true if on a Mac

        if (isMac) {
            setCtrlKeybind('Cmd');
        }
    }, []);

    return (
        <div className='w-full h-full bg-slate-950 flex items-center justify-center'>
            <div className='xl:w-1/2 md:w-full max-w-[800px] bg-indigo-900 rounded-xl flex flex-col justify-between p-5 m-5'>
                {step === 1 && <FormLogin />}
                {step === 2 && <FormDownloadFiles keybind={ctrlKeybind} />}
                {step === 3 && <FormDownloadBets keybind={ctrlKeybind} />}
                {step === 4 && <FormUploadFiles />}


                <div className="flex items-center justify-between">
                    <Button
                        color="warning"
                        className="w-16"
                        onClick={() => {
                            if (step > 1) {
                                setStep(step - 1);
                            }
                        }}
                        disabled={step === 1}
                    >
                        <HiOutlineArrowLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        color="warning"
                        className="text-nowrap"
                        onClick={() => {
                            if (step < 4) {
                                setStep(step + 1);
                            } else if (step === 4) {
                                navigate("/stats");
                            }
                        }}
                        disabled={step === 4 && (withdrawals.length == 0 || deposits.length == 0)}
                    >
                        {step < 4 ? "Next step" : "Show stats"}
                        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
