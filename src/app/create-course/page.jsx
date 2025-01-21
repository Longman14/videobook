import React from "react";
import { HiClipboardDocumentCheck, HiLightBulb, HiMiniSquares2X2 } from "react-icons/hi2";
function CreateCourse() {
    const StepperOptions = [
        {
        id:1,
        name:'Category',
        icon: <HiMiniSquares2X2/>
    },
    {
        id:1,
        name:'Topic & Desc',
        icon: <HiLightBulb/>
    },
    {
        id:1,
        name:'Options',
        icon: <HiClipboardDocumentCheck/>
    },
]
  return (
    <div>
      {/* Stepper */}

      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl font-medium text-primary">Create a Course</h2>
        <div>
{StepperOptions.map((item, index)=>{
    <div>
        <div>
            <div className="bg-gray-200 p-3 rounded-full text-white">{item.icon}</div>
        </div>
    </div>
} )}
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
