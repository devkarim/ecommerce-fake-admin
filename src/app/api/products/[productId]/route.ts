import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  const productId = +params.productId;
  // Check product ID
  if (!productId || isNaN(productId)) {
    return NextResponse.json(
      { success: false, message: 'Product ID is required' },
      {
        status: 400,
      }
    );
  }
  // Get product details
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      props: { include: { property: true } },
      images: true,
      shop: true,
    },
  });
  return NextResponse.json({ success: true, data: product });
}
