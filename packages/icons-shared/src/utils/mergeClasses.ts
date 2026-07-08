/**
 * Merges classes into a single string
 *
 * @param {array} classes
 * @returns {string} A string of classes
 */
export const mergeClasses = <ClassType = string | undefined | null>(...classes: ClassType[]) => {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const className of classes) {
    if (className && typeof className === 'string') {
      const trimmed = className.trim();
      if (trimmed !== '' && !seen.has(trimmed)) {
        seen.add(trimmed);
        result.push(trimmed);
      }
    }
  }

  return result.join(' ');
};
