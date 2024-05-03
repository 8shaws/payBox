import { EmailSchema, dbResStatus, responseStatus } from "@paybox/common";
import { Router } from "express";
import { subscribeNewsletter } from "../db/locale";

export const utilRouter = Router();

utilRouter.post('/subscribe', async (req, res) => {
    try {
        const {email} = EmailSchema.parse(req.body);

        const {status} = await subscribeNewsletter(email);
        if(status === dbResStatus.Error) {
            return res.status(300)
                .json({
                    msg: "Email already subscribed",
                    status: responseStatus.Ok
                });
        }

        return res.status(200).json({
            status: responseStatus.Ok,
            msg: "Subscribed to newsletter"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: responseStatus.Error,
            msg: "Internal server error"
        })
    }
});