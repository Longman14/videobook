import React from "react";
import { HiOutlineCheckCircle, HiOutlineClock } from "react-icons/hi2";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import EditChapterInfo from "./EditChapterInfo";

function ChapterList({ course, refreshData, edit=true}) {
  return (
    <div className="mt-3">
      <h2 className="font-medium text-xl">Chapters</h2>
      <div className="mt-2">
        {course?.courseOutput?.chapters.map((chapter, index) => (
          <div
            key={index}
            className="border p-5 rounded-lg mb-2 flex items-center justify-between"
          >
            <div className="flex gap-5 items-center">
              <h2 className="bg-primary flex-none h-10 w-10 text-white rounded-full text-center p-2 my-1">
                {index + 1}
              </h2>
              <div>
                <h2 className="font-medium text-lg">
                  {chapter?.chapterName}
               {edit &&   <EditChapterInfo
                    index={index}
                    course={course}
                    refreshData={refreshData}
                  />}
                </h2>
                <p className="text-sm text-gray-500">{chapter?.about}</p>
                <p className="flex gap-2 text-primary items-center">
                  {" "}
                  <HiOutlineClock />
                  {chapter?.duration}
                </p>
              </div>
            </div>
            <HiOutlineCheckCircle className="text-4xl text-gray-300 flex-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
