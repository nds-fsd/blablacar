import supertest from 'supertest';
import {app, server} from '../../index';
import {connectDB, disconnectDB} from './mongo/index.js';

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


    let company;
    describe('POST /users', () => {
        it('Can create company', async () => {
            const res = await fakeRequest.post('/users').send( {
                name: 'Paulo',
                surname: 'Dutra',
                email: 'paulodutra@gmail.com'
            });
            expect(res.status).toBe(201);
            expect(res.body.name).toBe('Paulo');
            expect(res.body.surname).toBe('Dutra');
            company = res.body;
        });
    });
});