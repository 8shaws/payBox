import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { BACKEND_URL, Client, responseStatus } from "@paybox/common";
import { headers } from "next/headers";
import pako from "pako";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          username: profile.login,
          image: profile.avatar_url,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
      profile(profile) {
        const username = profile.email.toString().split("@")[0];
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          username: username,
        };
      },
    }),
    CredentialsProvider({
      credentials: {},
      async authorize(_credentials, req) {
        let user;
        if (req.body?.type == "signin") {
          const response = await fetch(`${BACKEND_URL}/client/login`, {
            method: "post",
            headers: {
              "Content-type": "application/json",
              "Content-Encoding": "gzip",
            },
            body: pako.gzip(JSON.stringify(req.body)),
            cache: "no-store",
          }).then((res) => res.json());
          console.log(response, "from authorize")
          if (response.status == responseStatus.Error) {
            return null;
          }
          user = {
            id: response.id,
            jwt: response.jwt,
            firstname: response.firstname,
            lastname: response.lastname,
            username: response.username,
            email: response.email,
            address: response.address,
            mobile: response.mobile,
            valid: response.valid,
          };

          if (user.jwt) {
            return user;
          }
        }

        const response = await fetch(`${BACKEND_URL}/client/`, {
          method: "post",
          headers: {
            "Content-type": "application/json",
            "Content-Encoding": "gzip",
          },
          body: pako.gzip(JSON.stringify(req.body)),
          cache: "no-store",
        }).then((res) => res.json());
        if (response.status == responseStatus.Error) {
          return null;
        }
        user = {
          id: response.id,
          jwt: response.jwt,
          firstname: req.body?.firstname,
          lastname: req.body?.lastname,
          username: req.body?.username,
          email: req.body?.email,
          address: response.address,
          mobile: req.body?.mobile,
          valid: response.valid,
        };

        if (user.jwt) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    newUser: "/signup",
    error: "/_404",
  },

  callbacks: {


    async jwt({ token, trigger, user, session }) {
      if (user) {
        /**
         * For credential provider
         */
        //@ts-ignore
        if (user.jwt) {
          //@ts-ignore
          token.id = user.id;
          //@ts-ignore
          token.jwt = user.jwt;
          //@ts-ignore
          token.firstname = user.firstname;
          //@ts-ignore
          token.lastname = user.lastname;
          //@ts-ignore
          token.username = user.username;
          //@ts-ignore
          token.email = user.email;
          //@ts-ignore
          token.address = user.address;
          //@ts-ignore
          token.mobile = user.mobile;
          //@ts-ignore
          token.valid = user.valid;
        }
        //@ts-ignore
        if (token.jwt) {
          return token;
        }

        /**
         * create client for third-party provider
         */
        const body = {
          //@ts-ignore
          username: user.username || "",
          firstname: user.name?.split(" ")[0] || "",
          lastname: user.name?.split(" ")[1] || "",
          email: user.email || "",
          //@ts-ignore
          password: `Paybox:${user.username}-${user.id}` || "",
        };
        const response = await fetch(`${BACKEND_URL}/client/providerAuth`, {
          method: "post",
          headers: {
            "Content-type": "application/json",
            "Content-Encoding": "gzip",
          },
          body: pako.gzip(JSON.stringify(body)),
        }).then((res) => res.json());
        // console.log(response, "from jwt");
        token.jwt = response.jwt;
        token.id = response.id;
        token.firstname = user.name?.split(" ")[0];
        token.lastname = user.name?.split(" ")[1];
        token.email = response.email;
        token.mobile = response.mobile;
        token.address = response.address;
        token.valid = response.valid;
        token.status = response.status;
        token.msg = response.msg;

        /**
         * Fetch the jwt
         */
        return {
          ...token,
          id: response.id,
          jwt: response.jwt,
          firstname: response.firstname,
          lastname: response.lastname,
          username: response.username,
          email: response.email,
          address: response.address,
          mobile: response.mobile,
          valid: response.valid,
          status: response.status,
          msg: response.msg,
        };
      }
      return token;
    },
    async session({ user, session, token, trigger, newSession }) {
      if (trigger == "update") {
        // console.log(user, token, "session");
      }
      const me = await fetch(`${BACKEND_URL}/client/me`, {
        method: "GET",
        headers: {
          //@ts-ignore
          authorization: `Bearer ${token.jwt}`,
          "Content-type": "application/json",
          "x-no-compression": "true",
        },
        // cache: "no-store",
        next: {
          revalidate: 60
        }
      }).then(async (res) => {
        if (res.headers.get("content-type") == "gzip") {
          const buffer = await res.arrayBuffer();
          const data = new Uint8Array(buffer);
          const inflated = pako.inflate(data, {to: 'string'});
          return JSON.parse(inflated);
        }
        return res.json();
      });
      /**
       * \Add the jwt from token to user
       */
      return {
        ...session,
        user: {
          ...session.user,
          id: me.id,
          jwt: me.jwt,
          firstname: me.firstname,
          lastname: me.lastname,
          username: me.username,
          email: me.email,
          address: me.address,
          mobile: Number(me.mobile),
          name: `${me.firstname} ${me.lastname}`,
          valid: me.valid,
          status: me.status,
          msg: me.msg,
          password: me.password,
        },
      };
    },
    
  },
  
};
