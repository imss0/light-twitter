import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import { withApiSession } from "../../../lib/withSession";
import db from "../../../lib/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).end();
    }
    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        req.session.user = {
          id: user.id,
        };
        await req.session.save();
        return res.status(200).end();
      }
      return res.status(403).end();
    }
  }
  return res.status(405).end();
}

export default withApiSession(handler);
