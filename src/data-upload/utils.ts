import fetch from 'node-fetch';

export const fetchData = async <ResultType>(
  endpoint: string,
  token: string
): Promise<ResultType> => {
  let body;
  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    body = await response.json();
  } catch (err) {
    console.error(`Error fetchin data for ${endpoint} |`, err);
  }
  // node-fetch does not support generics
  return body as ResultType;
};
