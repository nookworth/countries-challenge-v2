export const useGetCountryPic = (country: string) => {
  const baseURI = 'https://api.unsplash.com/'
  const photosURI = '/search/photos'
  const accessKey = '4QEWFRFu7YtM-2LYhFl2J5vxbSy2Xup-QFlYOWsI-Io'
  let imageObject, altText;
  fetch(
    `${baseURI}${photosURI}?query=${country}&per_page=1&orientation=squarish&client_id=${accessKey}`
  )
    .then(response => response.json())
    .then(
      data => (
        console.log('data: ', data),
        (imageObject = data?.results[0]?.urls),
        (altText =
          data?.results[0]?.alt_description ??
          data?.results[0]?.description)
      )
    )
  const imageLink = imageObject && Object.values(imageObject)[3]
  console.log('desc: ', altText, 'link: ', imageLink)
  return {altText, imageLink}
}