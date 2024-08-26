import { useState } from "react";
import { FormDownloadFiles } from "../components/form/FormDownloadFiles";
import { Button } from "flowbite-react";
import { FormUploadFiles } from "../components/form/FormUploadFiles";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { useBettingData } from "../context/bettingDataContext";
import { useNavigate } from "react-router-dom";

export function PageForm() {
    const [step, setStep] = useState(1);

    const { withdrawals, deposits } = useBettingData();

    const navigate = useNavigate();



    return (
        <div className='w-full h-full bg-slate-950 flex items-center justify-center'>
            <div className='w-1/2 h-72 bg-indigo-900 rounded-xl flex flex-col justify-between p-5'>
                {step === 1 && <FormDownloadFiles />}
                {step === 2 && <FormUploadFiles />}


                <div className="flex items-center justify-between">
                    <Button
                        color="warning"
                        className="w-1/6"
                        onClick={() => {
                            if (step === 2) {
                                setStep(1);
                            }
                        }}
                        disabled={step === 1}
                    >
                        <HiOutlineArrowLeft className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                        color="warning"
                        className="w-1/4"
                        onClick={() => {
                            if (step === 1) {
                                setStep(2);
                            } else if (step === 2) {
                                navigate("/stats");
                            }
                        }}
                        disabled={step === 2 && (withdrawals.length == 0 || deposits.length == 0)}
                    >
                        {step == 1 ? "Next step" : "Show stats"}
                        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>


        </div>
    );
}
