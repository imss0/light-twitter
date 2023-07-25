import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import db from "@lib/db";
import { withApiSession } from "@lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { nickname, email, password } = req.body;
    const existingEmailUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingEmailUser) {
      return res.status(200).json({ error: "email" });
    }

    const existingNicknameUser = await db.user.findUnique({
      where: {
        nickname,
      },
    });
    if (existingNicknameUser) {
      return res.status(200).json({ error: "nickname" });
    }

    await db.user.create({
      data: {
        nickname,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });
    console.log("user created");
    return res.status(201).end();
  }
  return res.status(405).end();
}

export default withApiSession(handler);
