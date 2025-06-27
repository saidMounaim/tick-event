"use server";

import { z } from "zod";
import { createEventSchema } from "@/lib/validations";
import { prisma } from "../prisma";
import { auth } from "../auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getEventsAction(query?: string) {
  const where = query
    ? {
        OR: [
          { title: { contains: query, mode: "insensitive" as const } },
          { description: { contains: query, mode: "insensitive" as const } },
        ],
      }
    : {};
  const events = await prisma.event.findMany({
    where,
    orderBy: { date: "desc" },
    include: {
      additionalImages: true,
    },
  });
  return events;
}

export async function createEventAction(
  formData: z.infer<typeof createEventSchema> & {
    featuredImageUrl?: string;
    additionalImageUrls?: string[];
  }
) {
  const parsed = createEventSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: "Invalid form data." };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return { success: false, message: "User not authenticated." };
  }

  const {
    title,
    description,
    tickets,
    price,
    date,
    location,
    featuredImageUrl,
    additionalImageUrls,
  } = formData;

  try {
    await prisma.event.create({
      data: {
        title,
        description,
        tickets,
        price,
        date,
        location,
        userId: session?.user?.id as string,
        featuredImage: featuredImageUrl,
        additionalImages: additionalImageUrls
          ? {
              create: additionalImageUrls.map((url) => ({ url })),
            }
          : undefined,
      },
      include: {
        additionalImages: true,
      },
    });

    return { success: true, message: "Event created successfully!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to create event." };
  }
}

export async function getLatestEventsAction(size: number = 5) {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    take: size,
  });

  return events;
}

export async function getEventByIdAction(id: string) {
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      additionalImages: true,
    },
  });

  return event;
}

export async function getUserEventsAction(userId: string) {
  const events = await prisma.event.findMany({
    where: { userId },
    orderBy: { date: "desc" },
    include: {
      additionalImages: true,
    },
  });

  return events;
}

export async function deleteEventAction(eventId: string, pathname: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return { success: false, message: "User not authenticated." };
  }

  try {
    await prisma.event.delete({
      where: { id: eventId },
    });
    revalidatePath(pathname);
    return { success: true, message: "Event deleted successfully!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to delete event." };
  }
}
