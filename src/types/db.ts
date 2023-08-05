import { Prisma } from '@prisma/client';

export type ShopWithProductsFull = Prisma.ShopGetPayload<{
  include: {
    products: {
      include: { images: true; props: true };
    };
    props: true;
  };
}>;

export type ProductFull = Prisma.ProductGetPayload<{
  include: {
    images: true;
    props: { include: { property: true } };
  };
}>;

export type OrderWithCount = Prisma.OrderGetPayload<{
  include: {
    _count: { select: { items: true } };
  };
}>;
