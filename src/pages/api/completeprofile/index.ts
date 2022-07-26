import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case `POST`:
      try {
        const { email } = req.body;
        await prisma.user.update({
          where: {
            email: `${email}`,
          },
          data: {
            profileIsComplete: true,
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
