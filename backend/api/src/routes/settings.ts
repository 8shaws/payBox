import { Settings, TestModeSetSchema, dbResStatus, responseStatus } from "@paybox/common";
import { Router } from "express";
import { getSettings, updateTestmode } from "../db/settings";
import { Redis } from "..";

export const settingsRouter = Router();

settingsRouter.post('/nets', async (req, res) => {
    try {
        //@ts-ignore
        const id = req.id;
        if(id) {

            await Redis.getRedisInst().deleteHash(`${id}:settings`)

            const {testMode, btcNet, ethNet, solNet} = TestModeSetSchema.parse(req.body);

            const {status} = await updateTestmode(id, testMode, solNet, ethNet, btcNet);
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

settingsRouter.get('/', async (req, res) => {
    try {
        //@ts-ignore
        const id = req.id;
        if(id) {
            const isCached = await Redis.getRedisInst().settings.getSettingsCache<Settings>(`${id}:settings`);
            if(isCached && isCached.preferedExplorer) {
                return res.status(200).json({
                    status: responseStatus.Ok,
                    settings: isCached
                });
            }
            const {status, settings} = await getSettings(id);
            if(status == dbResStatus.Error || !settings) {
                return res.status(404).json({
                    message: 'Could not get settings',
                    status: responseStatus.Error
                });
            }

            await Redis.getRedisInst().settings.cacheSettings(`${id}:settings`, settings, 60*60*24);

            return res.status(200).json({
                status: responseStatus.Ok,
                settings
            });
        }
        return res.status(401).json({
            status: responseStatus.Error,
            msg: "Auth Error"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: responseStatus.Error,
            msg: "Internal Server Error"
        })
    }
})