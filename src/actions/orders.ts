import { DefaultArgs } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';

import prisma from '@/lib/prisma';
import { RevenueChartData } from '@/types/ui';
import { getMonthName } from '@/lib/utils';

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

export const getOrdersSummary = async (shopId: number) => {
  // Get all orders that are paid and have at least one item from the shop
  const orders = await prisma.order.findMany({
    where: {
      isPaid: true,
      items: {
        some: {
          product: {
            shopId,
          },
        },
      },
    },
    include: { items: { select: { product: { select: { price: true } } } } },
  });
  // Get products in stock
  const productsInStock = await prisma.product.aggregate({
    where: {
      shopId,
      isArchived: false,
    },
    _sum: {
      quantity: true,
    },
  });
  // Calculate total revenue
  const totalRevenue = orders.reduce((total, order) => {
    const orderTotal = order.items.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber();
    }, 0);
    return total + orderTotal;
  }, 0);
  // Parse graph data
  const graphData: RevenueChartData[] = Array<number>(12)
    .fill(1)
    .map((_, month) => ({
      name: getMonthName(month),
      revenue: 0,
    }));
  for (const order of orders) {
    const month = order.createdAt.getMonth();
    graphData[month].revenue += order.items.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber();
    }, 0);
  }
  // Return total revenue and number of sales
  return {
    totalRevenue,
    sales: orders.length,
    productsInStock: productsInStock._sum.quantity,
    graphData,
  };
};
