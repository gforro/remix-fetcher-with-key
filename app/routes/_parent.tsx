import { Outlet, useFetcher } from "@remix-run/react";
import { useEffect } from "react";


export default function Parent() {
    const fetcher = useFetcher({ key: "common" });

    useEffect(() => {
        if (fetcher.state === 'idle' && typeof fetcher.data === 'undefined') {
            fetcher.load(`/api/wait/${1000}`);
        }
    });

    return (
        <div className="flex flex-col items-center gap-2">
            <p>Fetcher state from parent is <span className="font-bold">{fetcher.state}</span></p>
            <p>Fetcher data from parent is {JSON.stringify(fetcher.data)}</p>
            <div className="mt-6">
                <Outlet />
            </div>
        </div>
    );
}