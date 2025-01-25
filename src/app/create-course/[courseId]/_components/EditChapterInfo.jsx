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

function EditChapterInfo({ course, index }) {
  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <HiPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label htmlFor="">Course Title</label>
              <Input
                defaultValue={course?.courseOutput?.courseName}
                onChange={(event) => setName(event?.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Description</label>
              <Textarea
                className="h-40"
                defaultValue={course?.courseOutput?.description}
                onChange={(event) => setDescription(event?.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default EditChapterInfo;
