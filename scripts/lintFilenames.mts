/**
 * 将外部 lint 输出转换为 GitHub annotation。
 * 主要用于 CI 中把文件名、行列号和错误信息转换成可点击的检查结果。
 */
import path from 'path';
import fs from 'fs';
import process from 'process';
import { spawn } from 'child_process';

const regex = /(?<file>[^:]+):(?<line>\d+):(?<column>\d+)\s-\s+(?<message>.+)/;
const fileList = process.env.CHANGED_FILES
  ? (process.env.CHANGED_FILES || '').split(' ')
  : fs.readdirSync('./icons').map((fileName) => path.join('./icons', fileName));

const cspell = spawn('npx', ['cspell', 'stdin'], { stdio: ['pipe', 'pipe', 'inherit'] });
cspell.stdin.write(fileList.join('\n'));
cspell.stdin.end();

cspell.stdout.on('data', (data) => {
  console.log(data.toString());
  data
    .toString()
    .split('\n')
    .forEach((line: string) => {
      const match = line.match(regex);
      if (match) {
        const { line, message } = match.groups ?? {};
        console.log(`::error file=${fileList[Number(line) - 1]},line=1,column=1::${message}`);
      }
    });
});

cspell.on('exit', process.exit);
