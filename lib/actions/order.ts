"use server";

import { prisma } from "../prisma";

export async function getTotalTicketsSoldByUser(userId: string) {
  const events = await prisma.event.findMany({
    where: { userId },
    select: { id: true },
  });
  const eventIds = events.map((e) => e.id);

  if (eventIds.length === 0) return 0;

  const orders = await prisma.order.findMany({
    where: { eventId: { in: eventIds } },
    select: { quantity: true },
  });

  const totalTicketsSold = orders.reduce(
    (sum, order) => sum + order.quantity,
    0
  );
  return totalTicketsSold;
}

export async function getTotalRevenueByUser(userId: string) {
  const events = await prisma.event.findMany({
    where: { userId },
    select: { id: true },
  });
  const eventIds = events.map((e) => e.id);

  if (eventIds.length === 0) return 0;

  const orders = await prisma.order.findMany({
    where: { eventId: { in: eventIds } },
    select: { totalAmount: true },
  });

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.totalAmount),
    0
  );
  return totalRevenue;
}

export async function getOrderByUserIdAction(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: {
      event: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
