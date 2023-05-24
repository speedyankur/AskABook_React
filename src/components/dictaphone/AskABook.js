const AskABook = (msg) => {
  return fetch("http://20.76.49.54:8000/query/", {
    method: "POST",
    headers: {
      accept: "application/json",
      access_token: "egrQ9gqCZ2hKFEZrDa7F",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: msg }),
    //referrerPolicy: "unsafe_url",
  });
};

export default AskABook;
