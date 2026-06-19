import { readFile } from 'node:fs/promises';
import { fileURLToPath, URL } from 'node:url';
import { getChangelogAnchor, listReleaseEntries } from '../../../utils/changelog';

export default {
  async load() {
    const packageJsonPath = fileURLToPath(
      new URL('../../../../../packages/ycloud-react/package.json', import.meta.url),
    );
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8')) as { version: string };
    const releases = listReleaseEntries();
    const latestRelease = releases[0];
    const latestVersion = latestRelease?.version || packageJson.version;
    const latestVersionDate = latestRelease?.date || new Date().toISOString().slice(0, 10);

    return {
      version: latestVersion,
      changelogHref: `/changelog#${getChangelogAnchor(latestVersion, latestVersionDate)}`,
      installationHref: '/guide/installation',
    };
  },
};
