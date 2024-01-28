import fetchWithTimeout from '@gluons/react-native-fetch-with-timeout';

export async function myConnGet(url) {
  let transaction = { state: false };
  try {
    const response = await fetchWithTimeout(
      url,{},
      { timeout: 6000 }
    );
    const json = await response.json();
    transaction.json = json;
    if (response.ok && response.status >= 200 && response.status <= 299) {
      transaction.state = true;
    }
  } catch (err) {
    transaction.err = err;
  }
  return transaction;
}

export async function myConnPut(url, body) {
  let transaction = { state: false };
  try {
    const response = await fetchWithTimeout(
      url,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
      { timeout: 6000 }
    );
    const json = await response.json();
    transaction.json = json;
    if (response.ok && response.status >= 200 && response.status <= 299) {
      transaction.state = true;
    }
  } catch (err) {
    transaction.err = err;
  }
  return transaction;
}

export async function myConnPost(url, obj) {
  let transaction = { state: false };
  try {
    const response = await fetchWithTimeout(
      url,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
      },
      { timeout: 6000 }
    );
    const json = await response.json();
    transaction.json = json;
    if (response.ok && response.status >= 200 && response.status <= 299) {
      transaction.state = true;
    }
  } catch (err) {
    transaction.err = err;
  }
  return transaction;
}
