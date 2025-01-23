"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from "react-icons/hi2";
import SelectCategory from "./_component/SelectCategory";
import TopicDescription from "./_component/TopicDescription";
import SelectOption from "./_component/SelectOption";
import UserInputContext from "../_context/UserInputContext";
function CreateCourse() {
  const {userCourseInput, setUserCourseInput}= useContext(UserInputContext)
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 1,
      name: "Topic & Desc",
      icon: <HiLightBulb />,
    },
    {
      id: 1,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(()=>{

  }, [userCourseInput])
  return (
    <div>
      {/* Stepper */}

      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl font-medium text-primary">Create a Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <div className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white ${activeIndex >= index && "bg-primary"}`}
                >
                  {item.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {index != StepperOptions?.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 
                ${activeIndex - 1 >= index && "bg-[#0049ff]"}`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-10 md:px-20 lg:px-44 mt-10 items-center">
        {/* Component */}
{activeIndex==0?<SelectCategory/>:activeIndex==1?<TopicDescription/>:<SelectOption/>}
        {/* Next Previous Button */}
        <div className="flex justify-between mt-10">
          <Button
            disabled={activeIndex == 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
            variant='outline'
          >
            Previous
          </Button>
          {activeIndex<2 &&<Button onClick={() => setActiveIndex(activeIndex + 1)}>Next</Button>}
          {activeIndex==2&&<Button onClick={() => setActiveIndex(activeIndex + 1)}>Generate Course Layout</Button>}
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
