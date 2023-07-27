import prisma from '@/lib/prisma';

export const getPropById = async (id: number) => {
  try {
    const prop = await prisma.property.findUnique({
      where: { id },
    });

    return prop;
  } catch (error: any) {
    return null;
  }
};
