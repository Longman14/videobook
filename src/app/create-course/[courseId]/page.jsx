"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../configs/db";
import { Chapters, CourseList } from "../../../../configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateCourseContent_AI } from "../../../../configs/AiModels";
import LoadingDialog from "../_component/LoadingDialog";
import service from "../../../../configs/service";
import { useRouter } from 'next/navigation';

function CoursePage({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (params) GetCourse();
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

  // Function to generate chapter content
  const GenerateChapterContent = async () => {
    setLoading(true);

    const chapters = course?.courseOutput?.chapters;

    try {
      const contentPromises = chapters.map(async (chapter, index) => {
        if (index ==0) { // Limit to first 2 chapters
          const PROMPT = `Explain the concept in detail on Topic: ${course?.courseOutput?.courseName}, Chapter: ${chapter?.chapterName} in JSON format with list of array with fields: title, explanation, and code example (<precode> format) if applicable.`;

          console.log(PROMPT);

          // Generate AI-based chapter content
          const result = await GenerateCourseContent_AI.sendMessage(PROMPT);
          console.log(result.response?.text());

          const content = JSON.parse(result.response?.text());

          // Fetch video or playlist
          const videoResponse = await service.getVideos(
            `${course?.courseOutput?.courseName}: ${chapter?.chapterName}`
          );
          console.log(videoResponse);

          let videoId = videoResponse[0]?.id?.videoId || null;
          let playlistId = videoResponse[0]?.id?.playlistId || null;

          console.log("Selected ID:", videoId || playlistId);

          // Save chapter content & video URL in the database
          await db.insert(Chapters).values({
            chapterId: index,
            courseId: course?.courseId,
            title: chapter.chapterName,
            content: JSON.stringify(content),
            videoId: videoId,  // If videoId exists, it is stored
            playlistId: playlistId, // If playlistId exists, it is stored
          })
          ;
        }
      });

      // Wait for all content promises to resolve
      await Promise.all(contentPromises);

      setLoading(false);
      await db.update(CourseList).set({
        publish: true
      })
      router.replace(`/create-course/${course?.courseId}/finish`);
    } catch (error) {
      setLoading(false);
      console.error("Error generating chapter content:", error);
    }
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px:44">
      <h2 className="text-center font-bold text-2xl">Course Layout</h2>
      <LoadingDialog loading={loading} />

      {/* Basic info */}
      <CourseBasicInfo course={course} refreshData={GetCourse} />

      {/* Course content */}
      <CourseDetail course={course} />

      {/* List of Lesson */}
      <ChapterList course={course} refreshData={GetCourse} />

      <Button className="my-10 flex justify-self-end" onClick={GenerateChapterContent}>
        Generate Course Content
      </Button>
    </div>
  );
}

export default CoursePage;
