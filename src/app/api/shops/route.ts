import { NextResponse } from 'next/server';

import getSession from '@/actions/getSession';
import prisma from '@/lib/prisma';
import { createShopSchema } from '@/schemas/shopSchema';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = +(searchParams.get('page') ?? 1) || 1;
  // Get shops
  const shops = await prisma.shop.findMany({
    skip: (page - 1) * 10,
    take: 10,
    orderBy: { updatedAt: 'desc' },
  });
  return NextResponse.json({ success: true, data: shops });
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    const body = await req.json();

    const { name, isFeatured } = body;

    if (!session || !session.user.isAuthenticated) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const validation = createShopSchema.safeParse({ name });

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.errors[0].message },
        {
          status: 400,
        }
      );
    }

    const userId = session.user.id;

    const existingShop = await prisma.shop.findFirst({
      where: {
        name,
        userId,
      },
    });

    // If user has same shop name
    if (existingShop) {
      return NextResponse.json(
        {
          success: false,
          message: 'User already has same shop name',
        },
        {
          status: 400,
        }
      );
    }

    const shop = await prisma.shop.create({
      data: {
        name,
        userId,
        isFeatured,
      },
    });

    return NextResponse.json({ success: true, data: shop });
  } catch (error) {
    console.log('[STORES_POST]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
