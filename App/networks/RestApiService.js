import {
  Alert,
} from 'react-native';

export async function sendGetRequest(url){
  console.log("Url "+url);
    let responses = await fetch(url)
    .then((response) => {return createProperResponse(response)})
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
    return responses;
}


export async function sendPostRequest(url, body){
  console.log("Url "+url);
  console.log("Data Payload "+JSON.stringify(body));
  let responses = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: body,
  }).then((response) => {return response.json()})
    .then((responseJson) => {
      console.log("Response "+JSON.stringify(responseJson));
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
    return error;
  });
  return responses;
}

export async function sendPostAuthenticationRequest(url, body){
  console.log("Url "+url);
  console.log("Data Payload "+JSON.stringify(body));
  let responses = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: body,
  }).then((response) => {return createProperResponse(response)})
    .then(async (responseJson) => {
      console.log("Response "+JSON.stringify(responseJson));
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
    return error;
  });
  return responses;
}


export async function sendPostDataRequest(url, body){
  console.log("Url "+url);
  console.log("Data Payload "+JSON.stringify(body));
  let responses = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: body,
  }).then((response) => {return response.json()})
    .then(async (responseJson) => {
      console.log("Response "+JSON.stringify(responseJson));
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
    return error;
  });
  return responses;
}

  export async function sendPostFormDataRequest(url, body){
    console.log("Url "+url);
    console.log("Data Payload "+JSON.stringify(body));
    let responses = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: body,
    }).then((response) => {
      console.log("Response "+JSON.stringify(response));
      return response.json()
    })
      .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
    return responses;}





function createProperResponse(response) {
  const statusCode = response.status;
  const data = response.json();
  return Promise.all([statusCode, data]).then(res => ({
    statusCode: res[0],
    data: res[1]
  }));
}
