// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";
import cors from "cors";
import axios from "axios";

type Data = {
  name: string
}

  const handler = nc()
      // use connect based middleware
      .use(cors())
      .get(async (req: NextApiRequest, res: NextApiResponse) => {
        const response = await axios.get("http://localhost:8080/v1/post", {
                headers: {
                    'Authorization': `Bearer G6HCsGBwkLLcgpV8a2qy960p3YioEhJ8`,
                },
            });
            response.data;
        })
      // .post(async (req: NextApiRequest, res: NextApiResponse) => {
      //
      // });

  export default handler;

