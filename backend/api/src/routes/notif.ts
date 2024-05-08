import { getNotif, markViewed, updateNotif } from "@paybox/backend-common";
import {
  GetNotifValid,
  NotifUpdateValid,
  dbResStatus,
  responseStatus,
} from "@paybox/common";
import { Router } from "express";

export const notifRouter = Router();

/**
 * Get notifications
 */
notifRouter.get("/", async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;
    if (id) {
      const { limit, offset, topic, viewed } = GetNotifValid.parse(req.query);
      const { notifs, status } = await getNotif(
        id,
        offset,
        limit,
        topic,
        viewed,
      );
      if (status == dbResStatus.Error) {
        return res.status(500).json({
          status: responseStatus.Error,
          msg: "Data-base query error",
        });
      }

      return res.status(200).json({
        status: responseStatus.Ok,
        notifs,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: responseStatus.Error,
      msg: "Internal error",
      error: error,
    });
  }
});

notifRouter.put("/viewed", async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;
    if (id) {
      const { ids: notifIds } = NotifUpdateValid.parse(req.body);
      const { status } = await markViewed(notifIds);
      if (status == dbResStatus.Error) {
        return res.status(500).json({
          status: responseStatus.Error,
          msg: "Data-base mutate error",
        });
      }
      return res.status(200).json({
        status: responseStatus.Ok,
        msg: "Notification updated",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: responseStatus.Error,
      msg: "Internal error",
      error: error,
    });
  }
});
