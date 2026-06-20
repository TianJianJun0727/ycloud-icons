import Fuse from 'fuse.js';
import { computed, Ref, unref } from 'vue';

type SearchKey<T> =
  | string
  | string[]
  | {
      name: string | string[];
      weight?: number;
      getFn?: (obj: T) => ReadonlyArray<string> | string | null | undefined;
    };

const useSearch = <T>(
  query: Ref<string>,
  collection: Ref<T[]>,
  keys: SearchKey<T>[] | Ref<SearchKey<T>[]> = [],
) => {
  const index = computed(() => {
    return new Fuse(collection.value, {
      threshold: 0.2,
      keys: unref(keys),
    });
  });

  const results = computed(() => {
    if (query.value) {
      return index.value.search(query.value).map((result) => result.item);
    }

    return collection.value;
  });

  return results;
};

export default useSearch;
