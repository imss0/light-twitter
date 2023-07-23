import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const { userId, content } = req.body;
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      await db.tweet.create({
        data: {
          content: content,
          userId: user.id,
        },
      });
      return res.status(201).end();
    } else {
      return res.status(404).end();
    }
  }
}

export default withApiSession(handler);
