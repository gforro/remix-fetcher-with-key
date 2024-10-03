import { Outlet, useFetcher, useRevalidator } from "@remix-run/react";
import { useEffect, useReducer } from "react";

export default function Child() {
    const [visible, toggle] = useReducer((v) => !v, false);
    const revalidator = useRevalidator();

    return (
        <div className="flex flex-col gap-2 items-center">
            <button className="bg-red-200 px-4 py-1" onClick={() => revalidator.revalidate()}>Revalidate</button>
            <button className="bg-gray-200 px-4 py-1" onClick={toggle}>{visible ? "Hide" : "Show"}</button>
            {visible ? <Data /> : null}
        </div>
    );
}

function Data() {
    const fetcher = useFetcher({ key: "common" });

    useEffect(() => {
        if (fetcher.state === 'idle' && typeof fetcher.data === 'undefined') {
            fetcher.load(`/api/wait/${2000}`);
        }
    });

    return (
        <div className="flex flex-col">
            <span>Fetcher's state in child is {fetcher.state}</span>
            <span>Fetcher data from child is {JSON.stringify(fetcher.data)}</span>
        </div>
    );

}