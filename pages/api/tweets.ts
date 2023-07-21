import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../lib/withSession";
import db from "../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
  } = req;

  if (!user?.id) {
    return res.status(401).end();
  }
  const tweets = await db.tweet.findMany();
  console.log(tweets);
  return res.send(tweets);
}

export default withApiSession(handler);
