const expect = require('chai').expect,
    sinon = require('sinon'),
    moment = require('moment');
    Customer = require('../../lib/Customer');


describe('Customer', () => { 

    describe('#getParkingDetails', () => { 
        const sandbox = sinon.sandbox.create();
        afterEach(() => { 
            sandbox.restore();
        })
        let customer = null;
        beforeEach(() => customer = new Customer());
        it('Not an object' , () => { 
            let result = customer.getParkingDetails('string');
            expect(result).to.be.null;
        });
        it('Invalid dates', () => { 
            let result = customer.getParkingDetails({dateFrom:''});
            expect(result).to.be.null;
        });
        it('Dates missing', () => { 
            let result = customer.getParkingDetails({});
            expect(result).to.be.null;
        });
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

    describe('#geFeePrice' , () => { 
        let customer = new Customer();
        it('Invalid parameters')
        it('Before 7am' , () => { 
            let mDate = moment('2018-05-04 06:59');
            let result = customer.getFeePrice(mDate);
            expect(result).to.be.eql(customer.nightFee)
        })
        it('Between 7am and 7pm' , () => { 
            let mDate = moment('2018-05-04 13:33');
            let result = customer.getFeePrice(mDate);
            expect(result).to.be.eql(customer.dayFee)
        })
        it('After 7pm ' , () => { 
            let mDate = moment('2018-05-13 20:34');
            let result = customer.getFeePrice(mDate);
            expect(result).to.be.eql(customer.nightFee);
        });
    })
    describe('#getHalfhours' , () => { 
        const customer = new Customer();
        it('Invalid parameters');
        it('1 night hour' , () => { 
            let dateFrom = moment('2018-05-13 20:30');
            let dateTo = moment('2018-05-13 21:00');
            const result = customer.getHalfHours(dateFrom, dateTo);
            expect(result).to.eql({dayHours:0, nightHours:1});
        })
        it('10 day hours', () => {
            let dateFrom = moment('2018-05-13 07:02');
            let dateTo = moment('2018-05-13 11:56');
            const result = customer.getHalfHours(dateFrom, dateTo);
            expect(result).to.eql({dayHours:10,nightHours:0});    
        })
        it('5 day hours, 3 night hours' , () => { 
            let dateFrom = moment('2018-05-13 05:44');
            let dateTo = moment('2018-05-13 08:30');
            const result = customer.getHalfHours(dateFrom, dateTo);
            expect(result).to.eql({dayHours:3,nightHours:3});
        })
    })
    describe('#getParkingSum', () => { 
        //Fee day:1.5 , night:1
        const customer = new Customer();
        it('Invalid parameters',() => { 
            let result = customer.getParkingSum('I am not an object');
            expect(result).to.be.null;
        });
        it('No hours', () => { 
            let result = customer.getParkingSum({});
            expect(result).to.be.null;
        })
        it('Get sum#1' , () => { 
            let result = customer.getParkingSum({dayHours:3, nightHours:4});
            expect(result).to.be.equal(8.5)
        })
        it('Get only day fee' , () => { 
            let result = customer.getParkingSum({dayHours:5, nightHours:0});
            expect(result).to.be.equal(7.5)
        })
        it('Day hours missing', () => { 
            let result = customer.getParkingSum({nightHours:5});
            expect(result).to.be.equal(5);
        })
    })

})