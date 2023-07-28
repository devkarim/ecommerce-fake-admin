import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { shopId: string } }
) {
  const { searchParams } = new URL(req.url);
  const page = +(searchParams.get('page') ?? 1) || 1;
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
  // Get featured products based on shop
  const products = await prisma.product.findMany({
    where: { shopId, isFeatured: true },
    skip: (page - 1) * 10,
    take: 10,
    orderBy: { updatedAt: 'desc' },
    include: { props: true, images: true },
  });
  return NextResponse.json({ success: true, data: products });
}
