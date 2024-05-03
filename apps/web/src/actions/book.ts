import { BACKEND_URL, responseStatus } from "@paybox/common";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const getAddressbook = async (jwt: string) => {
    try {
        const { status, book, msg }:
            { status: responseStatus, book: any, msg?: string }
            = await fetch(`${BACKEND_URL}/book/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${jwt}`,
                },
                cache: "no-cache",
                next: {
                    tags: ["book"],
                }
            }).then(res => res.json());
        if (status === responseStatus.Error) {
            console.log(msg)
            return null;
        }
        return book;
    } catch (error) {
        console.log(error);
        return null
    }

}

export const rmAddress = async (jwt: string, id: string) => {
    try {
        const { status, msg }:
            { status: responseStatus, msg?: string }
            = await fetch(`${BACKEND_URL}/book?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${jwt}`,
                },
            }).then(res => res.json());
        if (status === responseStatus.Error) {
            console.log(msg);
            return Promise.reject();
        }
        return Promise.resolve();
    } catch (error) {
        console.log(error);
        return Promise.reject();
    }
}

export const subscribeNews = async (email: string): Promise<{
    msg: string
}> => {
    try {
        const { status, msg }:
            { status: responseStatus, msg?: string }
            = await fetch(`${BACKEND_URL}/utils/subscribe`, {
                method: "post",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ email }),
            }).then(res => res.json());
        if (status === responseStatus.Error) {
            return Promise.reject({msg});
        }
        return Promise.resolve({msg: msg || ""});
    } catch (error) {
        console.log(error);
        return Promise.reject({msg: "Internal Error"});
    }
}