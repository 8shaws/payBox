"use client";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { AddressBook } from "@paybox/common";
import { booksAtom, clientJwtAtom } from "@paybox/recoil";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import BookEdit from "./book-edit";

const ShowBook = ({ book }: { book: AddressBook[] }) => {
  const [books, setBooks] = useRecoilState(booksAtom);

  useEffect(() => {
    setBooks(book);
  }, [book]);

  return (
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="flex flex-col">
        {books &&
          books.map((address: AddressBook) => (
            <BookEdit address={address} key={address.id} />
          ))}
      </div>
    </ScrollArea>
  );
};

export default ShowBook;
