import { NextResponse } from 'next/server';
import getSession from '@/actions/getSession';
import prisma from '@/lib/prisma';
import createShopSchema from '@/schemas/createShopSchema';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    const body = await req.json();

    const { name } = body;

    if (!session || !session.user.isAuthenticated) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const validation = createShopSchema.safeParse({ name });

    if (!validation.success) {
      return new NextResponse(validation.error.message, { status: 400 });
    }

    const shop = await prisma.shop.create({
      data: {
        name,
        userId: session.user.id,
      },
    });

    return NextResponse.json(shop);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
