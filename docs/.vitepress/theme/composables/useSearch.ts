import Fuse from 'fuse.js';
import { computed, Ref, unref } from 'vue';

const useSearch = <T>(
  query: Ref<string>,
  collection: Ref<T[]>,
  keys: Fuse.FuseOptionKeyObject<T>[] | Ref<Fuse.FuseOptionKeyObject<T>[]> = [],
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
