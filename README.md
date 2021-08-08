[中文](./README.zh.md) | [English](./README.md)

This tool is a cli tool for images compression which supports transform `.png` to `.png` or `.webp`.

## Install

```
npm install -g imagemin-cli-lazy
```

## Usage

### Common case

- **Compress more**

  - `imgmin all`: compress all the images(support type) in the current directory, default output to the `min` directory in current.
  - `imgmin all -r`: compress all the images(support type) in the current directory and sub-directory, default output to the `min` directory in current.
  - `imgmin all -t webp png`: compress all the images(support type) in the current directory and transform them to `.png` and `.webp`, default output to the `min` directory in current.

- **Compress one**

  - `imgmin one -i /path/to/image`: compress the specific path of a image, keep it's suffix, default output to the `min` directory in current.
  - `imgmin one -i /path/to/image -o ./images`: compress the specific path of a image, keep it's suffix, output to the `images` directory in current.
  - `imgmin one -i /path/to/image.png -t webp png`: compress the specific path of a image, transform to `.png` and `.webp`, default output to the `min` directory in current.

### Specify the quality of compression

In common case, the default setting can almost fit the compression jobs, but if you want to improve the quality of the images, there is a way:

- when transform to `.png`, add the setting `-pq min max`, where min and max are between 0 and 1, this means it will use the least amount of colors required to meet or exceed the max quality. If conversion results in quality below the min quality the image won't be saved, default `0.6 0.8`.

```
imgmin one -i /path/to/image -t png -pq 0.8 0.9
```

- when transform to `.webp`, add the setting `-wq quality`, where quality between 0(worst) and 1(best), default `0.75`.

```
imgmin all -t png webp -pq 0.8 0.9 -wq 0.9
```

## Note

- support to input `.png`
- support to transform to `.png` and `.webp`