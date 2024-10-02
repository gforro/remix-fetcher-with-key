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
        <div className="flex flex-col item-center gap-4 margin-auto">
            <p>Fetcher state from parent is <span className="font-bold">{fetcher.state}</span></p>
            <p>Fetcher data from parent is <span className="font-bold">{JSON.stringify(fetcher.data)}</span></p>
            <Outlet />
        </div>
    );
}