import { insertCentTxn } from "@paybox/backend-common";
import { dbResStatus, responseStatus } from "@paybox/common";
import { Router } from "express";

export const hooksRouter = Router();

hooksRouter.post("/moonpay", async (req, res) => {
    try {
        
        const {data} = req.body;
        //mutate the db
        const {status, id} = await insertCentTxn(data);
        if(status == dbResStatus.Error) {
            return res.status(200).json({
                status: responseStatus.Error,
                id
            });
        }
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