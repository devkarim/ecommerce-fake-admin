import { NextResponse } from 'next/server';

import getSession from '@/actions/getSession';
import prisma from '@/lib/prisma';
import {
  CreateProductSchema,
  addProductPropertyServerListSchema,
  createProductSchema,
} from '@/schemas/productSchema';
import { isShopOwnedToUser } from '@/actions/shops';
import { getPropById } from '@/actions/props';

export async function PATCH(
  req: Request,
  { params }: { params: { shopId: string; productId: string } }
) {
  try {
    const session = await getSession();
    const body: CreateProductSchema = await req.json();
    const { name, price, quantity, isArchived, isFeatured, images, props } =
      body;

    const shopId = +params.shopId;
    const productId = +params.productId;

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
    // Check product ID
    if (!productId || isNaN(productId)) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
        {
          status: 400,
        }
      );
    }
    // Validate update schema
    const validation = createProductSchema.safeParse(body);
    // If schema didn't pass validation
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.errors[0].message },
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
    // Check props validation
    const checkableProps = await Promise.all(
      (props || []).map((p) => {
        return getPropById(p.id).then((prop) => {
          return { ...p, type: prop?.type, allowedValues: prop?.values };
        });
      })
    );
    const propsVAlidation =
      addProductPropertyServerListSchema.safeParse(checkableProps);
    if (!propsVAlidation.success) {
      return NextResponse.json(
        { success: false, message: propsVAlidation.error.errors[0].message },
        {
          status: 400,
        }
      );
    }
    // Edit and remove all relations
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price,
        quantity,
        images: {
          deleteMany: {},
        },
        shopId,
        props: {
          deleteMany: {},
        },
        isArchived,
        isFeatured,
      },
    });
    // Re-add relations
    const property = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: images.map((url) => {
              return { url };
            }),
          },
        },
        props: {
          createMany: {
            data: (props || []).map((p) => {
              return { propertyId: p.id, value: p.value.toString() };
            }),
          },
        },
      },
    });
    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    console.log('[PRODUCTS_PATCH]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { shopId: string; productId: string } }
) {
  try {
    const session = await getSession();

    const shopId = +params.shopId;
    const productId = +params.productId;

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
    // Check product ID
    if (!productId || isNaN(productId)) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
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
    // Delete product
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log('[PRODUCTS_DELETE]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
