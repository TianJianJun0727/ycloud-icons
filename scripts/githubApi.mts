/**
 * 轻量 GitHub API 请求封装。
 * 通过 GITHUB_API_KEY 访问 GitHub 接口，供历史脚本读取远程仓库数据。
 */
const githubApi = async (endpoint: string) => {
  const headers = new Headers();
  const username = 'ericfennis';
  const password = process.env.GITHUB_API_KEY;

  headers.set(
    'Authorization',
    `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
  );

  const res = await fetch(endpoint, {
    method: 'GET',
    headers,
  });

  return res.json();
};

export default githubApi;
