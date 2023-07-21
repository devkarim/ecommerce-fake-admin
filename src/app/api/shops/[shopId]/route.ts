import { NextResponse } from 'next/server';

import getSession from '@/actions/getSession';
import prisma from '@/lib/prisma';
import { updateShopSchema } from '@/schemas/shopSchema';

export async function PATCH(
  req: Request,
  { params }: { params: { shopId: string } }
) {
  try {
    const session = await getSession();
    const body = await req.json();
    const { shopId } = params;

    const { name } = body;

    if (!session || !session.user.isAuthenticated) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!shopId || isNaN(+shopId)) {
      return NextResponse.json(
        { success: false, message: 'Shop ID is required' },
        {
          status: 400,
        }
      );
    }

    const id = +shopId;

    const validation = updateShopSchema.safeParse({ name });

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.errors[0].message },
        {
          status: 400,
        }
      );
    }

    const userId = session.user.id;

    const currentShop = await prisma.shop.findFirst({
      where: {
        id,
        userId,
      },
    });

    // If shop not found or not owned by user
    if (!currentShop) {
      return NextResponse.json(
        { success: false, message: 'Shop not found or not owned by user' },
        {
          status: 400,
        }
      );
    }

    const existingShop = await prisma.shop.findFirst({
      where: {
        name,
        userId,
      },
    });

    // If user has same shop name except the one he is updating right now
    if (existingShop && existingShop.id != id) {
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

    const shop = await prisma.shop.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return NextResponse.json({ success: true, shop });
  } catch (error) {
    console.log('[STORES_PATCH]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { shopId: string } }
) {
  try {
    const session = await getSession();
    const { shopId } = params;

    if (!session || !session.user.isAuthenticated) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!shopId || isNaN(+shopId)) {
      return NextResponse.json(
        { success: false, message: 'Shop ID is required' },
        {
          status: 400,
        }
      );
    }

    const id = +shopId;

    const userId = session.user.id;

    const currentShop = await prisma.shop.findFirst({
      where: {
        id,
        userId,
      },
    });

    // If shop not found or not owned by user
    if (!currentShop) {
      return NextResponse.json(
        { success: false, message: 'Shop not found or not owned by user' },
        {
          status: 400,
        }
      );
    }

    await prisma.shop.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log('[STORES_DELETE]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
