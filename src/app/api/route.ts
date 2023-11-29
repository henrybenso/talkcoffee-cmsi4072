import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shopId } = req.query;

  try {
    const shop = await prisma.store.findUnique({
      where: {
        id: shopId as string,
      },
      include: {
        name: true,
        rating: true,
        phoneNumber: true,
        avatar: true,
        serviceTypes: true,
        serviceHours: true,
        images: true,
      },
    });

    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    res.status(200).json({ result: shop });
  } catch (error) {
    console.error('Error fetching shop data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}