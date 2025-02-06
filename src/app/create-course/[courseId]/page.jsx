"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../configs/db";
import { CourseList } from "../../../../configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";

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
// Generating chapter content
const GenerateChapterContent =()=>{
  const chapters=course?.courseOutput?.chapters;
  chapters.forEach((chapter, index)=>{
    const PROMPT = 'Explain the concept in detail on Topic: '+course?.courseOutput?.courseName+', Chapter: '+chapter?.chapterName+' in JSON format with list of array with field as title, explanation on given chapter in detail, Code example (code field <precode> format) if applicable';
    console.log(PROMPT); 
  })
}
  return (
    <div className="mt-10 px-7 md:px-20 lg:px:44">
      <h2 className="text-center font-bold text-2xl">Course Layout</h2>

      {/* Basic info */}

      <CourseBasicInfo
        course={course}
        refreshData={() => {
          GetCourse();
        }}
      />
      {/* Course content */}

      <CourseDetail course={course} />

      {/* List of Lesson */}
      <ChapterList
        course={course}
        refreshData={() => {
          GetCourse();
        }}
      />

      <Button className="my-10 flex justify-self-end" onClick={GenerateChapterContent}>Generate Course Content</Button>
    </div>
  );
}

export default CoursePage;
