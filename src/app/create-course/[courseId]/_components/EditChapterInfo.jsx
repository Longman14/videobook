import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { db } from "../../../../../configs/db";
import { CourseList } from "../../../../../configs/schema";
import { and, eq } from "drizzle-orm";

function EditChapterInfo({ course, index, refreshData }) {
  const CourseChapter = course?.courseOutput?.chapters;
  const [name, setName] = useState([]);
  const [about, setAbout] = useState();
  useEffect(() => {
    setName(CourseChapter[index].chapterName);
    setAbout(CourseChapter[index].about);
  }, [course]);

    const onUpdateHandler = async () => {
      course.courseOutput.chapters[index].chapterName = name;
      course.courseOutput.chapters[index].about = about;
const result = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .where(eq(CourseList.id, course?.id))
      .returning({ id: CourseList.id });
      console.log(CourseChapter[index].chapterName)
      console.log(result);
      refreshData(true)
    };
  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label htmlFor="">Course Title</label>
              <Input
                defaultValue={CourseChapter[index].chapterName}
                onChange={(event) => setName(event?.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Description</label>
              <Textarea
                className="h-40"
                defaultValue={CourseChapter[index].about}
                onChange={(event) => setAbout(event?.target.value)}
                
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={onUpdateHandler}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditChapterInfo;
