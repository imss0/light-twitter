import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@lib/withSession";
import db from "@lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
  } = req;

  if (!user?.id) {
    return res.status(401).end();
  }

  const tweetsWithUsers = await db.tweet.findMany({
    include: {
      user: true,
    },
  });

  const tweetsWithNicknames = tweetsWithUsers.map((tweetWithUser) => {
    return {
      id: tweetWithUser.id,
      nickname: tweetWithUser.user.nickname,
      content: tweetWithUser.content,
      createdAt: tweetWithUser.createdAt,
      updatedAt: tweetWithUser.updatedAt,
    };
  });

  return res.send(tweetsWithNicknames);
}

export default withApiSession(handler);
