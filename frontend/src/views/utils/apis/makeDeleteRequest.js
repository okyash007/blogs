export async function makeDeleteRequest(url, body) {
  const options = {
    method: "DELETE",
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
