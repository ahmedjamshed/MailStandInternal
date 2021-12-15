interface Token {
  api_key: string | null;
}
export default function authToken() {
  let accessToken = {
    api_key: null,
  } as Token;
  const token = localStorage.getItem("api_key");
  try {
    if (token) {
      accessToken.api_key = JSON.parse(token);
      return accessToken;
    }
  } catch (error) {
    accessToken.api_key = null;
    return accessToken;
  }
}
