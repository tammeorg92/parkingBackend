const expect = require('chai').expect,
    sinon = require('sinon'),
    moment = require('moment');
    RegularCustomer = require('../../lib/RegularCustomer');


describe('RegularCustomer', () => { 

    describe('#getParkingDetails', () => { 
        const sandbox = sinon.sandbox.create();
        afterEach(() => { 
            sandbox.restore();
        })
        let customer = null;
        beforeEach(() => customer = new RegularCustomer());
        it('Valid values', () => { 
            const startTime = '2018-07-19 06:33';
            const endTime = '2018-07-18 10:12'
            let spyHours = sandbox.stub(customer, 'getHalfHours').returns('test');
            let spySum = sandbox.stub(customer, 'getParkingSum').returns(8);
            let result = customer.getParkingDetails({startTime, endTime});
            expect(result).to.be.eql({
                dates:[startTime, endTime],
                fee:{dayFee:1.5,nightFee:1},
                totalHours:'test',
                sum:8
            });
            result = spyHours.calledWithExactly(startTime, endTime);
            expect(result).to.be.true;
            result = spySum.calledWithExactly('test')
            expect(result).to.be.true;
        });
    })

 
});