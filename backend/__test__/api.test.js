const request = require('supertest');
const app = require('../controllers');
 

// account 

describe('Get /account', () => {
    it('Should return set of data', async() => {
        const res= await request(app).get('/account')
        expect(res.status).toBe(200);
    })

    it('Response time should be less than 200ms', async() => {
        const startTime = Date.now();
        const res = await request(app).get('/account')
        const endTime = Date.now();
        const resTime = endTime - startTime;
        expect(res.status).toBe(200);
        expect(resTime).toBeLessThan(200);
    })

    it('Response data should be an array', async() => {
        const res = await request(app).get('/account');
        expect(Array.isArray(res.body)).toBe(true);
    })
})

//edit data
describe("Put /edit data", () => {

        it('Should edit the data in the backend', async() => {
            const payload = {"firstname":"joel", "secondname":"anna", "email":"joelanna@gmail.com", "phone":"1234567890", "language":"english","role":"translator","id":"1"}
            const res = await request(app).put('/editdata').send(payload);
            expect(res.status).toBe(200);
        })
    
        it('Should edit data within 200ms', async() => {
            const payload = {"firstname":"joel", "secondname":"anna", "email":"joelanna@gmail.com", "phone":"1234567890", "language":"english","role":"translator","id":"1"}
            const startTime = Date.now();
            const res = await request(app).put('/editdata').send(payload);
            const endTime = Date.now();
            const resTime = endTime - startTime;
            expect(res.status).toBe(200);
            expect(resTime).toBeLessThan(200);
        })
        it('invalid email', async()=>{
            const payload = {"firstname":"joel", "secondname":"anna", "email":"joelannagmail.com", "phone":"1234567890", "language":"english","role":"translator","id":"1"}
            const res = await request(app).put('/editdata').send(payload);
            expect(res.status).toBe(201);
            expect(res.body).toEqual({ message: 'invalid email' });
        })
        it('invalid phone', async()=>{
            const payload = {"firstname":"joel", "secondname":"anna", "email":"joelanna@gmail.com", "phone":"1234560", "language":"english","role":"translator","id":"1"}
            const res = await request(app).put('/editdata').send(payload);
            expect(res.status).toBe(201);
            expect(res.body).toEqual({ message: 'invalid phone' });
        })
        // it('internal server error', async()=>{
        //     const payload = {"firstname":"joel", "secondname":"anna", "email":"joelanna@gmail.com", "phone":"1234567890", "language":"english","role":"translator","id":"2"}
        //     const res = await request(app).put('/editdata').send(payload);
        //     expect(res.status).toBe(500);
        // })

    })

// getimage
describe("get /getimage",()=>{
    it('get url from aws and update in db', async()=>{
        const filename = 'profile.jpg';
        const id = '1';
        const res= await request(app).get(`/url/${filename}/${id}`)
        expect(res.status).toBe(200);
    })
    it('invalid file', async()=>{
        const filename = 'example.jpg';
        const id = '1';
        const res= await request(app).get(`/url/${filename}/${id}`)
        expect(res.status).toBe(200);
    })

})

//profilepicture_upload
describe("post /upload", ()=>{
    it('post image file to aws', async()=>{
        const res = await request(app)
        .post('/upload')
        .attach('photos', '../frontend/public/profile.png');
        expect(res.status).toBe(200);
    })
},1000)

// changepassword
describe("update /changepassword",()=>{
     it('should edit data in the backend', async()=>{
        const payload = {"id":1 , "oldPassword":"welcomeW@1", "newPassword":"welcomeW@1"}
        const res = await request(app).put('/changepassword').send(payload);
        expect(res.status).toBe(200);
     })
     it('invalid old password', async()=>{
        const payload = {"id":1 , "oldPassword":"wel", "newPassword":"welcomeW@1"}
        const res = await request(app).put('/changepassword').send(payload);
        expect(res.status).toBe(401);
     })
     it('invalid user', async()=>{
        const payload = {"id":2 , "oldPassword":"wel", "newPassword":"welcomeW@1"}
        const res = await request(app).put('/changepassword').send(payload);
        expect(res.status).toBe(404);
     })
     
 })