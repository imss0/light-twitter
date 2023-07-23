import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/db";
import { withApiSession } from "../../../../lib/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const {
      query: { id },
      session: { user },
    } = req;

    const likeCount = await db.like.count({
      where: {
        tweetId: +id,
      },
    });

    const likeFromUser = await db.like.findFirst({
      where: {
        userId: user?.id,
        tweetId: +id,
      },
    });

    if (likeFromUser) {
      return res.status(200).json({ likeCount, isLiked: true });
    } else {
      return res.status(200).json({ likeCount, isLiked: false });
    }
  }

  if (req.method === "POST") {
    const {
      query: { id },
      session: { user },
    } = req;

    const likeFromUser = await db.like.findFirst({
      where: {
        userId: user?.id,
        tweetId: +id,
      },
    });

    if (likeFromUser) {
      await db.like.delete({
        where: {
          userId_tweetId: {
            userId: user?.id as number,
            tweetId: +id,
          },
        },
      });
      return res.status(201).end();
    } else {
      await db.like.create({
        data: {
          user: {
            connect: {
              id: user?.id,
            },
          },
          tweet: {
            connect: {
              id: +id,
            },
          },
        },
      });
      return res.status(201).end();
    }
  }
}
export default withApiSession(handler);
