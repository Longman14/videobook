"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../configs/db";
import { CourseList } from "../../../../configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";

function CoursePage({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    params && GetCourse();
  }, [params, user]);

  const GetCourse = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params?.courseId),
            eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
      setCourse(result[0]);
      console.log(result);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px:44">
      <h2 className="text-center font-bold text-2xl">Course Layout</h2>

      {/* Basic info */}

      <CourseBasicInfo course={course} />
      {/* Course content */}

      <CourseDetail course={course} />


      {/* List of Lesson */}
        <ChapterList course={course }/>

    </div>
  );
}

export default CoursePage;
