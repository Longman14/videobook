"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlinePuzzlePiece, HiPencilSquare } from "react-icons/hi2";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { storage } from "../../../../../configs/appwriteSetup";
import { ID } from "appwrite";
import { db } from "../../../../../configs/db";
import { CourseList } from "../../../../../configs/schema";
import { eq } from "drizzle-orm";

function CourseBasicInfo({ course, refreshData, edit = true}) {
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (course) {
      setSelectedFile(course?.courseBanner);
    }
  }, [course]);

  const onFileSelected = async (event) => {
    const file = event.target.files[0];

    console.log(file);
    if (!file) {
      alert("No file selected");
      return;
    }
    // Free memory from previous object URL before setting a new one
    if (selectedFile) {
      URL.revokeObjectURL(selectedFile);
    }
    // Generate a preview URL
    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(objectUrl);

    // Upload the file to Appwrite Storage

    try {
      const response = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID,
        ID.unique(), // Generates a unique ID for the file
        file
      );

      if (response) {
        console.log("File uploaded successfully:", response);

        // Retrieve the file's public URL
        const fileUrl = storage.getFileView(
          process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID,
          response.$id
        );
        console.log("File URL:", fileUrl);

        // Update the course's image URL in the database
        await db
          .update(CourseList)
          .set({
            courseBanner: fileUrl,
          })
          .where(eq(CourseList.id, course?.id))
          .returning({ id: CourseList.id });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.courseName}
            {edit && (
              <EditCourseBasicInfo
                course={course}
                refreshData={async () => refreshData(true)}
              />
            )}
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            <HiOutlinePuzzlePiece /> {course?.category}
          </h2>
          <Button className="w-full mt-5">Start</Button>
        </div>

        <div className="relative">
         {edit && <label htmlFor="upload-image" className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
            <HiPencilSquare className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          </label>}
          <label htmlFor="upload-image" className="block">
            <Image
              src={selectedFile ? selectedFile : "/course1.jpg"}
              width={300}
              height={300}
              className="w-full rounded-xl h-[300px] object-contain cursor-pointer"
            />
          </label>
         {edit && <input
            type="file"
            id="upload-image"
            className="opacity-0"
            onChange={onFileSelected}
          />}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
