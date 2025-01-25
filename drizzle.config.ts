// import { defineConfig } from "drizzle-kit";

// // Define your drizzle configuration

// export default defineConfig({
//   dialect: "postgresql",
//   schema: "./configs/schema.jsx",
//   out: "./configs/migrations",
//   dbCredentials: {
//     url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING!  
//   }
  
// });

import { defineConfig } from "drizzle-kit";
import { config } from 'dotenv';

config({ path: '.env.local' });

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.jsx",
  out: "./configs/migrations",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING!,
  },
});
