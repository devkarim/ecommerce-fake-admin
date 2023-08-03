import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

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
  // Get shop's billboard
  const billboard = await prisma.billboard.findUnique({
    where: { shopId },
  });
  return NextResponse.json({ success: true, data: billboard });
}
