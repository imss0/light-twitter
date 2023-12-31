import { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/db";
import { withApiSession } from "@lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (isNaN(Number(id))) {
      return res.status(400).end();
    }
    if (id !== undefined) {
      const tweet = await db.tweet.findUnique({
        include: {
          user: true,
        },
        where: {
          id: Number(id),
        },
      });
      if (tweet) {
        return res.status(200).json(tweet);
      }
    } else {
      return res.status(404).end();
    }
  }
}
export default withApiSession(handler);
