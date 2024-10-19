// @ts-nocheck
"use server"
import { User } from "@/database/user.model"; // assuming User is your Mongoose model
import { connectDB } from "@/mongoose";
import { decrypt } from "@/utils/session";
import { cookies } from "next/headers";

export async function saveLinks(linksData) {
    try {
        await connectDB(); // Ensure connection to the DB
        console.log(linksData)
        const userId=await decrypt(cookies().get('session')?.value)
        await User.updateOne(
            { _id: userId?.userId }, // Filter to find the specific user by ID
            { $push: { links: linksData } } // Push new array of links
        );
        
        console.log("Links updated successfully.");
    } catch (error) {
        console.error("Error updating links:", error);
    }
}