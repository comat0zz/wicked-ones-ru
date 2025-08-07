import gulp from 'gulp';
import {config} from '../config.mjs';
import {plugins} from '../plugins.mjs';
import {readdir} from 'node:fs/promises';
import {join} from 'node:path';

const walk = async (dirPath) => Promise.all(
  await readdir(dirPath, { withFileTypes: true }).then((entries) => entries.map((entry) => {
    const childPath = join(dirPath, entry.name);
    return entry.isDirectory() ? walk(childPath) : childPath;
  }))
)

export const genTemplatesPath = async () => {
  const allFiles = await walk(config.templates);
  const flatList = allFiles.flat(Number.POSITIVE_INFINITY);
  let files = [];
  const tplLength = config.templates.length - config.rootFldr.length - 1; 
  flatList.forEach(function(file, i, arr){
    let ext = file.split('.').pop();
    if(config.tplExts.indexOf(ext) >= 0){
      let line = file.slice(tplLength);
      console.log("'" + line + "',")
    }
  });
};