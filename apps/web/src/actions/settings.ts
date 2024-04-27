import { BACKEND_URL, ExplorerPref, Settings, responseStatus } from "@paybox/common";
import Pako from "pako";

export const getSettings = async (jwt: string): Promise<null | Settings> => {
    try {
        const { status, settings, msg }:
            { status: responseStatus, settings: any, msg?: string }
            = await fetch(`${BACKEND_URL}/settings/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "content-encoding": "gzip",
                    authorization: `Bearer ${jwt}`,
                },
                cache: "no-store"
            }).then(res => res.json());
        if (status === responseStatus.Error) {
            console.log(msg)
            return null;
        }
        return settings;
    } catch (error) {
        console.log(error);
        return null
    }
}


export const getPref = async (jwt: string) => {
    try {
        const {pref, status}: {status: responseStatus, pref: ExplorerPref} = await fetch(`${BACKEND_URL}/settings/exp_pref`, {
            method: "get",
            headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${jwt}`,
            },
        }).then(res => res.json());
        console.log(pref);
    } catch (error) {
        console.log(error);
        return null;
    }
}