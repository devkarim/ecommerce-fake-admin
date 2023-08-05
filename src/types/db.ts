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
