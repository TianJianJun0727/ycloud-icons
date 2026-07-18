type IllustrationDefinitionNode =
  | readonly [tag: string, attrs: Record<string, string>]
  | readonly [
      tag: string,
      attrs: Record<string, string>,
      children: readonly IllustrationDefinitionNode[],
    ];

interface IllustrationDefinition {
  name: string;
  attrs: Record<string, string>;
  node: readonly IllustrationDefinitionNode[];
}

export const saleSmartlyIllustration: IllustrationDefinition = {
  name: 'sale-smartly',
  attrs: {
    width: '162',
    height: '29',
    viewBox: '0 0 162 29',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  },
  node: [
    ['rect', { y: '0.556641', width: '161.802', height: '28', fill: 'url(#pattern0_19972_14745)' }],
    [
      'defs',
      {},
      [
        [
          'pattern',
          {
            id: 'pattern0_19972_14745',
            patternContentUnits: 'objectBoundingBox',
            width: '1',
            height: '1',
          },
          [
            [
              'use',
              { 'xlink:href': '#image0_19972_14745', transform: 'scale(0.001321 0.00763359)' },
            ],
          ],
        ],
        [
          'image',
          {
            id: 'image0_19972_14745',
            width: '757',
            height: '131',
            'xlink:href':
              'data:image/png;base64,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',
          },
        ],
      ],
    ],
  ],
};

export default saleSmartlyIllustration;
