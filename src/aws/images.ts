import AWS from "aws-sdk";

export async function uploadToS3(file: File) {
  // Create S3 object
  const s3 = new AWS.S3();

  const fileName = "image.jpg" + crypto.randomUUID();
  const bucketName = "loyalsquare-ecommerce-images";
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: file,
  };

  // Upload image to S3 bucket
  s3.upload(params as any, (err: any, data: any) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`File uploaded successfully. File URL: ${data.Location}`);
    }
  });
}

export async function getImageFromS3(fileName: string): Promise<string> {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: fileName,
  };
  // Create S3 object
  const s3 = new AWS.S3();
  let base64String = "";
  await s3
    .getObject(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
        base64String =
          "data:image/jpeg;base64," + arrayBufferToBase64(data.Body);
        // data contains the image data as a Buffer object
      }
    })
    .promise();
  console.log(base64String);

  return base64String;
}

const arrayBufferToBase64 = (buffer: any) => {
  return Buffer.from(buffer).toString("base64");
};
