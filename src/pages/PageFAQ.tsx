import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import Header from "../components/Header";

export function PageFAQ() {
    return (
        <div className='h-dvh flex flex-col bg-slate-950'>
            <Header />

            {/* Grid container to hold both the text and the Dice */}
            <div className='w-full min-h-[100dvh] bg-slate-950 px-4 py-4 sm:px-10 sm:py-10 md:px-20 md:py-10 lg:px-28 lg:py-10 xl:px-72 xl:py-10'>

                <h1 className="text-white text-3xl font-semibold mb-5">Frequently asked questions about Rootrack</h1>
                <Accordion>
                    <AccordionPanel>
                        <AccordionTitle>What is Rootrack?</AccordionTitle>
                        <AccordionContent>
                            <p className="mb-2 text-white dark:text-gray-400">
                                Rootrack is the ultimate tool for tracking your profits, losses, and trends on Roobet. It provides valuable insights using a wide array of statistics and charts, helping you to better understand your gambling activities. The app is user-friendly, completely free to use, and runs entirely on your local machine, ensuring your data stays private.
                            </p>
                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel>
                        <AccordionTitle>Where is the data for the statistics coming from?</AccordionTitle>
                        <AccordionContent>
                            <p className="mb-2 text-white dark:text-gray-400">
                                The data for the statistics is sourced directly from Roobet's backend server. To generate these insights, you need to be logged into your Roobet account in the browser. This allows you to download the necessary files: deposits.json, withdrawals.json, and bets.json. These files contain the raw data that Rootrack processes to calculate your statistics.
                            </p>
                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel>
                        <AccordionTitle>Can I trust you?</AccordionTitle>
                        <AccordionContent>
                            <p className="mb-2 text-white dark:text-gray-400">
                                Yes, you can trust Rootrack. The project is open-source, meaning the entire codebase is available for public inspection. Anyone can review the source code at any time to ensure that everything is transparent and secure. There are no hidden processes or data exchanges with external servers.
                            </p>
                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel>
                        <AccordionTitle>I've found a bug, how can I report it?</AccordionTitle>
                        <AccordionContent>
                            <p className="mb-2 text-white dark:text-gray-400">
                                If you discover a bug, you can report it through GitHub's "Issues" tab in the Rootrack repository. Alternatively, you can reach out via the email address provided in the contact section of the header. We encourage users to report issues so we can continue to improve the app.
                            </p>
                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel>
                        <AccordionTitle>How can I support the project?</AccordionTitle>
                        <AccordionContent>
                            <p className="mb-2 text-white dark:text-gray-400">
                                You can support the Rootrack project in the following ways:
                            </p>
                            <ul className="list-disc list-inside">
                                <li className="mb-2 text-white dark:text-gray-400">Use the bonus code "cd36" on Roobet.</li>
                                <li className="mb-2 text-white dark:text-gray-400">Star the GitHub repository to show your appreciation.</li>
                                <li className="mb-2 text-white dark:text-gray-400">Contribute to the project by submitting pull requests or opening issues.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>
            </div>
        </div>
    );
}
