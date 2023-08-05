import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { invoiceId: string } }
) {
  const invoiceId = +params.invoiceId;
  // Check invoice ID
  if (!invoiceId || isNaN(invoiceId)) {
    return NextResponse.json(
      { success: false, message: 'Invoice ID is required' },
      {
        status: 400,
      }
    );
  }
  // Get order by invoice id
  const order = await prisma.order.findUnique({
    where: { invoiceId },
  });
  return NextResponse.json({
    success: true,
    data: { isPaid: !!order?.isPaid },
  });
}
