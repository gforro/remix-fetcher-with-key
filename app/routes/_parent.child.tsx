import { Outlet, useFetcher, useRevalidator } from "@remix-run/react";
import { useEffect, useReducer } from "react";

export default function Child() {
    const [visible, toggle] = useReducer((v) => !v, false);
    const revalidator = useRevalidator();

    return (
        <div className="flex flex-col">
            <button onClick={() => revalidator.revalidate()}>Revalidate</button>
            <button onClick={toggle}>{visible ? "Hide" : "Show"}</button>
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
            <span>Fetcher data: {JSON.stringify(fetcher.data)}</span>
        </div>
    );

}