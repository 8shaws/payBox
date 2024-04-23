import { InsertAddressBook, dbResStatus, responseStatus } from "@paybox/common";
import { Router } from "express";
import { getBook, insertAddress } from "../db/addressbook";

export const bookRouter = Router();

bookRouter.post('/', async (req, res) => {
    try {
        //@ts-ignore
        const id = req.id;
        if(id) {
            const {chain, name, publicKey, tag} = InsertAddressBook.parse(req.body);

            const {status, id: bookId} = await insertAddress(id, name, publicKey, chain, tag);
            if(status == dbResStatus.Error || !bookId) {
                return res.status(500).json({
                    status: responseStatus.Error,
                    msg: "Datatbase error"
                });
            }

            return res.status(200).json({
                status: responseStatus.Ok,
                id: bookId
            });

        }
        return res.status(401).json({
            status: responseStatus.Error,
            msg: "Unauthorized"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: responseStatus.Error,
            msg: "Internal server error"
        })
    }
});

bookRouter.get('/', async (req, res) => {
    try {
        //@ts-ignore
        const id = req.id;
        if(id) {

            const {status, book} = await getBook(id);
            if(status == dbResStatus.Error) {
                return res.status(500).json({
                    status: responseStatus.Error,
                    msg: "Datatbase error"
                });
            }

            return res.status(200).json({
                status: responseStatus.Ok,
                book
            });

        }
        return res.status(401).json({
            status: responseStatus.Error,
            msg: "Unauthorized"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: responseStatus.Error,
            msg: "Internal server error"
        })
    } 
});