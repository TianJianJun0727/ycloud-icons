import svgtofont from 'svgtofont';
import { type CodePoints } from './allocateCodepoints.ts';

interface BuildFontOptions {
  inputDir: string;
  targetDir: string;
  fontName: string;
  classNamePrefix: string;
  codePoints: CodePoints;
  startUnicode: number;
}

export async function buildFont({
  inputDir,
  targetDir,
  fontName,
  classNamePrefix,
  codePoints,
  startUnicode,
}: BuildFontOptions) {
  console.time('Font generation');
  try {
    await svgtofont({
      src: inputDir,
      dist: targetDir,
      fontName,
      classNamePrefix,
      css: {
        fontSize: 'inherit',
      },
      emptyDist: true,
      useCSSVars: false,
      outSVGReact: false,
      outSVGPath: false,
      addLigatures: true,
      svgicons2svgfont: {
        fontHeight: 1000, // At least 1000 is recommended
        normalize: false,
      },
      generateInfoData: true,
      website: {
        title: 'YCloud',
        logo: undefined,
        meta: {
          description: 'YCloud icons as TTF/EOT/WOFF/WOFF2/SVG.',
          keywords: 'YCloud,TTF,EOT,WOFF,WOFF2,SVG',
        },
        corners: {
          url: 'https://github.com/TianJianJun0727/ycloud-icons',
          width: 62, // default: 60
          height: 62, // default: 60
          bgColor: '#dc3545', // default: '#151513'
        },
        links: [
          {
            title: 'GitHub',
            url: 'https://github.com/TianJianJun0727/ycloud-icons',
          },
          {
            title: 'Feedback',
            url: 'https://github.com/TianJianJun0727/ycloud-icons/issues',
          },
          {
            title: 'Font Class',
            url: 'index.html',
          },
          {
            title: 'Unicode',
            url: 'unicode.html',
          },
        ],
      },
      getIconUnicode: (name: string) => {
        if (!codePoints[name]) {
          throw new Error(`No codepoint found for icon: ${name}`);
        }

        const unicode = codePoints[name];
        return [String.fromCharCode(unicode), startUnicode];
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.timeEnd('Font generation');
}
