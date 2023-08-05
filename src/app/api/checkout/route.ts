import { z } from 'zod';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import checkout from '@/services/fawaterk';
import { Customer } from '@/types/fawaterk';
import { CheckoutSchema, checkoutSchema } from '@/schemas/checkoutSchema';

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
    const body: CheckoutSchema = await req.json();
    // Validate update schema
    const validation = checkoutSchema.safeParse(body);
    // If schema didn't pass validation
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.errors[0].message },
        {
          status: 400,
        }
      );
    }
    // Extract all data
    const {
      first_name,
      last_name,
      email,
      phone,
      address_line_1,
      address_line_2,
      city,
      country,
      zip,
      productIds,
    } = body;
    // Format address to a readable string
    const address = `${address_line_1}${
      address_line_2 ? ', ' + address_line_2 : ''
    }, ${city}, ${country}, ${zip}`;
    // Get products from database
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });
    // Checkout using Fawaterk
    const response = await checkout(
      {
        first_name,
        last_name,
        email,
        phone,
        address,
      },
      products.map((p) => ({ name: p.name, price: +p.price, quantity: 1 })),
      products.reduce((acc, curr) => acc + +curr.price, 0)
    );
    const { url, invoiceId, invoiceKey } = response.data.data;
    // Create order in database
    await prisma.order.create({
      data: {
        email: email,
        firstName: first_name,
        lastName: last_name,
        phone: phone.toString(),
        address: address,
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
