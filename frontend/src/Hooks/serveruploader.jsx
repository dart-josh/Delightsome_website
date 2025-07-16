import axios from "axios";

// eslint-disable-next-line no-undef
const dev_mode = process.env.NODE_ENV === "development";

const server_prefix = dev_mode ? "http://localhost:5000/api/upload" : "/api/upload";

const product_service_prefix = dev_mode ? "http://localhost:5000" : "https://delightsomejuice.com";

// Upload a new image
export const upload_image = async (file, onUploadProgress) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(
      `${server_prefix}/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress, // 👈 enable tracking
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error in upload_image function -", error);
    return null;
  }
};

// Replace existing image by name
export const replace_image = async (name, file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(
      `${server_prefix}/replace/${name}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    return response.data; // { filename, url }
  } catch (error) {
    console.log("Error in replace_image function -", error);
    return null;
  }
};

// Delete image by name
export const delete_image = async (name) => {
  try {
    const response = await axios.delete(`${server_prefix}/delete/${name}`);
    return response.data; // { success: true }
  } catch (error) {
    console.log("Error in delete_image function -", error);
    return null;
  }
};

export const fetch_image = (img) => {
  return product_service_prefix + img;
}
 