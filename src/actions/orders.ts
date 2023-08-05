import { DefaultArgs } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';

import prisma from '@/lib/prisma';

export const getOrdersByShopId = async (
  shopId: number,
  q: string,
  page: number = 1
) => {
  const query: Prisma.OrderFindManyArgs<DefaultArgs> = {
    where: {
      OR: q
        ? [
            {
              firstName: {
                mode: 'insensitive',
                contains: q,
              },
            },
            {
              lastName: {
                mode: 'insensitive',
                contains: q,
              },
            },
            {
              phone: {
                mode: 'insensitive',
                contains: q,
              },
            },
            {
              email: {
                mode: 'insensitive',
                contains: q,
              },
            },
            {
              address: {
                mode: 'insensitive',
                contains: q,
              },
            },
            {
              invoiceId: {
                equals: +q || 0,
              },
            },
          ]
        : undefined,
      items: {
        some: {
          product: {
            shopId,
          },
        },
      },
    },
    skip: (page - 1) * 10,
    take: 10,
    orderBy: { updatedAt: 'desc' },
  };
  const [orders, count] = await prisma.$transaction([
    prisma.order.findMany(query),
    prisma.order.count({
      where: query.where,
    }),
  ]);
  return { orders, count };
};
