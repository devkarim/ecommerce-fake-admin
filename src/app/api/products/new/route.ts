import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = +(searchParams.get('page') ?? 1) || 1;
  // Get latest products
  const [products, count] = await prisma.$transaction([
    prisma.product.findMany({
      where: { isArchived: false },
      skip: (page - 1) * 10,
      take: 10,
      orderBy: { updatedAt: 'desc' },
      include: { props: true, images: true },
    }),
    prisma.product.count({ where: { isArchived: false } }),
  ]);
  return NextResponse.json({ success: true, data: { products, count } });
}
