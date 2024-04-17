import { selector } from "recoil";
import { quoteAtom, quoteRate } from "../atoms";

export const getQuote = selector({
    key: "getQuote",
    get: ({get}) => {
        const quote = get(quoteRate);
        const {amount, type} = get(quoteAtom);

        switch(type) {
            case "crypto": 
                return amount * quote;
            case "fiat": 
                return amount * quote
        }
        
    }
});