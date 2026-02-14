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
        baseURL : "https://restful-booker.herokuapp.com"
    });



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


