import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '../../../lib/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      req.session.destroy();
      return res.status(200).end();
    } catch (error) {
      console.error(error);
      return res.status(405).end();
    }
  }
}

export default withApiSession(handler);