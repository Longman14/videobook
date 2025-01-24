const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

   export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a course tutorial with the following details: Course Name, Description, Along with chapter name, about, duration, Category: 'Programming', Topic: 'Introduction to JavaScript', Level: Basic, Duration: 1 hour, Chapters: 5, in Json format\n "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"courseName\": \"JavaScript Fundamentals: A Beginner's Guide\",\n  \"description\": \"This course provides a gentle introduction to JavaScript programming, covering the core concepts and syntax necessary to start building interactive web pages. No prior programming experience is required. Learn through hands-on examples and practice exercises.\",\n   \"category\": \"Programming\",\n  \"topic\": \"Introduction to JavaScript\",\n  \"level\": \"Basic\",\n  \"duration\": \"1 hour\",\n  \"chapters\": [\n    {\n      \"chapterName\": \"Chapter 1: Setting the Stage - What is JavaScript?\",\n      \"about\": \"This chapter introduces the concept of JavaScript, its purpose, and its role in web development. We'll explore where JavaScript code lives and how it interacts with HTML and CSS.\",\n      \"duration\": \"10 minutes\"\n    },\n    {\n      \"chapterName\": \"Chapter 2: Getting Started - Basic Syntax and Structure\",\n      \"about\": \"Here, we'll dive into the basic syntax of JavaScript, learning about variables, data types (numbers, strings, booleans), and how to write simple code statements.\",\n      \"duration\": \"15 minutes\"\n    },\n       {\n      \"chapterName\": \"Chapter 3: Controlling the Flow - Operators and Conditional Statements\",\n       \"about\":\"In this chapter, you'll understand arithmetic, comparison and logical operators and learn how to control the flow of your program with 'if' statements and conditional logic.\",\n       \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Chapter 4:  Repeating Actions - Loops\",\n      \"about\": \"This chapter teaches you how to repeat tasks using loops like 'for' and 'while', making your JavaScript code more efficient and powerful.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Chapter 5: Your First Interaction - Introduction to the DOM\",\n      \"about\": \"We will take a look at how JavaScript manipulates HTML elements, introducing the concept of the Document Object Model (DOM) and simple event handling. This chapter is about bringing your static web pages to life!\",\n       \"duration\": \"5 minutes\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());

