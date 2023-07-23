import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import * as bcrypt from "bcrypt";
import { withApiSession } from '../../../lib/withSession';

 async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const { nickname, email, password } = req.body;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      console.log("user already exists");
      return res.status(200).end();
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