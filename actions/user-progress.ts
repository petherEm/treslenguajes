"use server";

import db from "@/database/drizzle";
import { eq, and } from "drizzle-orm";
import { auth, currentUser } from "@clerk/nextjs";
import {
  getCourseById,
  getUserProgress,
  getUserSubscription,
} from "@/database/queries";
import { challengeProgress, challenges, userProgress } from "@/database/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const POINTS_TO_REFILL = 10;

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    throw new Error("User not found");
  }

  const course = await getCourseById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user?.firstName || "User",
      userImageSrc: user?.imageUrl || "/mascot.svg",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");

    redirect("/learn");
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user?.firstName || "User",
    userImageSrc: user?.imageUrl || "/mascot.svg",
  });

  revalidatePath("/courses");
  revalidatePath("/learn");

  redirect("/learn");
};

export const reduceHearts = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  const currentUserProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) {
    throw new Error("Challenge not found");
  }
  const lessonId = challenge.lessonId;
  // TO DO: Get user subscription

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) {
    return { error: "practice" };
  }

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  // TO DO: handle subscription

  if (userSubscription?.isActive) {
    return { error: "Subscription active" };
  }

  if (currentUserProgress.hearts === 0) {
    return { error: "No hearts" };
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};

export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  if (currentUserProgress.hearts === 5) {
    return { error: "Hearts are already full" };
  }

  if (currentUserProgress.points < POINTS_TO_REFILL) {
    return { error: "Not enough points" };
  }

  await db
    .update(userProgress)
    .set({
      hearts: 5,
      points: currentUserProgress.points - POINTS_TO_REFILL,
    })
    .where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("leaderboard");
};
