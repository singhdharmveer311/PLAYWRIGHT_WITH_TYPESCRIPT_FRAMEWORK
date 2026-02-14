import { request, expect, test, APIRequestContext } from "@playwright/test";
import apidata from "../../data/apiData.json";

let reqContext2 : APIRequestContext;
test.beforeAll(async({})=>{
    reqContext2 = await request.newContext({
        baseURL:"https://restful-booker.herokuapp.com", 
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })    
})


test('API Testing case 1 ', async({})=>{
    const reqContext = await request.newContext({
        baseURL : process.env.API_BASE_URL // from the enviroment file
    });

    console.log(API_BASE_URL)

    const req = await reqContext.get("/booking");
    // console.log(await req.json());
})


test('API Testing case 2 ', async({})=>{
    const reqContext = await request.newContext({
        baseURL : "https://restful-booker.herokuapp.com"
    });



    const req = await reqContext.get("/booking"); // this is coming from the internal defined reeContext

    const req2 = await reqContext2.get("/booking"); 
    // console.log(await req.json());
})

test('Fetch and validate API response headers', async () => {
    const response = await reqContext2.get('/booking');
    const headers = response.headers();

    expect(response.status()).toBe(200);
    expect(headers).toHaveProperty('content-type');
    expect(headers['content-type']).toContain('application/json');
    expect(headers).toHaveProperty('date');
});


test('POST create booking', async () => {
  const api = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  const payload = {
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-02-20',
      checkout: '2026-02-25'
    },
    additionalneeds: 'Breakfast'
  };

  const res = await api.post('/booking', { data: payload });

  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body).toHaveProperty('bookingid');
  expect(body.booking).toMatchObject(payload);
});



test('PUT Update Booking', async({request})=>{
    const req = await request.put('/13', {
        data: {apidata}
    })

    expect(req.ok()).toBeTruthy();

})



const API_BASE_URL = process.env.API_BASE_URL ?? 'https://restful-booker.herokuapp.com';
const API_USERNAME = process.env.API_USERNAME ?? 'admin';
const API_PASSWORD = process.env.API_PASSWORD ?? 'password123';

function buildBasicAuthHeader(username: string, password: string): string {
  return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
}

const payload = {
  firstname: 'James',
  lastname: 'Brown',
  totalprice: 222,
  depositpaid: false,
  bookingdates: {
    checkin: '2026-02-20',
    checkout: '2026-02-25',
  },
  additionalneeds: 'Lunch',
};

test('Basic Auth via httpCredentials', async () => {
  const api = await request.newContext({
    baseURL: API_BASE_URL,
    httpCredentials: {
      username: API_USERNAME,
      password: API_PASSWORD,
    },
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  });

  const res = await api.put('/booking/1', { data: payload });

  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('application/json');

  const body = await res.json();
  expect(body).toMatchObject({
    firstname: expect.any(String),
    lastname: expect.any(String),
    bookingdates: expect.any(Object),
  });

  await api.dispose();
});

test('Basic Auth via Authorization header', async () => {
  const api = await request.newContext({
    baseURL: API_BASE_URL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: buildBasicAuthHeader(API_USERNAME, API_PASSWORD),
    },
  });

  const res = await api.put('/booking/1', { data: payload });

  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('application/json');

  const body = await res.json();
  expect(body).toMatchObject({
    firstname: expect.any(String),
    lastname: expect.any(String),
    bookingdates: expect.any(Object),
  });

  await api.dispose();
});

test('Basic Auth invalid credentials -> unauthorized', async () => {
  const api = await request.newContext({
    baseURL: API_BASE_URL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: buildBasicAuthHeader(API_USERNAME, 'wrong_password'),
    },
  });

  const res = await api.put('/booking/1', { data: payload });

  expect([401, 403]).toContain(res.status());

  await api.dispose();
});



