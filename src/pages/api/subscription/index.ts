import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    userId: string;
    eventId: string;
    isRemote: boolean;
    ticketNumber: number;
  };
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case `POST`:
      try {
        const { userId, eventId, isRemote } = req.body;
        const isRegistered = await prisma.subscription.findFirst({
          where: {
            userId,
            isRemote,
          },
        });
        if (isRegistered) {
          res.status(400).json({ message: `usuário ja inscrito` });
          return;
        }

        const totalSubscription = await prisma.subscription.findMany();

        await prisma.subscription.create({
          data: {
            user: {
              connect: {
                id: userId,
              },
            },
            event: {
              connect: {
                id: eventId,
              },
            },
            isRemote,
            ticketNumber: totalSubscription.length + 1,
            ticketUrl: ``,
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
