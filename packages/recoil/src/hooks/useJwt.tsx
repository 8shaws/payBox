import { useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { clientJwtAtom } from "../atoms";
import { useRouter } from "next/navigation";

export const useJwt = (jwtP?: string) => {
    const [jwt, setJwt] = useRecoilState(clientJwtAtom);
    const router = useRouter();

    useEffect(() => {
        if(jwtP) setJwt(jwtP);
    }, [jwtP])

    useEffect(() => {
        if(!jwt) {
            router.push("/signup");
        }
    }, [jwt]);

    return jwt;
}