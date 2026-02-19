
import axios from "axios";
import fs from "fs-extra";

import { OUTPUT_IMAGE_PATH } from "../config/constants.js";

export async function downloadImage(imageUrl, fileName) {
    try {
        const imgData = await axios.get(imageUrl, { responseType: "arraybuffer" });
        await fs.ensureDir(OUTPUT_IMAGE_PATH);
        await fs.writeFile(`${OUTPUT_IMAGE_PATH}${fileName}`, imgData.data);
        console.log(`Image ${fileName} downloaded ✅`);
    } catch (err) {
        console.log(`Failed to download image ${fileName} ❌`, err.message);
    }
}