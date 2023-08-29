import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CreatePost = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data,
    include: {
      author: true,
      category: true,
    },
  });

  return result;
};

const GetAllPost = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;
  const take = parseInt(limit) || 5;
  const skip = take * parseInt(page) - take || 0;

  // ? Transaction and rollback ( $transaction )
  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.findMany({
      include: {
        author: true,
        category: true,
      },

      // ? Sorting
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : {
              createdAt: "desc",
            },

      // ? Searching
      where: {
        // * we can use AND, OR, and NOT condition here
        OR: [
          {
            title: {
              contains: searchTerm,
              // * make the search type sensitive and insensitive useing mode
              mode: "insensitive",
            },
          },
          {
            author: {
              role: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      },

      // ? Pagination
      take: take,
      skip: skip,
    });

    // * get the number of total records of a talbe using ( count )
    const totalRecords = await tx.post.count();

    return { data: result, total: totalRecords };
  });
};

const GetSinglePost = async (id: number): Promise<Post | null> => {
  const result = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};

const UpdatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Partial<Post>> => {
  const result = await prisma.post.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return result;
};

const DeletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: {
      id: id,
    },
  });

  return result;
};

const LearnAggregateAndGrouping = async () => {
  // const result = await prisma.post.aggregate({
  //   _avg: {
  //     authorId: true,
  //     categoryId: true,
  //   },
  //   _sum: {
  //     authorId: true,
  //   },
  //   _count: {
  //     authorId: true,
  //   },
  // });

  const result = await prisma.post.groupBy({
    by: ["title"],
    _count: {
      title: true,
    },
  });
  return result;
};

// ? ===================== RawDatabaseAccess ========================
const RawDatabaseAccessGET = async () => {
  const result = await prisma.$queryRaw`SELECT * FROM posts`;
  return result;
};

const RawDatabaseAccessUPDATE = async (id: number, title: string) => {
  const result =
    await prisma.$executeRaw`UPDATE posts SET title = ${title} WHERE id = ${id}`;
  return result;
};

export const PostService = {
  CreatePost,
  GetAllPost,
  GetSinglePost,
  UpdatePost,
  DeletePost,
  LearnAggregateAndGrouping,
  RawDatabaseAccessGET,
  RawDatabaseAccessUPDATE,
};
