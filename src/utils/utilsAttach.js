import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
export const __dirname = join(dirname(__filename), '../..');
export const __dirUploads = '/public/uploads';


export function createUniqueFileName(originalName) {
    const date = new Date();
    const timestamp = date.getTime();
    const newName = originalName.replace(/\s+/g, '').toLowerCase();
    const uniqueName = `${timestamp}-${newName}`;
    return uniqueName;
}

export function GetUrlMedia(path) {
    const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';
    return `${serverUrl}${path}`;
}