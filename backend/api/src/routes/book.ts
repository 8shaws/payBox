import {
  InsertAddressBook,
  UUIDSchema,
  UpdateBook,
  dbResStatus,
  responseStatus,
} from "@paybox/common";
import { Router, response } from "express";
import { deleteBook, getBook, insertAddress, updateBook } from "../db/book";

export const bookRouter = Router();

/**
 * Insert book endpoint
 */
bookRouter.post("/", async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;
    if (id) {
      const { chain, name, publicKey, tag } = InsertAddressBook.parse(req.body);

      const { status, id: bookId } = await insertAddress(
        id,
        name,
        publicKey,
        chain,
        tag,
      );
      if (status == dbResStatus.Error || !bookId) {
        return res.status(500).json({
          status: responseStatus.Error,
          msg: "Datatbase error",
        });
      }

      return res.status(200).json({
        status: responseStatus.Ok,
        id: bookId,
      });
    }
    return res.status(401).json({
      status: responseStatus.Error,
      msg: "Unauthorized",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: responseStatus.Error,
      msg: "Internal server error",
    });
  }
});

/**
 * Get book endpoint
 */
bookRouter.get("/", async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;
    if (id) {
      const { status, book } = await getBook(id);
      if (status == dbResStatus.Error) {
        return res.status(500).json({
          status: responseStatus.Error,
          msg: "Datatbase error",
        });
      }

      return res.status(200).json({
        status: responseStatus.Ok,
        book,
      });
    }
    return res.status(401).json({
      status: responseStatus.Error,
      msg: "Unauthorized",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: responseStatus.Error,
      msg: "Internal server error",
    });
  }
});

/**
 * Book Delete endpoint
 */
bookRouter.delete("/", async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;
    if (id) {
      const { id: bookId } = UUIDSchema.parse(req.query);

      const { status } = await deleteBook(bookId);
      if (status == dbResStatus.Error) {
        return res.status(500).json({
          status: responseStatus.Error,
          msg: "Datatbase error",
        });
      }

      return res.status(200).json({
        status: responseStatus.Ok,
        msg: "Deleted",
      });
    }
    return res.status(401).json({
      status: responseStatus.Error,
      msg: "Unauthorized",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: responseStatus.Error,
      msg: "Internal server error",
    });
  }
});

bookRouter.put("/", async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;
    if (id) {
      const {
        id: bookId,
        chain,
        name,
        publicKey,
        tag,
      } = UpdateBook.parse(req.body);

      const { status } = await updateBook(bookId, name, publicKey, chain, tag);
      if (status == dbResStatus.Error) {
        return res.status(500).json({
          status: responseStatus.Error,
          msg: "Datatbase error",
        });
      }

      return res.status(200).json({
        status: responseStatus.Ok,
        msg: "Address Book Updated",
      });
    }
    return res.status(401).json({
      status: responseStatus.Ok,
      msg: "Unauthorized",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: responseStatus.Error,
      msg: "Internal Server Error",
    });
  }
});
