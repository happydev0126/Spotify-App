import { Jimp } from "jimp";

export async function getMostCommonColor(imagePath: string): Promise<string> {
  try {
    // Read the image
    const image = await Jimp.read(imagePath);

    // Create a map to store color occurrences
    const colorMap: Map<string, number> = new Map();

    // Iterate through each pixel
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
      const red = image.bitmap.data[idx + 0];
      const green = image.bitmap.data[idx + 1];
      const blue = image.bitmap.data[idx + 2];

      // Create a color key
      const colorKey = `${red},${green},${blue}`;

      // Increment the count for this color
      colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
    });

    // Find the color with the highest count
    let maxCount = 0;
    let mostCommonColor = "";

    Array.from(colorMap.entries()).forEach(([color, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommonColor = color;
      }
    });

    // Convert the color to hex format
    const [r, g, b] = mostCommonColor.split(",").map(Number);
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

    return hex;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}

// Example usage
const imagePath = "./path/to/your/image.jpg";
getMostCommonColor(imagePath)
  .then((color) => console.log("Most common color:", color))
  .catch((error) => console.error("Error:", error));
