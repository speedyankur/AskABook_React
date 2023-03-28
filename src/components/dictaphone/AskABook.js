const AskABook = (msg) => {
  const url = "https://askabook.azurewebsites.net/api/question?query=" + msg;
  return fetch(url);
};

export default AskABook;
