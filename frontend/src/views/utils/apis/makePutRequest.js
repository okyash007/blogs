export async function makePutRequest(url, body) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      credentials: "include",
      Authorization: localStorage.getItem("acess_token"),
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
