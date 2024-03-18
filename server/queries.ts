"use server";

import { PrismaClient } from "@prisma/client";

export type CreateUserPayload = {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const prisma = new PrismaClient();

export async function createUser(payload: CreateUserPayload) {
  try {
    const user = await prisma.user.create({
      data: payload,
    });
    return user;
  } catch (error) {
    console.log("Error: ", error);
    throw new Error("Could not create User!");
  }
}

export async function getAllUsers() {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.log(error);
    throw new Error("couldnt Load Users");
  }
}

export async function getUserById(userId: number) {
  try {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("could not get user");
  }
}

export async function deleteUserById(userId: number) {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("could not delete this user");
  }
}

export async function updateUser(
  payload: CreateUserPayload & { userId: number }
) {
  try {
    return await prisma.user.update({
      where: {
        id: payload.userId,
      },
      data: payload,
    });
  } catch (error) {
    console.log(error);
    throw new Error("could not update the user");
  }
}
