import { NextResponse } from 'next/server';

import { PropertyType } from '@prisma/client';

import getSession from '@/actions/getSession';
import prisma from '@/lib/prisma';
import {
  CreatePropertySchema,
  createPropertySchema,
} from '@/schemas/propertySchema';
import { isShopOwnedToUser } from '@/actions/shops';

export async function PATCH(
  req: Request,
  { params }: { params: { shopId: string; propertyId: string } }
) {
  try {
    const session = await getSession();
    const body: CreatePropertySchema = await req.json();
    const shopId = +params.shopId;
    const propertyId = +params.propertyId;
    const { name, type, values } = body;
    if (!session || !session.user.isAuthenticated) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }
    // Check shop ID
    if (!shopId || isNaN(shopId)) {
      return NextResponse.json(
        { success: false, message: 'Shop ID is required' },
        {
          status: 400,
        }
      );
    }
    // Check property ID
    if (!propertyId || isNaN(propertyId)) {
      return NextResponse.json(
        { success: false, message: 'Property ID is required' },
        {
          status: 400,
        }
      );
    }
    // Validate update schema
    const validation = createPropertySchema.safeParse({ name, type, values });
    // If schema didn't pass validation
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.errors[0].message },
        {
          status: 400,
        }
      );
    }
    // Check values if type is FixedValues
    if (
      type == PropertyType.FixedValues &&
      (!values || values.length == 0 || values[0].length == 0)
    ) {
      return NextResponse.json(
        { success: false, message: 'At least one property must be added.' },
        {
          status: 400,
        }
      );
    }
    const userId = session.user.id;
    // If shop not found or not owned by user
    if (!isShopOwnedToUser(userId, shopId)) {
      return NextResponse.json(
        { success: false, message: 'Shop not found or not owned by user' },
        {
          status: 400,
        }
      );
    }

    const property = await prisma.property.update({
      where: {
        id: propertyId,
        shopId,
      },
      data: {
        name,
        type,
        values,
      },
    });

    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    console.log('[PROPERTIES_PATCH]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { shopId: string; propertyId: string } }
) {
  try {
    const session = await getSession();
    const shopId = +params.shopId;
    const propertyId = +params.shopId;
    if (!session || !session.user.isAuthenticated) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }
    // Check shop ID
    if (!shopId || isNaN(shopId)) {
      return NextResponse.json(
        { success: false, message: 'Shop ID is required' },
        {
          status: 400,
        }
      );
    }
    // Check property ID
    if (!propertyId || isNaN(propertyId)) {
      return NextResponse.json(
        { success: false, message: 'Property ID is required' },
        {
          status: 400,
        }
      );
    }
    const userId = session.user.id;
    // If shop not found or not owned by user
    if (!isShopOwnedToUser(userId, shopId)) {
      return NextResponse.json(
        { success: false, message: 'Shop not found or not owned by user' },
        {
          status: 400,
        }
      );
    }
    await prisma.property.delete({
      where: {
        id: propertyId,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log('[PROPERTIES_DELETE]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
