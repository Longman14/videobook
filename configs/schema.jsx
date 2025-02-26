import { boolean, integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList = pgTable('courseList', {
    id:serial("id").primaryKey(),
    courseId:varchar('courseId').notNull(),
    name:varchar('name').notNull(),
    category:varchar('category').notNull(),
    level:varchar('level').notNull(),
    includeVideo:varchar('includeVideo').notNull().default('Yes'),
    courseOutput:json('courseOutput').notNull(),
    createdBy:varchar('createdBy').notNull(),
    userName:varchar('userName'),
    userProfileImage:varchar('userProfileImage'),
    courseBanner:varchar('courseBanner').default('/course1.jpg'),
    publish:boolean('publish').default(false)
})

export const Chapters = pgTable('chapters', {
    id: serial('id').primaryKey(),
    courseId: varchar('courseId').notNull(),
    chapterName: varchar('chapterName').notNull(), // Add this column
    content: json('content').notNull(),
    videoId: varchar('videoId'),
    playlistId: varchar('playlistId')
  });