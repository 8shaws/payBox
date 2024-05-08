import { getFriendPubKey } from "@paybox/backend-common";
import { GetFriendPubKey, dbResStatus, responseStatus } from "@paybox/common";
import { Router } from "express";

export const friendshipRouter = Router();

friendshipRouter.get("/pubkey", async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;

    const { friendId } = GetFriendPubKey.parse(req.query);
    console.log(friendId);
    const { status, keys } = await getFriendPubKey(friendId);
    console.log(keys);
    if (status === dbResStatus.Error) {
      return res
        .status(503)
        .json({ msg: "Database Error", status: responseStatus.Error });
    }
    return res.status(200).json({
      status: responseStatus.Ok,
      keys,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: responseStatus.Error,
      msg: "Internal error",
      error: error,
    });
  }
});
