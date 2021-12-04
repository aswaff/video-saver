import { writable, derived } from 'svelte/store';

export const ApiData = writable([]);

export const videoUrl = derived(ApiData, ($ApiData) => {
    if ($ApiData){
      return $ApiData.map(video => video.URL);
    }
    return [];
  });