import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    console.log("hi");
    const { id } = req.query;
    console.log(id);
    const tweet = await db.tweet.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (tweet) {
      console.log(tweet);
      return res.status(200).end();
    }
  } else {
    return res.status(404).end();
  }
}
