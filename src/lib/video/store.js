import { writable, derived } from 'svelte/store';

export const ApiData = writable(["Test"]);

export const ApiSearchData = writable(["Empty"]);

export const ApiSpecificData = writable(["Empty"]);

export const videoUrl = derived(ApiData, ($ApiData) => {
    if ($ApiData){
      return $ApiData.map(video => video.HTML);
    }
    return ["Test"];
  });

  export const checkForData = (Category) => {
    // updateSearchData(Category);
    fetch(`http://192.168.0.16:5000/search?Category=${Category}`)
            .then(response => response.json())
            .then(data => {
                    ApiSearchData.set(data)
            }).catch(error => {
                console.log(error);
                return [];
            });
    
  }

  // derived(ApiSearchData, ($ApiSearchData) 
  export const apiSearchDataThumb = (data) => {
    console.log(data)
    data.map(video =>
      fetch(`https://iframe.ly/api/oembed?url=${video.URL}&key=5684147d970b5663f90cfc1c15410b81`)
      .then(response => response.json())
      .then(newData => {
              doUpdate(video._id, newData.thumbnail_url)
      }).catch(error => {
          console.log(error);
          return [];
      }));
  }



  export const updateSearchData = (Category) => {
    fetch(`http://192.168.0.16:5000/search?Category=${Category}`)
    .then(response => response.json())
    .then(data => {
            apiSearchDataThumb(data)
    }).catch(error => {
        console.log(error);
        return [];
    }); 
}

async function doUpdate (id, thumbnail) {
  
  const res = await fetch(`http://192.168.0.16:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
          "Content-Type": "application/json",
      },
    body: JSON.stringify({ Thumbnail: thumbnail})
    
  })
}


  // export const videoUrl = derived(ApiData, ($ApiData) => {
  //   if ($ApiData){
  //     return $ApiData.map(video => video.URL);
  //   }
  //   return ["Test"];
  // });