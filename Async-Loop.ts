/////////// Looping through ab array asynchronously


//////// array.map //////////

const Funct = async () => {
  let characterResponse = await fetch('http://swapi.co/api/people/2/')
  let characterResponseJson = await characterResponse.json()
  let films = await Promise.all(
    characterResponseJson.films.map(async filmUrl => {
      let filmResponse = await fetch(filmUrl)
      return filmResponse.json()
    })
  )
  console.log(films)
}

fetch('http://swapi.co/api/people/2/')
  .then(characterResponse => characterResponse.json())
  .then(characterResponseJson => {
    Promise.all(
      characterResponseJson.films.map(filmUrl =>
        fetch(filmUrl).then(filmResponse => filmResponse.json())
      )
    ).then(films => {
      console.log(films)
    })
  })
