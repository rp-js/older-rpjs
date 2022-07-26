import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    id: string;
    url: string;
  };
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case `POST`:
      try {
        const { id, url } = req.body;
        await prisma.subscription.update({
          where: {
            id,
          },
          data: {
            ticketUrl: url,
          },
        });

        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
