### 项目结构
- src
-    js
-    css
-    images
- index.js
- index.css
- index.scss

### 流程
1. 定义类Cropper
2. 将默认配置和配置进行合并
3. 调用this.init()进行初始化
* init() ---> 区分处理img和canvas, 获取src
* 调用 this.load(src)
4. load函数
* 浏览器兼容
* base64编码的图片url处理


### 问题
1. 同一张图片，通过使用canvas转换base64内容和input上传文件方式读取base64内容。发现前者数据中丢失了exif数据，后者依然保留