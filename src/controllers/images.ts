import { Post, Route, Get } from "tsoa";
import { getImageFromS3 } from "../aws/images";
interface ImageResponse {
  imageBase64: string;
}
@Route("api/v1/images/")
export default class ImagesController {
  @Get("/:fileName")
  public async getImage(fileName: string): Promise<ImageResponse> {
    // image.jpgd65054d4-6c53-4c1b-8835-a00ffb5534e8
    const image = await getImageFromS3(fileName);
    return {
      imageBase64: image,
    };
  }
}
