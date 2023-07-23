import { NextResponse } from 'next/server';

import getSession from '@/actions/getSession';
import prisma from '@/lib/prisma';
import { createPropertySchema } from '@/schemas/propertySchema';
import { isShopOwnedToUser } from '@/actions/shops';

export async function POST(
  req: Request,
  { params }: { params: { shopId: string } }
) {
  try {
    const session = await getSession();
    const body = await req.json();

    const { name, type, values } = body;
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

    const validation = createPropertySchema.safeParse({ name, type, values });

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.errors[0].message },
        {
          status: 400,
        }
      );
    }

    const id = +shopId;

    const userId = session.user.id;

    // If shop not found or not owned by user
    if (!isShopOwnedToUser(userId, id)) {
      return NextResponse.json(
        { success: false, message: 'Shop not found or not owned by user' },
        {
          status: 400,
        }
      );
    }

    const property = await prisma.property.create({
      data: { name, type, shopId: id, values },
    });

    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    console.log('[PROPERTIES_POST]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
