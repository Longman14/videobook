CREATE TABLE "chapters" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" varchar NOT NULL,
	"chapterName" varchar NOT NULL,
	"content" json NOT NULL,
	"videoId" varchar,
	"playlistId" varchar
);
--> statement-breakpoint
ALTER TABLE "courseList" ADD COLUMN "includeVideo" varchar DEFAULT 'Yes' NOT NULL;--> statement-breakpoint
ALTER TABLE "courseList" ADD COLUMN "courseBanner" varchar DEFAULT '/course1.jpg';--> statement-breakpoint
ALTER TABLE "courseList" ADD COLUMN "publish" boolean DEFAULT false;