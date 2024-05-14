import { auth } from "@clerk/nextjs";

const adminIds = ["user_2e7iNSH0L2yL6kEkG1TfDB3KjfL"];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
