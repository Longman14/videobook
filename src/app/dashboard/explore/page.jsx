"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../configs/db";
import { CourseList } from "../../../../configs/schema";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  useEffect(() => {
    GetAllCourses();
  }, [pageIndex]);
  // Fetch all courses from the database
  const GetAllCourses = async () => {
    const courses = await db.select().from(CourseList).limit(9).offset(pageIndex*9);
    setCourseList(courses);
    console.log(courses);
  };
  return (
    <div>
      <h2 className="text-3xl font-bold">Explore More Courses</h2>
      <p>Explore more courses built with AI by other users</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {courseList?.map((course, index) => (
          <div>
            <CourseCard course={course} userProfile={true} edit={false} />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-5">
        {pageIndex != 0 && (
          <Button onClick={() => setPageIndex(pageIndex - 1)}>
            Previous Page
          </Button>
        )}
        <Button onClick={() => setPageIndex(pageIndex + 1)}>Next Page</Button>
      </div>
    </div>
  );
}

export default Explore;
