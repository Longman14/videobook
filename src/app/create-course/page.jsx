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
import {GenerateCourseLayout_AI} from "../../../configs/AiModels";
import LoadingDialog from "./_component/LoadingDialog";

function CreateCourse() {
  const [loading, setLoading] = useState(true);
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
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
  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);
  // To check if the next button is active or not
  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (
      activeIndex == 0 &&
      (userCourseInput?.category?.length == 0 ||
        userCourseInput?.category == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 1 &&
      (userCourseInput?.topic?.length == 0 ||
        userCourseInput?.topic == undefined)
    ) {
      return true;
    } else if (
      activeIndex == 2 &&
      (userCourseInput?.level == undefined ||
        userCourseInput?.duration == undefined ||
        userCourseInput?.displayVideo == undefined ||
        userCourseInput?.chapters == undefined)
    ) {
      return true;
    }
    return false;
  };

  const GenerateCourseLayout=async()=>{
    setLoading(true);
    const BASIC_PROMPT= 'Generate a course tutorial with the following details: Course Name, Description, Along with chapter name, about, and duration.';
    const USER_INPUT_PROMPT= 'Category: '+userCourseInput?.category+', Topic: '+userCourseInput?.topic+', Description: '+userCourseInput?.description+' Level: '+userCourseInput?.level+', Duration: '+userCourseInput?.duration+', noOfChapter: '+userCourseInput?.chapters+' in JSON format';
    const FINAL_PROMPT= BASIC_PROMPT + USER_INPUT_PROMPT;
    console.log(FINAL_PROMPT);
    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    console.log(result.response?.text());
    console.log(JSON.parse(result.response?.text()));
    setLoading(false);
  }
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
        {activeIndex == 0 ? (
          <SelectCategory />
        ) : activeIndex == 1 ? (
          <TopicDescription />
        ) : (
          <SelectOption />
        )}
        {/* Next Previous Button */}
        <div className="flex justify-between mt-10">
          <Button
            disabled={activeIndex == 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
            variant="outline"
          >
            Previous
          </Button>
          {activeIndex < 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next
            </Button>
          )}
          {activeIndex == 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => GenerateCourseLayout()}
            >
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
}

export default CreateCourse;
