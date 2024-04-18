import { insertCentTxn } from "@paybox/backend-common";
import { dbResStatus, responseStatus } from "@paybox/common";
import { Router } from "express";
import { Redis } from "..";

export const hooksRouter = Router();

hooksRouter.post("/moonpay", async (req, res) => {
    try {
        
        const {data} = req.body;
        /**
         * Check if the transaction has already been processed
         */
        const isCached = await Redis.getInstance().getIdFromKey(data.id);
        if(isCached === "true") {
            return res.status(200).json({
                status: responseStatus.Ok,
                id: data.id
            });
        }
        
        //todo: handle the case where the transaction is not completed
        if(data.status !== "completed") {
            return res.status(200).json({
                status: responseStatus.Error,
                id: data.id
            });
        }
        
        const {status, id} = await insertCentTxn(data);
        if(status == dbResStatus.Error) {
            return res.status(200).json({
                status: responseStatus.Error,
                id
            });
        }

        await Redis.getInstance().cacheIdUsingKey(data.id, "true");

        return res.status(200).json({
            status: responseStatus.Ok,
            id
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