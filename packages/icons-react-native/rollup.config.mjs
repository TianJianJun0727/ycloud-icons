import plugins from '@ycloud-web/rollup-plugins';
import dts from 'rollup-plugin-dts';
import pkg from './package.json' with { type: 'json' };
import getDeclarationEntries from './scripts/getDeclarationEntries.mts';

const packageName = 'YCloudReact';
const outputFileName = 'icons';
const outputDir = 'dist';
const businessInput = 'src/business.ts';
const illustrationInput = 'src/illustration.ts';
const inputs = [
  'src/ycloud-react-native.ts',
  'src/icons/index.ts',
  businessInput,
  illustrationInput,
];
const entryFileNameMap = {
  'ycloud-react-native': 'icons',
  business: 'business-icons',
  illustration: 'illustration-icons',
};
const runtimeEntryNames = new Set([
  'Icon',
  'context',
  'createYCloudIcon',
  'defaultAttributes',
  'types',
]);
const getEntryFileName = (chunkInfo, extension) => {
  const entryName = entryFileNameMap[chunkInfo.name];

  if (entryName) {
    return `${entryName}.${extension}`;
  }

  if (runtimeEntryNames.has(chunkInfo.name)) {
    return `runtime/${chunkInfo.name}.${extension}`;
  }

  return `${chunkInfo.name}.${extension}`;
};
const bundles = [
  {
    format: 'cjs',
    inputs,
    outputDir,
    preserveModules: true,
  },
  {
    format: 'esm',
    inputs,
    outputDir,
    preserveModules: true,
    extension: 'mjs',
  },
];

const declarationFamilies = [
  {
    input: await getDeclarationEntries('src/icons'),
    outputDir: 'dist/types/icons',
    typesModuleMatcher: /[/\\]src[/\\]types\.(d\.)?ts$/,
    typesModulePath: '../icons.js',
  },
  {
    input: await getDeclarationEntries('src/business-icons'),
    outputDir: 'dist/types/business-icons',
    typesModuleMatcher: /[/\\]src[/\\]businessTypes\.(d\.)?ts$/,
    typesModulePath: '../business-icons.js',
  },
  {
    input: await getDeclarationEntries('src/illustration-icons'),
    outputDir: 'dist/types/illustration-icons',
    typesModuleMatcher: /[/\\]src[/\\]illustrationTypes\.(d\.)?ts$/,
    typesModulePath: '../illustration-icons.js',
  },
];

const configs = bundles
  .map(({ inputs, outputDir, format, preserveModules, extension = 'js' }) =>
    inputs.map((input) => ({
      input,
      plugins: plugins({ pkg }),
      external: ['react', 'react-native-svg'],
      output: {
        name: packageName,
        ...(preserveModules
          ? {
              dir: `${outputDir}/${format}`,
              exports: format === 'cjs' ? 'named' : undefined,
              entryFileNames: (chunkInfo) => getEntryFileName(chunkInfo, extension),
            }
          : {
              file: `${outputDir}/${format}/${outputFileName}.${extension}`,
            }),
        format,
        preserveModules,
        preserveModulesRoot: 'src',
        sourcemap: true,
        globals: {
          react: 'react',
          'react-native-svg': 'react-native-svg',
        },
      },
    })),
  )
  .flat();

export default [
  {
    input: inputs[0],
    output: [
      {
        file: `dist/types/${outputFileName}.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  {
    input: businessInput,
    output: [
      {
        file: `dist/types/business-icons.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  {
    input: illustrationInput,
    output: [
      {
        file: `dist/types/illustration-icons.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  ...declarationFamilies.map(({ input, outputDir, typesModuleMatcher, typesModulePath }) => ({
    input,
    external: [typesModuleMatcher],
    output: {
      format: 'es',
      dir: outputDir,
      entryFileNames: '[name].d.ts',
      paths: (id) => (typesModuleMatcher.test(id) ? typesModulePath : id),
    },
    plugins: [dts()],
  })),
  ...configs,
];
