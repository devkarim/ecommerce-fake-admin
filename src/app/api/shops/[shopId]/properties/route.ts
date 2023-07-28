import { NextResponse } from 'next/server';

import { PropertyType } from '@prisma/client';

import getSession from '@/actions/getSession';
import prisma from '@/lib/prisma';
import { createPropertySchema } from '@/schemas/propertySchema';
import { isShopOwnedToUser } from '@/actions/shops';

export async function GET(
  req: Request,
  { params }: { params: { shopId: string } }
) {
  const shopId = +params.shopId;
  // Check shop ID
  if (!shopId || isNaN(shopId)) {
    return NextResponse.json(
      { success: false, message: 'Shop ID is required' },
      {
        status: 400,
      }
    );
  }
  // Get properties based on shop
  const properties = await prisma.property.findMany({
    where: { shopId },
  });
  return NextResponse.json({ success: true, data: properties });
}

export async function POST(
  req: Request,
  { params }: { params: { shopId: string } }
) {
  try {
    const session = await getSession();
    const body = await req.json();
    const { name, type, values } = body;
    const shopId = +params.shopId;
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
    // Validate create schema
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
    // Create new property
    const property = await prisma.property.create({
      data: { name, type, shopId, values },
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
