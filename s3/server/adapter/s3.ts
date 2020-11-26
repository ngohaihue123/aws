import { S3 } from 'aws-sdk'
export class S3Adapter {
  bucket: string
  s3: S3
  constructor() {
    this.bucket = process.env.S3_BUCKET || ''
    this.s3 = new S3({
      params: { Bucket: this.bucket }
    })
  }
  async getSingedUrl(key, type): Promise<string> {
    const s3Params = {
      Bucket: this.bucket,
      Key: key,
      ACL: 'public-read',
      ContentType: type,
      Expires: 5 * 60 //time to expire in seconds (15 minutes)
    }
    return new Promise((resolve, reject) => {
      this.s3.getSignedUrl('getObject', s3Params, (err, url) => {
        if (err) {
          reject(err)
        }
        if (url) {
          resolve(url)
        }
      })
    })
  }
}
