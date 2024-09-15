import imageCompression from 'browser-image-compression';

// Function to resize image
export async function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number,
  maxSizeMB: number = 10,
  qualityStep: number = 0.1
): Promise<File | null> {
  try {
    // Define a function to check file size in MB
    const checkFileSizeMB = (file: File): number => file.size / 1024 / 1024; // Convert bytes to MB

    // Start with the highest quality
    let quality = 1;
    let compressedBlob: Blob | null = null;

    // Define a function to get the compressed Blob with specified quality
    const getCompressedBlob = async (quality: number): Promise<Blob> => {
      const options = {
        maxSizeMB: maxSizeMB,
        maxWidthOrHeight: Math.max(maxWidth, maxHeight),
        useWebWorker: true,
        initialQuality: quality,
      };
      return imageCompression(file, options);
    };

    // Try different quality levels until the file size is under the limit
    while (quality > 0) {
      compressedBlob = await getCompressedBlob(quality);

      // Create a temporary File object to check its size
      const tempFile = new File([compressedBlob], file.name, {
        type: file.type,
      });

      // Check if the file size is within the limit
      if (checkFileSizeMB(tempFile) <= maxSizeMB) {
        return tempFile; // File is under the maximum size
      }

      // Reduce quality and try again
      quality -= qualityStep;
    }

    return null;
  } catch (error) {
    console.error('Error resizing image:', error);
    return null;
  }
}

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export function base64ToBlob(base64: string, contentType?: string): Blob {
  // Decode the base64 string
  const byteCharacters = atob(base64.split(',')[1]);

  // Convert the binary string to an array of bytes
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  // Create a Uint8Array from the byte numbers
  const byteArray = new Uint8Array(byteNumbers);

  // Create and return the Blob
  return new Blob([byteArray], {
    type: contentType || base64.split(',')[1].replace('data:', ''),
  });
}

export const base64ToFile = async (
  base64String: string,
  fileName: string,
  fileType: string
): Promise<File> => {
  return new Promise((resolve, reject) => {
    // Ensure the base64String starts with the correct data URL scheme
    const dataUrlPattern = /^data:(image\/[a-zA-Z]*);base64,/;
    if (!dataUrlPattern.test(base64String)) {
      return reject(new Error('Invalid Base64 image string'));
    }

    // Extract the base64 data from the string
    const base64Data = base64String.replace(dataUrlPattern, '');

    // Decode the Base64 data
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Create a Blob from the byte array and then create a File object from the Blob
    const blob = new Blob([byteArray], { type: fileType });
    const file = new File([blob], fileName, { type: fileType });

    resolve(file);
  });
};

export function isFile(obj: any): obj is File {
  return obj instanceof File;
}
