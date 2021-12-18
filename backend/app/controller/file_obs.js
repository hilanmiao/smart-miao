'use strict';

const Minio = require('minio')

const Controller = require('../core/controller');

class FileObsController extends Controller {

  constructor(ctx) {
    super(ctx);

    // 初始化 minio 客户端
    const { endPoint, accessKey, secretKey } = this.config.myConfig.private.minio
    this.minioClient = new Minio.Client({
      endPoint,
      // port: 9000,
      useSSL: true,
      accessKey,
      secretKey
    });
  }

  /**
   * 上传图片
   * @return {Promise<void>}
   */
  async uploadImage() {
    const { ctx } = this;
    try {
      // 资源类型
      const accept = 'image'
      // 存储桶名称
      const bucketName = this.config.myConfig.private.name
      const currentUser = ctx.request.user

      /* 获取文件流 */
      const stream = await ctx.getFileStream();
      console.log('-----------获取数据 start--------------');
      console.log(stream);
      // formData中的其他字段
      console.log(stream.fields);
      console.log('-----------获取数据 end--------------');

      /* 验证并创建存储桶 */
      const exists = await this.minioClient.bucketExists(bucketName)
      console.log('step 1')
      if (!exists) {
        // 创建项目的存储桶
        await this.minioClient.makeBucket(bucketName)
        // 设置存储桶策略（默认是私有，url 不能直接访问）
        // 向匿名用户授予只读权限（其他策略请查阅官方文档）
        const policy = {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'PublicRead',
              Effect: 'Allow',
              Principal: '*',
              Action: ['s3:GetObject', 's3:GetObjectVersion'],
              Resource: [`arn:aws:s3:::${bucketName}/*`]
            }
          ]
        }
        await this.minioClient.setBucketPolicy(bucketName, JSON.stringify(policy))
      }

      /* 上传文件 */
      // 使用旧的文件名，允许被覆盖
      // const objectName = stream.filename
      // 使用新的文件名，防止被覆盖，用户文件夹/资源类型/时间戳_文件名
      const objectName = `user_${currentUser.id}/${accept}/${Date.now()}_${stream.filename}`
      const size = stream.readableLength
      console.log(size)
      // 设置 metaData
      const metaData = {
        // 默认是灰色不能预览，因为默认content-type 是 application/octet-stream
        // 'Content-Type': 'application/octet-stream',
        'Content-Type': stream.mimeType
      }
      const etag = await this.minioClient.putObject(bucketName, objectName, stream, size, metaData)
      console.log('step 2', etag)

      /* 组装文件地址 */
      const { url: obsUrl } = this.config.myConfig.private.minio
      const url = `${obsUrl}/${bucketName}/${objectName}`
      console.log('step 3', url)

      this.success({ ctx, data: { url } });
    } catch (err) {
      console.log(err)
      this.fail({ ctx, message: err });
    }
  }

  /**
   * 上传头像
   * @return {Promise<void>}
   */
  async uploadAvatar() {
    const { ctx, service: { template } } = this;
    try {
      const { name: projectName } = this.config.myConfig.private

      // 创建项目的存储桶
      const err = await this.minioClient.makeBucket(projectName)
      if (err) {
        throw new Error(err)
      }
      const url = ''
      this.success({ ctx, data: { url } });
    } catch (err) {
      this.fail({ ctx, err });
    }
  }
}

module.exports = FileObsController;
