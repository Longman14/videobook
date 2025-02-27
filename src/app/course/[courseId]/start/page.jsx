"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../configs/db";
import { Chapters, CourseList } from "../../../../../configs/schema";
import { and, eq } from "drizzle-orm";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import Header from "@/app/dashboard/_components/Header";
import { HiOutlineMenuAlt2, HiX } from "react-icons/hi"; // Import icons
import { Button } from "@/components/ui/button";
import Link from "next/link";

function CourseStart({ params }) {
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterContent, setChapterContent] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

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
    console.log("courseId:", course?.courseId);
    const result = await db
      .select()
      .from(Chapters)
      .where(
        and(eq(Chapters.chapterName, chapterName), eq(Chapters.courseId, course.courseId))
      );
    setChapterContent(result[0]);
    console.log("result is", result);
  };

  return (
    <div className="relative">
    

      {/* 🔥 Hamburger Button (Mobile) */}
      <button
        className="absolute top-4 left-4 z-50 md:hidden bg-gray-200 p-2 rounded-full"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <HiX size={24} /> : <HiOutlineMenuAlt2 size={24} />}
      </button>
      <div className="ml-72">
      <Header />

      </div>
      {/* 📌 Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-50 border-r shadow-sm w-72 transition-transform duration-300 z-40
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="font-medium text-lg bg-primary p-6 text-white">
          {course?.courseOutput?.courseName}
        </h2>
        <div>
          {course?.courseOutput?.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-blue-50 ${
                selectedChapter?.chapterName === chapter?.chapterName && "bg-blue-200"
              }`}
              onClick={() => {
                setSelectedChapter(chapter);
                GetSelectedChapterContent(chapter.chapterName);
                setIsSidebarOpen(false); // Close sidebar on mobile after selection
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link href={'/dashboard'}>
          <Button>Back to Dashboard</Button></Link>
        </div>
      </div>

      {/* Content area - Adjust margin when sidebar is open */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-72" : "ml-0"} md:ml-72`}>
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
}

export default CourseStart;
