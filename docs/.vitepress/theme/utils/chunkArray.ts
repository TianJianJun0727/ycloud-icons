const chunkArray = <T>(stream: T[], size: number) => {
  return stream.reduce<T[][]>(
    (chunks, item, idx, arr) =>
      idx % size == 0 ? [...chunks, arr.slice(idx, idx + size)] : chunks,
    [],
  );
};

export default chunkArray;
