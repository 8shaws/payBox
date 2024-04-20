import { extractClientId } from "@paybox/backend-common";
import { ChangeLocaleSchema, dbResStatus, responseStatus } from "@paybox/common";
import { Router } from "express";
import {updateLocale} from "@paybox/backend-common";

export const localeRouter = Router();

/**
 * Updates user locale
 */
localeRouter.get('/', extractClientId, async (req, res) => {
    try {
        //@ts-ignore
        const id = req.id;
        if(id) {
            const {locale} = ChangeLocaleSchema.parse(req.query);

            //todo: save locale to db
            const {status} = await updateLocale(locale, id);
            if(status == dbResStatus.Error) {
                return res.status(500).json({
                    message: "Error updating locale...",
                    status: responseStatus.Error
                });
            }

            return res.status(200).json({
                message: "Locale updated successfully...",
                status: responseStatus.Ok
            });
        }
        return res.status(401).json({
            message: "Auth Error, Please login again...",
            status: responseStatus.Error
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            status: responseStatus.Ok
        })
    }
});