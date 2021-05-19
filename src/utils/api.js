// API methods
const getPhotos = () => {
  return fetch('https://jsonplaceholder.typicode.com/photos?_limit=300')
    .then(res => res.ok ? res : Promise.reject(res))
    .then(async data => {
      const result = await data.json();
      console.log('getPhotos success: ', data, result);
      return result;
    })
    .catch(() => {
      console.log('getPhotos has some error...');
      return [];
    });
}

const api = {
  getPhotos
}

export default api
