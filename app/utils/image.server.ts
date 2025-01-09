// @ts-ignore
import fs from "fs-extra";
import path from 'path';

// needs `npm i @paralleldrive/cuid2`
import { createId } from "@paralleldrive/cuid2";

/***
 * @returns path of the uploaded file, undefined if an invalid file got provided
 */
export async function uploadProfilePicture(file: File): Promise<string | undefined> {

    // check if a new file was uploaded
    if(file.size === 0 || file.name === ""){
        return undefined;
    }

    // go up two folders from the current script location
    const __dirname = path.dirname("~") 

    // Define the directory where the file will be saved
    const uploadDir = path.join(__dirname, 'public', 'pps');

    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Define the full path for the new file
    // todo choose file extension based on provided mime type
    const fileName = createId()+'.jpg'
    const filePath = path.join(uploadDir, fileName);

    try {
        // Convert the file to a Buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Write the file to the specified path
        fs.writeFileSync(filePath, buffer);

        // Return the file path or URL as needed
        return fileName; // Or return a URL if serving via a web server
    } catch (error) {
        console.error('Error saving file:', error);
        throw new Error('Failed to upload profile picture');
    }
}