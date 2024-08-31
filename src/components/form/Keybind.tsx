import { Kbd } from "flowbite-react";

interface KeybindProps {
    children: React.ReactNode;
}

export function Keybind({ children }: Readonly<KeybindProps>) {
    return (
        <Kbd className='px-1.5 py-0.5'>{children}</Kbd>
    );
}