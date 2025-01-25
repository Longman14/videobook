import {db} from "./db";
import {migrate} from "drizzle-orm/neon-http/migrator";

const main = async () => {
    try{
        await migrate(db, {
            directory: "configs/migrations"
        });
        console.log("Migration successful!");
    }
    catch(error){
        console.error("Migration failed: ", error)
        process.exit(1);
    }
}