import { writable, derived } from 'svelte/store';

export const ApiData = writable(["Test"]);

export const videoUrl = derived(ApiData, ($ApiData) => {
    if ($ApiData){
      return $ApiData.map(video => video.HTML);
    }
    return ["Test"];
  });

  // export const videoUrl = derived(ApiData, ($ApiData) => {
  //   if ($ApiData){
  //     return $ApiData.map(video => video.URL);
  //   }
  //   return ["Test"];
  // });