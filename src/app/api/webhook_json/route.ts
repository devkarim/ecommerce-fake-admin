import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

interface BodyRequest {
  api_key: string;
  invoice_key: string;
  invoice_id: number;
  payment_method: string;
  invoice_status: string;
  pay_load: any;
  referenceNumber: string;
}

export async function POST(req: Request) {
  try {
    const body: BodyRequest = await req.json();
    // Check if authorized to access this webhook
    if (!body.api_key || body.api_key != process.env.FAWATERK_API_KEY) {
      return NextResponse.json(
        { success: false, message: 'Forbidden' },
        { status: 403 }
      );
    }
    // Check if invoice is paid
    if (body.invoice_status == 'paid') {
      // Update order status
      const order = await prisma.order.update({
        where: {
          invoiceId: body.invoice_id,
        },
        data: {
          isPaid: true,
        },
        include: { items: true },
      });
      // Update product quantity
      await prisma.product.updateMany({
        where: {
          id: { in: order.items.map((item) => item.productId) },
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      });
      // Archive products with quantity 0
      await prisma.product.updateMany({
        where: {
          quantity: { equals: 0 },
        },
        data: {
          isArchived: true,
        },
      });
    }
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log('[WEBHOOK_JSON_POST]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
