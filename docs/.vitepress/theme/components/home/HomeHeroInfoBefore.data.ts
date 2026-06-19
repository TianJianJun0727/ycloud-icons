import { readFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { fileURLToPath, URL } from 'node:url';

export default {
  async load() {
    const packageJsonPath = fileURLToPath(
      new URL('../../../../../packages/ycloud-react/package.json', import.meta.url),
    );
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8')) as { version: string };
    let latestVersion = packageJson.version;

    try {
      latestVersion = execSync("git tag --list 'v*' --sort=-version:refname | head -1", {
        cwd: fileURLToPath(new URL('../../../../../', import.meta.url)),
        encoding: 'utf-8',
      })
        .trim()
        .replace(/^v/, '') || packageJson.version;
    } catch {
      latestVersion = packageJson.version;
    }

    return {
      version: latestVersion,
    };
  },
};
