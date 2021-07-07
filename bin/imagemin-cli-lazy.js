#!/usr/bin/env node

const fs = require('fs');
const commander = require('commander');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminPngquant = require('imagemin-pngquant');
const { checkArguments } = require('./util')

process.on('beforeExit', (code) => {
  if(code!==1){
    console.log('success!');
  }
});

// 支持的压缩插件
let typeMap;

const program = new commander.Command();
program.version('0.0.1');
program.name('imgmin');

program
  .command('one')
  .option('-i, --input <input>', 'the image\'s path that need to compress')
  .option('-o, --output <output>', 'the directory path to output the result', `./min`)
  .option('-t, --type <type...>', `the image\'s type to generate, choose from [webp, png], default the source's type`)
  .option('-pq, --pngquality <pngquality...>', `set png quality factor between 0 and 1`, [0.6, 0.8])
  .option('-wq, --webpquality <webpquality>', `set webp quality factor between 0 and 1`, 0.75)
  .action((options)=>{
    const imgminOpt = checkArguments(options, 'one')
    // console.log('one', imgminOpt);
    if(imgminOpt.inputDir){
      typeMap = {
        'png': imageminPngquant({
          quality: imgminOpt.pngquality,
          strip: true
        }),
        'webp': imageminWebp({quality: imgminOpt.webpquality})
      }
      // 压缩单张图片
      console.log('minning...');
      minImg(imgminOpt.inputDir, imgminOpt.outputDir, imgminOpt.outputType)
    }
  }) 
  
program
  .command('all')
  .option('-r, --recursion', `enable to compress all the image in current directory and sub-directory`, false)
  .option('-o, --output <output>', 'the directory path to output the result', `./min`)
  .option('-t, --type <type...>', `the image\'s type to generate, choose from [webp, png], default the source's type`)
  .option('-pq, --pngquality <pngquality...>', `set png quality factor between 0 and 1`, [0.6, 0.8])
  .option('-wq, --webpquality <webpquality>', `set webp quality factor between 0 and 1`, 0.75)
  .action((options)=>{
    const imgminOpt = checkArguments(options, 'all')
    // console.log('all', imgminOpt);
    typeMap = {
      'png': imageminPngquant({
        quality: imgminOpt.pngquality,
        strip: true
      }),
      'webp': imageminWebp({quality: imgminOpt.webpquality})
    }
    // 压缩全部图片
    if(imgminOpt.recursion){
      // 递归压缩子目录时只允许定义目录名，不能定义路径
      let outdir = imgminOpt.outputDir
      outdir = outdir.split(/[/,\\]/)
      outdir = outdir[outdir.length-1]
      // 递归压缩全部图片
      console.log('minning...');
      minAllImgRecursion('.', outdir, imgminOpt.outputType)
    }else{
      console.log('minning...');
      minAllImg('.', imgminOpt.outputDir, imgminOpt.outputType)
    } 
  })

program.parse();


// 压缩单张图片
function minImg(dir='./*.png', outputdir='./min', outputtype=['png']) {
	outputtype.forEach(async item => {
		if(typeMap[item]){
			await imagemin([dir.replace(/\\/g,'/')], {
				destination: outputdir.replace(/\\/g,'/'),
				plugins: [
					typeMap[item]
				]
			})
		}
	})
	// console.log(files.length);
}

// 压缩给定目录下所有的图片
function minAllImg(dir='.', outputdir='min', outputtype=['png']) {
  // 针对各个outputtype输出不同类型的图片
  outputtype.forEach(async item => {
    await imagemin([`${dir}/*.png`], {
      destination: `${dir}/${outputdir}`,
      plugins: [
        typeMap[item]
      ]
    })
  })
}

// 压缩给定目录下所有的图片（包括子目录）
function minAllImgRecursion(dir='.', outputdir='min', outputtype=['png']) {
  const files = fs.readdirSync(dir)
  minAllImg(dir, outputdir, outputtype)
  // 递归压缩子目录里的图片
  const dirArr = files.filter(item => !item.includes('.'))
  // console.log(dirArr);
  dirArr.length && dirArr.forEach(item => {
    const subdir = `${dir}/${item}`
    // console.log(subdir);
    if(item!==outputdir){
      minAllImgRecursion(subdir, outputdir, outputtype)
    }
  });
}