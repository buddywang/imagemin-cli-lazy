const fs = require('fs')

// 支持压缩的目标图片类型
const supportType = ['png', 'webp']


/**
 * 参数处理
 * @param {object} options commander接收的配置
 * @param {string} type 单个压缩/全部压缩
 * @returns 最终输出的配置
 */
function checkArguments(options, type) {
  const imgminOpt = {
    inputDir: '',
    outputDir: '',
    outputType: new Set(),
    pngquality: [0.6, 0.8],
    webpquality: 75,
    recursion: false
  };
  // 默认的输出类型
  let defaultType = 'png'
  if(options.input){
    const stats = fs.lstatSync(options.input, {throwIfNoEntry: false})
    if(stats){
      if(stats.isFile() && /png/.test(options.input)){
        const temp = options.input.split('.')
        defaultType = temp[temp.length-1]
        imgminOpt.inputDir = options.input
      }else{
        // 不支持输入图片类型
        console.log(`error: don't support the input image type, only support .png`);
        process.exit(1)
      }
    }else{
      // 找不到图片
      console.log(`error: can't find the image with path '${options.input}'`);
      process.exit(1)
    }
  }else{
    if(type === 'one'){
      console.log(`error: option '-i, --input <input>' missing`);
      process.exit(1)
    }
  }
  if(options.output){
    imgminOpt.outputDir = options.output
  }
  if(options.type){
    options.type.forEach(item => {
      if(supportType.includes(item)){
        imgminOpt.outputType.add(item)
      }else{
        // 无效输入
        console.log(`error: don't support the '${item}' image type`);
        process.exit(1)
      }
    });
  }else{
    // 默认输出 输入图片 的类型
    imgminOpt.outputType.add(defaultType)
  }
  if(options.pngquality){
    options.pngquality = options.pngquality.map(item=>Number(item))
    if(options.pngquality.length===2
      && isQualityValid(options.pngquality[0])
      && isQualityValid(options.pngquality[1])
      && options.pngquality[0]<options.pngquality[1]){
      imgminOpt.pngquality = options.pngquality
    }else{
      // 无效输入
      console.log(`error: invalid input '${options.pngquality.join(' ')}'`);
      process.exit(1)
    }
  }
  if(options.webpquality){
    if(isQualityValid(options.webpquality)){
      imgminOpt.webpquality = options.webpquality*100
    }else{
      // 无效输入
      console.log(`error: invalid input '${options.webpquality}'`);
      process.exit(1)
    }
  }
  if(options.recursion){
    imgminOpt.recursion = options.recursion
  }
  return imgminOpt
}

// 质量参数是否有效
function isQualityValid(q) {
	return q>=0&&q<=1;
}

module.exports = {
  checkArguments
}