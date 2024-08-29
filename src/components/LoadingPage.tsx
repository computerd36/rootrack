import { Spinner } from "flowbite-react";

interface LoadingPageProps {
    text?: string;
}

export function LoadingPage(props: LoadingPageProps) {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
            <Spinner color="warning" aria-label="Loading spinner" size="xl" />
            {props.text && <span className="text-white text-sm">{props.text}</span>}
        </div>
    );
}
