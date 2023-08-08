import { NextResponse } from 'next/server';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';

import getSession from '@/actions/getSession';
import prisma from '@/lib/prisma';
import {
  CreateProductSchema,
  addProductPropertyServerListSchema,
  createProductSchema,
} from '@/schemas/productSchema';
import { isShopOwnedToUser } from '@/actions/shops';
import { getPropById } from '@/actions/props';

export async function GET(
  req: Request,
  { params }: { params: { shopId: string } }
) {
  const { searchParams } = new URL(req.url);
  const { page: p, ...propsParams } = Object.fromEntries(
    searchParams.entries()
  );
  const page = +(p ?? 1) || 1;
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
  // Get products based on shop
  const query: Prisma.ProductFindManyArgs<DefaultArgs> = {
    where: {
      shopId,
      isArchived: false,
      AND:
        Object.keys(propsParams).length != 0
          ? Object.keys(propsParams).map((k) => {
              const value = propsParams[k];
              return {
                props: {
                  some: {
                    property: {
                      name: {
                        equals: k,
                        mode: 'insensitive',
                      },
                    },
                    value: { in: value.split(','), mode: 'insensitive' },
                  },
                },
              };
            })
          : [],
    },
    skip: (page - 1) * 10,
    take: 10,
    orderBy: { updatedAt: 'desc' },
    include: { props: true, images: true, _count: true },
  };
  const [products, count] = await prisma.$transaction([
    prisma.product.findMany(query),
    prisma.product.count({ where: query.where }),
  ]);
  return NextResponse.json({ success: true, data: { products, count } });
}

export async function POST(
  req: Request,
  { params }: { params: { shopId: string } }
) {
  try {
    const session = await getSession();
    const body: CreateProductSchema = await req.json();
    const {
      name,
      price,
      quantity,
      discount,
      isArchived,
      isFeatured,
      images,
      props,
    } = body;

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
    // Create new product
    const property = await prisma.product.create({
      data: {
        name,
        price,
        quantity,
        discount,
        images: {
          createMany: {
            data: images.map((url) => {
              return { url };
            }),
          },
        },
        shopId,
        props: {
          createMany: {
            data: (props || []).map((p) => {
              return { propertyId: p.id, value: p.value.toString() };
            }),
          },
        },
        isArchived,
        isFeatured,
      },
    });
    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
