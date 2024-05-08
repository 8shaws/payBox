import { AccountType, BACKEND_URL, responseStatus } from "@paybox/common";
import { selector } from "recoil";
import { accountsAtom, clientJwtAtom } from "../atoms";

export const getAccounts = selector({
  key: "getAccounts",
  get: async ({ get }) => {
    const {
      status,
      accounts,
    }: { status: responseStatus; accounts: AccountType[] } = await fetch(
      `${BACKEND_URL}/account/all`,
      {
        method: "get",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${get(clientJwtAtom)}`,
        },
        cache: "no-cache",
      },
    ).then((res) => res.json());
    if (status == responseStatus.Error) {
      return [];
    }
    return accounts;
  },
});

// export const accountSelector = selector({
//     key: "accountSelector",
//     get: id => ({get}) => {
//         const accounts = get(accountsAtom);
//         return accounts.find((account: AccountType) => account.id == id);
//     },
// });

export const accountNumber = selector<number>({
  key: "accountNumber",
  get: async ({ get }) => {
    const accounts = get(accountsAtom);
    return accounts.length + 1;
  },
});
