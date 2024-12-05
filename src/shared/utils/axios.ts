import axios from 'axios';

export async function sendPostRequest(url: string, data: any, headers: any) {
  try {
    headers['Content-Type'] = 'application/json';
    const response = await axios.post(url, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log('error', error?.message);
  }
}
