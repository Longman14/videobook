"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../configs/db";
import { Chapters, CourseList } from "../../../../../configs/schema";
import { and, eq } from "drizzle-orm";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";

function CourseStart({ params }) {
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterContent, setChapterContent] = useState();

  useEffect(() => {
    GetCourse();
  }, []);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId));
    setCourse(result[0]);
  };

  const GetSelectedChapterContent = async (chapterName) => {
    // console.log("chapterId:", chapterId);
    console.log("courseId:", course?.courseId);
    const result = await db
        .select()
        .from(Chapters)
        .where(
          and(
            eq(Chapters.chapterName, chapterName), 
            eq(Chapters.courseId, course.courseId)
          )
        );
        setChapterContent(result[0]);
        console.log("result is",result);
  };



 
  return (
    <div>
      {/* Chapter list side bar */}
      <div className="md:w-72 fixed hidden md:block h-screen bg-gray-50 border-r shadow-sm">
        <h2 className="font-medium text-lg bg-primary p-6 text-white">
          {course?.courseOutput?.courseName}
        </h2>
        <div>
          {course?.courseOutput?.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-blue-50 ${selectedChapter?.chapterName === chapter?.chapterName && "bg-blue-200"}`}
              onClick={() => {
                setSelectedChapter(chapter);
                GetSelectedChapterContent(chapter.chapterName); // Use chapter.chapterId instead of index
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Content div */}
      <div className="md:ml-64">
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
}

export default CourseStart;