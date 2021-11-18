import nextConnect from "next-connect";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";

interface FileUploadRequest extends NextApiRequest {
  file: {
    fieldname: string;
    originalname: string;
    filename: string;
    path: string;
  };
}

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, "item_" + file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Request failed! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const uploadMiddleware = upload.single("itemImage");
apiRoute.use(uploadMiddleware);

apiRoute.post((req: FileUploadRequest, res: NextApiResponse) => {
  // Process a POST request
  // console.log(req.file.originalname);
  res
    .status(200)
    .json({ status: "success", path: "/uploads/" + req.file.filename });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
