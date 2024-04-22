import { TestModeSetSchema, dbResStatus, responseStatus } from "@paybox/common";
import { Router } from "express";
import { updateTestmode } from "../db/settings";

export const settingsRouter = Router();

settingsRouter.post('/testmode', async (req, res) => {
    try {
        //@ts-ignore
        const id = req.id;
        if(id) {
            const {testMode} = TestModeSetSchema.parse(req.query);

            const {status} = await updateTestmode(testMode, id);
            if(status == dbResStatus.Error) {
                return res.status(404).json({
                    message: 'Data-base error',
                    status: responseStatus.Error
                });
            }

            return res.status(200).json({
                status: responseStatus.Ok
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            status: responseStatus.Error
        })
    }
});