import { CLIENT_URL, ClientProvider, DBTopics, GetBuyUrlSchema, GetQuoteSchema, TopicTypes, TxnStatus, responseStatus } from "@paybox/common";
import { Router, response } from "express";
import { MoonPay } from '@moonpay/moonpay-node';
import { MOONPAY_API_KEY, MOONPAY_SECRET_KEY } from "../config";
import { generateUUID, moonPay } from "..";
import { NotifWorker } from "../workers/notfi";
import { providers } from "web3";
import sdk from '@api/moonpaydocs';


export const buyRouter = Router();

buyRouter.get('/', async (req, res) => {
    try {
        //@ts-ignore
        const id = req.id;
        if (id) {

            const query
                = GetBuyUrlSchema.parse(req.body);

            let signedUrl;
            switch (query.clientPlatform) {
                case ClientProvider.MoonPay:
                    const params = {
                        apiKey: MOONPAY_API_KEY,
                        baseCurrencyCode: query.baseCurrencyCode,
                        baseCurrencyAmount: query.baseCurrencyAmount,
                        defaultCurrencyCode: query.defaultCurrencyCode,
                        quoteCurrencyAmount: query.quoteCurrencyAmount,
                        walletAddress: query.walletAddress,
                        email: query.email,
                        externalCustomerId: id,
                        paymentMethod: 'credit_debit_card',
                        redirectURL: `${CLIENT_URL}/account/${query.walletAddress}/buy/success`,
                        showWalletAddressForm: "true",
                    };
                    signedUrl = moonPay.url.generate({ flow: 'buy', params });
                    break;
                default:
                    return res.status(400).json({
                        message: "Invalid client platform",
                        status: responseStatus.Error
                    });
            }

            return res.status(200).json({
                status: responseStatus.Ok,
                url: signedUrl,
            });

        }
        return res.status(401).json({
            message: "Auth Error",
            status: responseStatus.Error,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error,
            status: responseStatus.Error
        });
    }
});

buyRouter.get('/quote', async (req, res) => {
    try {
        //@ts-ignore
        const id = req.id;
        if (id) {

            const { baseCurrencyAmount, baseCurrencyCode, currencyCode, quoteCurrencyAmount, areFeesIncluded }
                = GetQuoteSchema.parse(req.body);
            sdk.auth(MOONPAY_API_KEY);
            const data = await sdk.getBuyQuote({ currencyCode, query: { baseCurrencyCode, quoteCurrencyAmount, areFeesIncluded, baseCurrencyAmount  } });
            return res.status(200).json({
                status: responseStatus.Ok,
                data
            });
        }
        return res.status(401).json({
            message: "Auth Error",
            status: responseStatus.Error,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Serve Error",
            error,
            status: responseStatus.Error
        })
    }
});