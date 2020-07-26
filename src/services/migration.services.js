import authentication from '../b2c';

async function request(uri, method = 'GET', body = null) {
  const token = await authentication.getAccessToken();
  const postOptions = body ? { body: JSON.stringify(body) } : {};

  return await fetch(uri, {
    method,
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      'Content-Type': 'application/json'
    },
    ...postOptions
  });
}

class MigrationService {
  BASE_URL = 'http://localhost:44310/api'; //`${window.location.origin}/api`

  get = async path => {
    const uri = `${this.BASE_URL}${path}`;

    const res = await request(uri);

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${uri}`);
    }

    return await res.json();
  };

  put = async (path, body) => {
    const uri = `${this.BASE_URL}${path}`;

    const res = await fetch(uri, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${uri}`);
    }

    return await res.json();
  };

  post = async (path, body) => {
    const uri = `${this.BASE_URL}${path}`;

    const res = await request(uri, 'POST', body);

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${uri}`);
    }

    return await res.json();
  };

  postStep = async (path, body) => {
    const uri = `${this.BASE_URL}${path}`;

    const res = await request(uri, 'POST', body);

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${uri}`);
    }

    return true;
  };

  delete = async path => {
    const uri = `${this.BASE_URL}${path}`;

    const res = await request(uri, 'DELETE');

    if (!res.ok) {
      throw new Error(`Couldn't delete ${uri}`);
    }

    return true;
  };

  validate = async (path, body) => {
    const uri = `${this.BASE_URL}${path}`;

    const res = await request(uri, 'POST', body);

    if (!res.ok) {
      try {
        const { message } = await res.json();

        return {
          status: 'error',
          message
        };
      } catch {
        throw new Error(`Couldn't fetch ${uri}`);
      }
    }

    const { message } = await res.json();

    return {
      status: 'success',
      message
    };
  };
}

export default new MigrationService();
