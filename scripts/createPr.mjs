import { execFileSync, spawnSync } from 'node:child_process';
import configConventional from '@commitlint/config-conventional';
import lint from '@commitlint/lint';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { parseArgs } from 'node:util';

const allowedTypes = [
  'fix',
  'feat',
  'perf',
  'refactor',
  'test',
  'style',
  'docs',
  'ci',
  'build',
  'chore',
];
const titleRules = {
  ...configConventional.rules,
  'scope-empty': [2, 'never'],
  'type-enum': [2, 'always', allowedTypes],
};

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    encoding: 'utf8',
    ...options,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

const getCurrentBranch = () =>
  execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim();

const args = process.argv.slice(2);
if (args[0] === '--') {
  args.shift();
}

const { values } = parseArgs({
  args,
  options: {
    title: { type: 'string' },
    base: { type: 'string', default: 'main' },
    head: { type: 'string' },
    description: { type: 'string' },
    'body-file': { type: 'string' },
    verification: { type: 'string', multiple: true },
    draft: { type: 'boolean', default: false },
    'dry-run': { type: 'boolean', default: false },
  },
});

if (!values.title) {
  fail('Missing --title. Expected format: <type>(<scope>): <short description>');
}

const titleLintResult = await lint(values.title, titleRules);

if (!titleLintResult.valid) {
  const errors = titleLintResult.errors.map((error) => `- ${error.message}`).join('\n');
  fail(
    [
      'Invalid PR title. Expected format: <type>(<scope>): <short description>',
      `Allowed types: ${allowedTypes.join(', ')}`,
      errors,
    ].join('\n'),
  );
}

const head = values.head ?? getCurrentBranch();

if (!head) {
  fail('Could not infer the current branch. Pass --head explicitly.');
}

let body = '';

if (values['body-file']) {
  const bodyFile = path.resolve(values['body-file']);

  if (!existsSync(bodyFile)) {
    fail(`Body file does not exist: ${bodyFile}`);
  }

  body = readFileSync(bodyFile, 'utf8');
} else {
  if (!values.description) {
    fail('Missing --description. Pass --description or --body-file.');
  }

  const verification = values.verification ?? ['Not run.'];

  body = [
    '## Description',
    '',
    values.description.trim(),
    '',
    '## Verification',
    '',
    ...verification.map((item) => `- \`${item}\``),
    '',
  ].join('\n');
}

if (body.includes('\\n')) {
  fail('PR body contains literal "\\n". Use real newlines or pass --body-file.');
}

if (!body.trim()) {
  fail('PR body cannot be empty.');
}

const tmpFile = path.join(
  tmpdir(),
  `ycloud-icons-pr-${Date.now()}-${Math.random().toString(16).slice(2)}.md`,
);
writeFileSync(tmpFile, body);

const ghArgs = [
  'pr',
  'create',
  '--base',
  values.base,
  '--head',
  head,
  '--title',
  values.title,
  '--body-file',
  tmpFile,
];

if (values.draft) {
  ghArgs.push('--draft');
}

if (values['dry-run']) {
  console.log(`gh ${ghArgs.join(' ')}`);
  console.log('');
  console.log(body);
  process.exit(0);
}

run('gh', ghArgs);
