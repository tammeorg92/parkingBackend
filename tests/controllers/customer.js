//Require the dev-dependencies
const chai = require('chai')
    expect = chai.expect,
    chaiHttp = require('chai-http'),
    app = require('../../app');


chai.use(chaiHttp);


describe('Customer', () => {

    describe('/GET customer/Customer_1?type=regular', () => {
        it('Get customer data by name', (done) => {
            chai.request(app)
                .get('/customer/Customer_1?type=regular')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.data).to.be.an('object')
                    done();
                });
        });
    });
    describe('/GET customer/Customer_1', () => {
        it('Customer type missing ', (done) => {
            chai.request(app)
                .get('/customer/Customer_1')
                .end((err, res) => {
                    expect(res.status).to.equal(500);
                    expect(res.body).to.have.a.property('message')
                        .which.equals('customer type missing')
                    done();
                });
        });
    });
    describe('/GET customer/customer_10?type=regular', () => {
        it('No customer data ', (done) => {
            chai.request(app)
                .get('/customer/customer_10?type=regular')
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body.data).to.be.an('object');
                    done();
                });
        });
    });
    describe('/GET customer/Customer_1?type=test', () => {
        it('Invalid customer type ', (done) => {
            chai.request(app)
                .get('/customer/Customer_1?type=test')
                .end((err, res) => {
                    expect(res.status).to.equal(500);
                    expect(res.body).to.have.a.property('message')
                        .which.equals('invalid customer type')
                    done();
                });
        });
    });
})
