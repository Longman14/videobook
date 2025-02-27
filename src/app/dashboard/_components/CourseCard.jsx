"use client"
import DropdownOption from "./DropdownOption";
import Image from "next/image";
import React, {useState} from "react";
import { HiMiniEllipsisVertical, HiOutlineBookOpen } from "react-icons/hi2";
import { db } from "../../../../configs/db";
import { CourseList } from "../../../../configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";


function CourseCard({ course, refreshdata, userProfile=false, edit=true }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleOnDelete = async() => {
    if(isDeleting) return;
    setIsDeleting(true);
    
    const resp= await db.delete(CourseList).where(eq(CourseList.id, course?.id)).returning({id:CourseList?.id})
    if(resp){
      await refreshdata();
    }
  };
  return (
    <div className="shadow-sm rounded-lg border p-2  cursor-pointer mt-4">
      <Link href={'/course/'+course?.courseId}>
      <Image
        src={course?.courseBanner}
        width={300}
        height={200}
        className="w-full h-[200px] object-cover rounded-lg"
      />
      </Link>
      <div className="p-2">
        <h2 className="font-medium text-md flex justify-between items-center">
          {course?.courseOutput?.courseName}
          <DropdownOption handleOnDelete={()=>handleOnDelete()}>
           {edit && <HiMiniEllipsisVertical />}
          </DropdownOption>
        </h2>
        <p className="text-sm text-gray-400 my-1">{course?.category}</p>
        <div className="flex items-center justify-between">
          <h2 className="gap-2 flex items-center p-1 bg-purple-50 text-primary text-sm rounded-sm">
            <HiOutlineBookOpen />
            {course?.courseOutput.noOfChapter} Chapters
          </h2>
          <h2 className="text-sm bg-purple-50 text-primary p-1 rounded-sm">
            {course?.level}
          </h2>
          
        </div>
        {userProfile && (
            <div className="flex items-center gap-2 mt-3 justify-between">
              <Image src={course?.userProfileImage} width={35} height={35}
              className="rounded-full"/>
              <h2 className="text-sm">{course?.userName}</h2>
            </div>)}
      </div>
    </div>
  );
}

export default CourseCard;
