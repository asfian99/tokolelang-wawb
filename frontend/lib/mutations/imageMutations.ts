import axios from "axios";

export interface PostImageResponse {
  id: number;
  item_id: number;
  link: string;
  created_at: number;
  updated_at: number;
}

export const uploadImage = async (formData: any) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
    onUploadProgress: (event: any) => {
      console.log(
        `Current progress:`,
        Math.round((event.loaded * 100) / event.total)
      );
    },
  };

  const res = await axios.post("/api/image-upload", formData, config);

  return res;
};
