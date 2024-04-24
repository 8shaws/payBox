import { BACKEND_URL, responseStatus } from "@paybox/common";

export const getSettings = async (jwt: string) => {
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
