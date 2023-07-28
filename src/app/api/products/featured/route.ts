import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = +(searchParams.get('page') ?? 1) || 1;
  // Get featured products
  const products = await prisma.product.findMany({
    where: { isFeatured: true },
    skip: (page - 1) * 10,
    take: 10,
    orderBy: { updatedAt: 'desc' },
    include: { props: true, images: true },
  });
  return NextResponse.json({ success: true, data: products });
}
