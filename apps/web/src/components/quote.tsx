import { BACKEND_URL, GetQuoteSchema, responseStatus } from "@paybox/common";
import { clientJwtAtom, getQuote, quoteAtom, quoteRate } from "@paybox/recoil";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { z } from "zod";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { ArrowUpDown } from "lucide-react";

type QuoteProps = z.infer<typeof GetQuoteSchema>;

function Quote({
  baseCurrencyAmount,
  quoteCurrencyAmount,
  areFeesIncluded,
  currencyCode,
  token,
}: QuoteProps & { token: string }) {
  const jwt = useRecoilValue(clientJwtAtom);
  const [show, setShow] = useState<boolean>(false);
  const setQuoteRate = useSetRecoilState(quoteRate);
  const [quoteState, setQuoteAtom] = useRecoilState(quoteAtom);
  const quoteValue = useRecoilValue(getQuote);

  useEffect(() => {
    (async () => {
      if (jwt) {
        try {
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
            setShow(false);
            console.log(response.msg);
            return;
          }
          setShow(true);
          console.log(response.data);
          setQuoteRate(response.data.quoteCurrencyPrice);
        } catch (error) {
          console.log("Error while fetching quote: ", error);
          return;
        }
      }
    })();
  }, []);

  return (
    <div
      className="flex gap-x-1 px-2 text-muted-foreground items-center"
      onClick={() => {
        setQuoteAtom((old) => {
          return {
            ...old,
            type: old.type == "fiat" ? "crypto" : "fiat",
          };
        });
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex gap-x-1 px-2 text-muted-foreground items-center hover:underline cursor-pointer">
              <span>
                {quoteState.type == "fiat" ? "$" : ""} {quoteValue}{" "}
                {quoteState.type == "crypto" ? token.toLocaleUpperCase() : ""}
              </span>
              <ArrowUpDown className="w-4 h-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default Quote;
