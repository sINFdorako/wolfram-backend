import { Request, Response } from "express";
import { GeneratePresignedUrl } from "../../domain/usecases/generate_presigned_url";

export class WasabiController {

    constructor(private generateUrl: GeneratePresignedUrl) {}

    signedUrl = async (req: Request, res: Response) => {
        try {
            if(!req.user?.id) {
                return res.status(400).send({message: "User id is missing"});
            }

            // 30 minutes
            const expirationTimeInSeconds = 30 * 60; 

            const fileKey = `${req.user.id}/${Date.now()}.jpeg`;

            const presignedUrl = await this.generateUrl.execute('fotodeskpro', fileKey, expirationTimeInSeconds);
            return res.status(201).json({ url: presignedUrl });
        } catch(error) {
            console.error('Error generating presigned URL:', error);
            return res.status(500).send({message: "Error generating presigned URL"});
        }
    }
}