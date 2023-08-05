import prisma from '@/lib/prisma';
import getSession from './getSession';

const getShop = async (shopId: number) => {
  try {
    const session = await getSession();

    if (!session?.user?.isAuthenticated) {
      return null;
    }

    const shop = await prisma.shop.findUnique({
      where: { id: shopId },
      include: { billboard: true },
    });

    if (!shop || shop.userId != session.user.id) {
      return null;
    }

    return shop;
  } catch (error: any) {
    return null;
  }
};

export const getShopWithProps = async (shopId: number) => {
  try {
    const session = await getSession();

    if (!session?.user?.isAuthenticated) {
      return null;
    }

    const shop = await prisma.shop.findUnique({
      where: { id: shopId },
      include: { props: true },
    });

    if (!shop || shop.userId != session.user.id) {
      return null;
    }

    return shop;
  } catch (error: any) {
    return null;
  }
};

export const getShopWithProducts = async (
  shopId: number,
  q: string,
  page: number,
  take: number = 5
) => {
  try {
    const session = await getSession();

    if (!session?.user?.isAuthenticated) {
      return null;
    }

    const shop = await prisma.shop.findUnique({
      where: { id: shopId },
      include: {
        _count: {
          select: { products: true },
        },
        products: {
          where: {
            OR: q
              ? [
                  {
                    name: {
                      contains: q,
                      mode: 'insensitive',
                    },
                  },
                ]
              : undefined,
          },
          skip: take * ((page || 1) - 1),
          take,
          orderBy: { updatedAt: 'desc' },
        },
      },
    });

    if (!shop || shop.userId != session.user.id) {
      return null;
    }

    return shop;
  } catch (error: any) {
    return null;
  }
};

export const getShopWithProduct = async (shopId: number, productId: number) => {
  try {
    const session = await getSession();

    if (!session?.user?.isAuthenticated) {
      return null;
    }

    const shop = await prisma.shop.findUnique({
      where: { id: shopId },
      include: {
        products: {
          where: { id: productId },
          include: { images: true, props: { include: { property: true } } },
        },
        props: true,
      },
    });

    if (!shop || shop.userId != session.user.id) {
      return null;
    }

    return shop;
  } catch (error: any) {
    return null;
  }
};

export const isShopOwnedToUser = async (userId: number, shopId: number) => {
  const currentShop = await prisma.shop.findFirst({
    where: {
      id: shopId,
      userId,
    },
  });

  // If shop found and owned by user
  if (currentShop) {
    return true;
  }

  return false;
};

export default getShop;
