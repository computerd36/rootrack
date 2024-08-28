import { Spinner } from "flowbite-react";

export function LoadingPage() {
    return (
        <div className='w-full h-full bg-slate-950 flex flex-col items-center justify-center gap-2'>
            <Spinner color="warning" aria-label="Loading spinner" size="xl" />
            <span className="text-white text-sm">Calculating statistics</span>
        </div>
    );
}
