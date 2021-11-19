import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "../../lib/cloudinary";

interface UploadRes {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  api_key: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const fileStr = req.body.data;
    // console.log(fileStr);

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "toko_lelang",
    });

    // console.log(uploadResponse);
    const path = uploadResponse.secure_url.split("upload");

    if (path.length <= 1) res.json({ msg: "error", path: "" });
    else res.json({ msg: "success", path: path[1] });
  } catch (error) {
    console.error(error);
    res.json({ msg: "error" });
  }
}

/*
uploadResponse example
{
  asset_id: '137b29e4e02d7a4862170669adf2eea6',
  public_id: 'toko_lelang/vlwfmkxnjbpmbzcek7vf',
  version: 1637314768,
  version_id: 'a03784eb21b99d648e424ac6261d5973',
  signature: 'a6504502fa78ae888b0f2add68274c907c234a3b',
  width: 2400,
  height: 1600,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2021-11-19T09:39:28Z',
  tags: [ 'toko_lelang' ],
  bytes: 458627,
  type: 'upload',
  etag: '59b1e9dbc2ab8895d6f1dca143a4f930',
  placeholder: false,
  url: 'http://res.cloudinary.com/asfian99/image/upload/v1637314768/toko_lelang/vlwfmkxnjbpmbzcek7vf.jpg',
  secure_url: 'https://res.cloudinary.com/asfian99/image/upload/v1637314768/toko_lelang/vlwfmkxnjbpmbzcek7vf.jpg',
  access_mode: 'public',
  api_key: '571769831945378'
}
*/
