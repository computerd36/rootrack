import { Button, Dropdown, DropdownItem, Tooltip } from 'flowbite-react';
import React from 'react';
import { FaDownload } from 'react-icons/fa';

export function FormDownloadBets() {
    const [betsLimit, setBetsLimit] = React.useState(10000);

    return (
        <React.Fragment>
            <div className='flex flex-col justify-center h-full'>
                <h2 className='text-white text-2xl text-center font-bold mb-5'> Download your bets from Roobet</h2>
                <div className='flex my-5 gap-2'>
                    <Tooltip content='Larger bet selections may result in increased file size and longer download times'>
                        <Dropdown label={`Last ${betsLimit / 1000}k bets`} color={"light"}>
                            <DropdownItem onClick={() => setBetsLimit(10000)}>Last 10k bets</DropdownItem>
                            <DropdownItem onClick={() => setBetsLimit(50000)}>Last 50k bets</DropdownItem>
                            <DropdownItem onClick={() => setBetsLimit(100000)}>Last 100k bets</DropdownItem>
                        </Dropdown>
                    </Tooltip>
                    <Button className='grow' color={"light"} href={`https://roobet.com/_api/history/bets?type=&order=desc&limit=${betsLimit}`} target='_blank'><div className='flex items-center justify-center gap-2'><FaDownload /> Download bets here</div></Button>
                </div>
            </div>
        </React.Fragment >
    );
}
