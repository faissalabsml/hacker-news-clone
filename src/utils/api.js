const api = "https://hacker-news.firebaseio.com/v0/";
const json = ".json?print=pretty";

export function getItem(id) {
  return fetch(`${api}item/${id}${json}`).then((response) => {
    if (!response.ok) {
      throw new Error("Something wrong happened, please try again");
    }

    return response.json();
  });
}

export function getUser(id) {
  return fetch(`${api}user/${id}${json}`).then((response) => {
    if (!response.ok) {
      throw new Error("Something wrong happened, please try again");
    }

    return response.json();
  });
}

export function getStories(type) {
  return fetch(`${api}/${type}${json}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Sorry, there was an error while fetching the ${type} posts`
        );
      }

      return response.json();
    })
    .then((ids) => ids.slice(0, 100))
    .then((ids) => Promise.all(ids.map(getItem)));
}
