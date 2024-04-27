import { PutExpPref, Settings, TestModeSetSchema, dbResStatus, responseStatus } from "@paybox/common";
import { Router, response } from "express";
import { getExplorerPref, getSettings, putExpPref, updateTestmode } from "../db/settings";
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
            if(isCached && isCached.btcExp) {
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
});

settingsRouter.put('/pref_exp', async (req, res) => {
    try {
    //@ts-ignore
    const id = req.id;
        if(id) {
            await Redis.getRedisInst().deleteHash(`${id}:pref`);
            await Redis.getRedisInst().deleteHash(`${id}:settings`);

            const {btcExp, ethExp, solExp} = PutExpPref.parse(req.body);

            const {status} = await putExpPref(id, solExp, ethExp, btcExp);
            if(status == dbResStatus.Error) {
                return res.status(500).json({
                    status: responseStatus.Error,
                    msg: 'Data-base error'
                });
            }

            return res.status(200).json({
                status: responseStatus.Ok,
                msg: "Updation successful"
            });
        }
        return res.status(401).json({
            status: responseStatus.Error,
            msg: "Auth Error",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: responseStatus.Error,
            msg: "Internal Server Error"
        });
    }
});

settingsRouter.get('/exp_pref', async (req, res) => {
    try {
        //@ts-ignore
        const id = req.id;

        if(id) {

            const cache = await Redis.getRedisInst().settings.getClientPref(`${id}:pref`);
            if(cache) {
                return res.status(200).json({
                    status: responseStatus.Ok,
                    pref: cache
                });
            }

            const {status, pref} = await getExplorerPref(id);
            if(status === dbResStatus.Error || !pref) {
                return res.status(404).json({
                    status: responseStatus.Error,
                    msg: "Appolozies, Can't get explorer preferences now, please try refreshing..."
                });
            }

            await Redis.getRedisInst().settings.cacheClientPref(`${id}:pref`, pref);

            return res.status(200).json({
                status: responseStatus.Ok,
                pref
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: responseStatus.Error,
            msg: "Internal Server Error"
        })
    }
});