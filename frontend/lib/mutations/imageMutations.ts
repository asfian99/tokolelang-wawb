import axios from "axios";
import { parseCookies } from "nookies";
import { getTimeStamp } from "../formatDateTime";
import { API_URL } from "../url";
import { LoginResponse } from "./authMutations";

export interface ImageInputs {
  item_id: number;
  link: string;
}

export interface ImageResponse extends ImageInputs {
  id: number;
  created_at: number;
  updated_at: number;
}

export interface UploadImageResponse {
  status: string;
  path: string;
}

const cookie = parseCookies();
const cValue = cookie.token ? cookie.token?.split("&") : ["", "", ""];
const [access_token, id, username] = cValue;

export const uploadImage = async (
  base64EncodedImg: string | ArrayBuffer | null
) => {
  console.log(base64EncodedImg);
  const config = {
    // headers: { "content-type": "multipart/form-data" },
    onUploadProgress: (event: any) => {
      console.log(
        `Current progress:`,
        Math.round((event.loaded * 100) / event.total)
      );
    },
  };

  // const res = await axios.post("/api/image-upload", formData, config);

  // return res.data;
  try {
    const res = await axios.post(
      "/api/upload",
      { data: base64EncodedImg },
      config
    );

    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const postItemImage = async (input: ImageInputs) => {
  const ts = getTimeStamp();
  if (!id || !access_token) {
    console.log("cookie not found!");
    return {};
  } else {
    const req = { ...input, created_at: ts, updated_at: ts };
    const res = await axios.post(`${API_URL}/images`, req, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return res.data;
  }
};
