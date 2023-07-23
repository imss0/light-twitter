import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "light-twitter-session",
  password: "alkfjlasjfkasejtlkaejlaekstjalktjealwktewajk",
  cookieOptions: {
    isSameSite: "Lax",
    path: "/",
  },
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
