import { z } from 'zod';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import checkout from '@/services/fawaterk';
import { Customer } from '@/types/fawaterk';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body: { productIds: number[] } = await req.json();
    const parsed = z.number().array().min(1).safeParse(body.productIds);
    // Check if at least one product is provided
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'At least one product must be provided.',
        },
        { status: 400 }
      );
    }
    const productIds = parsed.data;
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });
    const customer: Customer = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@email.com',
      phone: 0,
      address: '3360 University Street, Seattle, WA',
    };
    // Checkout using Fawaterk
    const response = await checkout(
      customer,
      products.map((p) => ({ name: p.name, price: +p.price, quantity: 1 })),
      products.reduce((acc, curr) => acc + +curr.price, 0)
    );
    const { url, invoiceId, invoiceKey } = response.data.data;
    // Create order in database
    await prisma.order.create({
      data: {
        email: customer.email,
        firstName: customer.first_name,
        lastName: customer.last_name,
        phone: customer.phone.toString(),
        address: customer.address,
        invoiceId,
        invoiceKey,
        items: {
          createMany: {
            data: productIds.map((id) => ({ productId: id })),
          },
        },
      },
    });
    return NextResponse.json({ success: true, data: { url, invoiceId } });
  } catch (error) {
    console.log('[CHECKOUT_POST]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
