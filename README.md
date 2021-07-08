本工具是一个命令行图片压缩工具，支持一键压缩 png 格式图片，输出 png/webp 格式图片。

## 安装

```
npm install -g imagemin-cli-lazy
```

## 使用

### 常用

- **批量压缩**

  - `imgmin all`: 压缩当前目录下所有的图片（支持的类型），默认输出到当前 `min` 目录下。
  - `imgmin all -r`: 压缩当前目录和子目录下所有的图片，默认输出到当前 `min` 目录下。
  - `imgmin all -t webp png`: 压缩当前目录下所有的图片，输出webp和png两种格式，默认输出到当前 `min` 目录下。

- **压缩单张图片**

  - `imgmin one -i /path/to/image`: 压缩指定路径的图片，输出格式不变，默认输出到当前 `min` 目录下。
  - `imgmin one -i /path/to/image -o ./images`: 压缩指定路径的图片，输出格式不变，输出到当前 `images` 目录下。
  - `imgmin one -i /path/to/image.png -t webp png`: 压缩指定路径的图片，输出webp和png两种格式，默认输出到当前 `min` 目录下。

### 指定压缩质量

默认的质量参数配置可以满足大部分情况，若你对输出的图片质量不太满意，可以通过以下配置来改变输出图片的质量：

- 输出格式为 `png` 时，可通过选项 `-pq min max` 配置，`min` 和 `max` 值在（最差）0~1（最好）之间，压缩时会尽量使用最少的颜色以满足或超过 `max` 的质量，当压缩结果质量低于 `min` 时，压缩结果不会保存，默认是 `0.6 0.8`。

```
imgmin one -i /path/to/image -t png -pq 0.8 0.9
```

- 输出格式为 `webp` 时，可通过选项 `-wq quality` 配置，`quality` 值在 （最差）0~1（最好）之间，默认是 `0.75`

```
imgmin all -t png webp -pq 0.8 0.9 -wq 0.9
```

## 支持情况

- 支持输入 png 格式图片
- 支持输出 png webp 格式图片