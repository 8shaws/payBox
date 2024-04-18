import { useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { fetchQuote, getQuote } from "../selectors";
import { quoteRate } from "../atoms";
import { useEffect } from "react";

export const useQuote = (body: {
    quoteCurrencyAmount: number,
    areFeesIncluded: boolean,
    currencyCode: string
}) => {
    const setRate = useSetRecoilState(quoteRate);
    const getQuoteSel = useRecoilValue(getQuote);
    const rate = useRecoilValue(fetchQuote(body));
    useEffect(() => {
        setRate(rate);
    }, [body, rate]);

    return getQuoteSel;
}