import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productIds = searchParams
    .getAll('id')
    .map((v) => +v)
    .filter((v) => !isNaN(v));
  // Get price & discount of each product
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
      isArchived: false,
    },
    select: {
      price: true,
      discount: true,
    },
  });
  return NextResponse.json({ success: true, data: products });
}
