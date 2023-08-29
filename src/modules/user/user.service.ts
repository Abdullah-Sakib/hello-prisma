import { User, PrismaClient, Profile } from "@prisma/client";

const prisma = new PrismaClient();

const InsertUserIntoDB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });

  return result;
};

const InsertOrUpdateProfile = async (data: Profile): Promise<Profile> => {
  const isExist = await prisma.profile.findUnique({
    where: {
      userId: data.userId,
    },
  });

  if (isExist) {
    const result = await prisma.profile.update({
      where: {
        userId: data.userId,
      },
      data: {
        bio: data.bio,
      },
    });

    return result;
  }

  const result = await prisma.profile.create({
    data,
  });

  return result;
};

const GetUsers = async () => {
  const result = await prisma.user.findMany({
    // * select returns the selected fields only
    // select: {
    //   email: true,
    //   name: true,
    // },
    // * Include populate the given table
    // include: {
    //   profiles: true,
    // },
  });
  return result;
};

const GetSingleUser = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  InsertUserIntoDB,
  InsertOrUpdateProfile,
  GetUsers,
  GetSingleUser,
};
