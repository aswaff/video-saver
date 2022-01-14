import { writable, derived } from 'svelte/store';

export const ApiData = writable();

export const ApiSearchData = writable([]);

export const ApiSpecificData = writable(["Empty"]);

// export const videoUrl = derived(ApiData, ($ApiData) => {
//     if ($ApiData){
//       return $ApiData.map(video => video.Thumbnail);
//     }
//     return ["Test"];
//   });

  export const checkForData = (Category) => {
    // updateSearchData(Category);
    fetch(`https://video-saver-api.herokuapp.com/search?Category=${Category}`)
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
// This is used by the homepage
  export const apiSpecificDataThumb = (data) => {
    console.log(data)
      fetch(`https://iframe.ly/api/oembed?url=${data.URL}&key=5684147d970b5663f90cfc1c15410b81`)
      .then(response => response.json())
      .then(newData => {
              doUpdate(data._id, newData.thumbnail_url)
      }).catch(error => {
          console.log(error);
          return [];
      });
  }
// Used to update thumbnails on the search page
  export const apiSearchThumbnail = (URL, id) => {
    console.log(URL)
      fetch(`https://iframe.ly/api/oembed?url=${URL}&key=5684147d970b5663f90cfc1c15410b81`)
      .then(response => response.json())
      .then(newData => {
              doUpdate(id, newData.thumbnail_url)
      }).catch(error => {
          console.log(error);
          return [];
      });
  }


//   export const updateSearchData = (Category) => {
//     fetch(`https://video-saver-api.herokuapp.com/search?Category=${Category}`)
//     .then(response => response.json())
//     .then(data => {
//             apiSearchDataThumb(data)
//     }).catch(error => {
//         console.log(error);
//         return [];
//     }); 
// }

async function doUpdate (id, thumbnail) {
  const res = await fetch(`https://video-saver-api.herokuapp.com/tasks/${id}`, {
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