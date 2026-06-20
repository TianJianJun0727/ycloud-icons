import { getViteConfig } from "astro/config";
import type { ConfigEnv, PluginOption } from "vite";
import type { ViteUserConfig } from "vitest/config";
import { astroTestConfig } from "./tests/utils/astroConfig";

const astroViteConfig = getViteConfig(
  {
    ...astroTestConfig,
    // @ts-expect-error: types of this functions aren't correct
    test: {
      environment: "node",
      globals: true,
      setupFiles: "./tests/setupVitest.js",
    },
  } satisfies ViteUserConfig,
  {
    // disable to remove irrelevant data-astro-* attributes
    devToolbar: {
      enabled: false,
    },
  },
);

function removeDevToolbarPlugin(plugins: PluginOption | PluginOption[] | undefined) {
  if (!Array.isArray(plugins)) return plugins;

  return plugins
    .map((plugin) => (Array.isArray(plugin) ? removeDevToolbarPlugin(plugin) : plugin))
    .filter((plugin) => !plugin || typeof plugin !== "object" || plugin.name !== "astro:dev-toolbar");
}

export default async (env: ConfigEnv) => {
  const config = await astroViteConfig(env);

  return {
    ...config,
    plugins: removeDevToolbarPlugin(config.plugins),
  };
};
