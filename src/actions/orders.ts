import prisma from '@/lib/prisma';

export const getOrdersByShopId = async (shopId: number, page: number = 1) => {
  const [orders, count] = await prisma.$transaction([
    prisma.order.findMany({
      where: {
        items: {
          some: {
            product: {
              shopId,
            },
          },
        },
      },
      include: {
        _count: { select: { items: true } },
      },
      skip: (page - 1) * 10,
      take: 10,
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.order.count({
      where: {
        items: {
          some: {
            product: {
              shopId,
            },
          },
        },
      },
    }),
  ]);
  return { orders, count };
};
