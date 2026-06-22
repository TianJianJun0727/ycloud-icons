/**
 * 提供发布流程使用的日期时间格式化工具。
 * 当前统一输出 Asia/Shanghai 时区下的可读时间。
 */
export function formatShanghaiDateTime(isoDateTime: string) {
  const parts = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
    .formatToParts(new Date(isoDateTime))
    .reduce<Record<string, string>>((result, part) => {
      result[part.type] = part.value;
      return result;
    }, {});

  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} (UTC+08:00)`;
}
