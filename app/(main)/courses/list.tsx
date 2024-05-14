"use client";

import { toast } from "sonner";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Card from "./card";
import { courses, userProgress } from "@/database/schema";
import { upsertUserProgress } from "@/actions/user-progress";

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: (typeof userProgress.$inferSelect)["activeCourseId"];
};

export const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) {
      router.push("/learn");
    } else {
      startTransition(() => {
        router.push(`/courses/${id}`);
        upsertUserProgress(id).catch(() => toast.error("Something went wrong"));
      });
    }
  };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={false}
          active={course.id === activeCourseId}
        ></Card>
      ))}
    </div>
  );
};
