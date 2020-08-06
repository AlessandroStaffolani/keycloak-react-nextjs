import axios from 'axios';

const USER_ACCESS_TOKEN = 'userAccessToken'

export async function check_storage_token() {
  const access_token = localStorage.getItem(USER_ACCESS_TOKEN)
  if (access_token !== undefined && access_token !== null) {
    const requestBody = {
      token: access_token
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const url = '/api/auth/token/verify'
    try {
      const response = await axios.post(url, requestBody, config);
      return response.data
    } catch (err) {
      return false
    }
  } else {
    return false
  }
}

export async function get_access_token(username, password) {
  const check_value = await check_storage_token();
  if (check_value.isValid) {
    return check_value.token
  }

  const requestBody = {
    username,
    password,
  }
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const url = '/api/auth/login'
  try {
    const response = await axios.post(url, requestBody, config);
    localStorage.setItem(USER_ACCESS_TOKEN, response.data.access_token)
    console.log(response.data)
    return response.data.access_token
  } catch (err) {
    console.log(err)
    return null
  }

}

