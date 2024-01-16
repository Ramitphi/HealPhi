import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const authParamsSchema = z.object({
  roomId: z.string(),
  previewPeers: z.array(z.string()),
});

export function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const parsedData = authParamsSchema.parse(req.query);

    const token = new AccessToken({
      apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "",
      roomId: parsedData.roomId,
      // role: data.previewPeers.length > 0 ? Role.LISTENER : Role.HOST,
      role: parsedData.previewPeers.length > 0 ? Role.LISTENER : Role.HOST,
      permissions: {
        admin: true,
        canConsume: true,
        canProduce: true,
        canProduceSources: { cam: true, mic: true, screen: true },
        canRecvData: true,
        canSendData: true,
        canUpdateMetadata: true,
      },
    });

    console.log({ token });

    return res.status(200).json(token);
  } catch (e) {
    return res.status(400).json("Invalid query");
  }
}
