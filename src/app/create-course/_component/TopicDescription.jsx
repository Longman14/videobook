import UserInputContext from "@/app/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";

function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  return (
    <div className="mx-20 lg:mx-44">
      {/* Input topic */}
      <div className="mt-5">
        <label htmlFor="">
          Write the topic for which you want to generate a course (e.g., Yoga,
          Javascript, etc.)
        </label>
        <Input placeholder="Topic" className="h-14 text-xl"
        onChange={(e)=>handleInputChange('topic', e.target.value)}
        defaultValue={userCourseInput?.topic}/>
      </div>
      <div className="mt-5">
        <label htmlFor="">
          Tell us more about your course. What would you like to include in the
          course? (Optional)
        </label>
        <Textarea placeholder="About Your Course" className="h-24 text-xl"
        onChange={(e)=>handleInputChange('description', e.target.value)} 
        defaultValue={userCourseInput?.description}/>
      </div>

      {/* Show text area */}
    </div>
  );
}

export default TopicDescription;
