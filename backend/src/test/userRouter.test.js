const supertest = require('supertest');
const {app, server} = require('../index');

const  {connectDB, disconnectDB} = require('../mongo/index.js');


const fakeRequest = supertest(app);



describe('Company router TEST', () => {
    beforeAll(async () => {
        const connectionError = await connectDB();
        if(!connectionError) console.log('🏢 Connected to database!');
        else console.log(connectionError);
    });
    afterAll(async () => {
        await disconnectDB();
        server.close();
    });



    let user;
    describe('POST /users', () => {
        it('Can create company', async () => {
            const res = await fakeRequest.post('/users').send( {
                firstName: 'Paulo',
                surname: 'Dutra',
                email: 'paulodutra@gmail.com',
                birthday: new Date(),
                treatment: 'Mr',
                password: 'blablacar',
            });
            expect(res.status).toBe(201);
            expect(res.body.name).toBe('Paulo');
            expect(res.body.surname).toBe('Dutra');
            user = res.body;
        });
    });
});