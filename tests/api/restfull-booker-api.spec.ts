import {test, expect} from "../../fixtures/hooks-fixture";
import apipathdata from "../../data/api-data/api-path-data.json";
import restfullapidata from "../../data/api-data/restfull-booker-api-data.json"


test("ID-8 [Restfull Booker > Booking ] Verify that user is able to fetch all the bookings using get API and receive valid response",
    {
        tag: ['@API', '@UAT'], 
        annotation: {
            type: "Test Case Description / Link / ID", 
            description: "TC008"
        }

    },
    async({request})=>{
        const bookingIDRequest = await request.get(apipathdata.booking_path);
        const bookingIDResponse = await bookingIDRequest.json();

        console.log(bookingIDResponse);
        expect(bookingIDRequest.statusText()).toBe('OK');
        expect(bookingIDRequest.ok()).toBeTruthy();

        expect(bookingIDRequest.headers()['content-type']).toBe(restfullapidata.content_type);

    }
)


test("ID-9 [Restfull Booker > Booking ] Verify that user is able to fetch perticular bookings from response of all booking id",
    {
        tag: ['@API', '@UAT'], 
        annotation: {
            type: "Test Case Description / Link / ID", 
            description: "TC009"
        }

    },
    async({request})=>{
        const bookingIDRequest = await request.get(apipathdata.booking_path);
        const bookingIDResponse = await bookingIDRequest.json();

        /// Second booking id
        const booking_id = bookingIDResponse[1].bookingid;

        const firstBookingIDRequest = await request.get(`${apipathdata.booking_path}/${booking_id}`);
        const firstBookingIDResponse = await firstBookingIDRequest.json();

        console.log(firstBookingIDResponse);
        expect(firstBookingIDRequest.statusText()).toBe('OK');
        expect(firstBookingIDRequest.ok()).toBeTruthy();

        expect(firstBookingIDRequest.headers()['content-type']).toBe(restfullapidata.content_type);

        expect(typeof firstBookingIDResponse.firstname).toBe('string');

    }
)