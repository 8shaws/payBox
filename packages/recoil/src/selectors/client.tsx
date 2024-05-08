import { atom, selector, useRecoilCallback } from "recoil";
import { addressAtom, clientAtom, clientJwtAtom, payloadAtom } from "../atoms";
import {
  Address,
  AddressFormPartialType,
  BACKEND_URL,
  ClientWithJwt,
  responseStatus,
} from "@paybox/common";

export const clientSelector = selector<ClientWithJwt>({
  key: "clientSelector",
  get: async ({ get }): Promise<ClientWithJwt> => {
    const jwt = get(clientJwtAtom);

    const me = await fetch(`${BACKEND_URL}/client/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }).then((res) => res.json());

    if (me.status === responseStatus.Error) {
      return Promise.reject(me.msg);
    }
    const data: ClientWithJwt = {
      id: me.id,
      jwt: me.jwt,
      firstname: me.firstname,
      lastname: me.lastname,
      username: me.username,
      email: me.email,
      address: me.address,
      mobile: me.mobile,
      valid: me.valid,
    };
    return data;
  },
});

export const getAuthSelector = selector({
  key: "getAuthSelector",
  get: ({ get }) => {
    const client = get(clientAtom);
    if (client?.id) {
      return "Profile";
    }
    return "Signin";
  },
});
