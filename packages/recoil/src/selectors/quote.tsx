import { selector, selectorFamily } from "recoil";
import { clientJwtAtom, quoteAtom, quoteRate } from "../atoms";
import { BACKEND_URL, responseStatus } from "@paybox/common";

export const getQuote = selector({
  key: "getQuote",
  get: ({ get }) => {
    const quote = get(quoteRate);
    const { amount, type } = get(quoteAtom);

    switch (type) {
      case "crypto":
        return (amount / quote).toFixed(4);
      case "fiat":
        return (amount * quote).toFixed(2);
    }
  },
});

export const fetchQuote = selectorFamily({
  key: "fetchQuote",
  get:
    ({
      quoteCurrencyAmount,
      areFeesIncluded,
      currencyCode,
    }: {
      quoteCurrencyAmount: number;
      areFeesIncluded: boolean;
      currencyCode: string;
    }) =>
    async ({ get }) => {
      try {
        const jwt = get(clientJwtAtom);
        const response = await fetch(`${BACKEND_URL}/buy/quote`, {
          method: "post",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            baseCurrencyAmount: 10,
            quoteCurrencyAmount,
            areFeesIncluded,
            currencyCode,
          }),
        }).then((res) => res.json());
        if (response.status == responseStatus.Error) {
          console.log(response.msg);
          return 0;
        }
        return response.data.data.quoteCurrencyPrice;
      } catch (error) {
        console.log("Error while fetching quote: ", error);
        return 0;
      }
    },
});
