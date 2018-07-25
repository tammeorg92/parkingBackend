'use strict';
const moment = require('moment');

module.exports = class Customer {
    constructor() {
        this.dayStartMinute = 420;
        this.nightStartMinute = 1140;
        this._dayFee = 1.5;
        this._nightFee = 1;
        this._maxTotalSum = -1;
        this._monthlyFee = 0;
        this.dateFormat = 'YYYY-MM-DD HH:mm';
    };

    get dayFee() { return this._dayFee; }
    get nightFee() { return this._nightFee; }
    get maxTotalSum() { return this._maxTotalSum; }
    get monthlyFee() { return this._monthlyFee; };

    getTotal(parkingData) {
        let totalSum = this.monthlyFee;
        parkingData.forEach((values) => { 
            totalSum += values.sum;
        })
        if (this.maxTotalSum > 0 && totalSum > this.maxTotalSum) {
            totalSum = this._maxTotalSum;
        }
        return totalSum;
    }
    
    getParkingDetails(dates) {
        if (typeof dates !== 'object' || !dates.startTime || !dates.endTime) return null;
        let mDates = [
            moment(dates.startTime).format(this.dateFormat),
            moment(dates.endTime).format(this.dateFormat)
        ]
        const totalHours = this.getHalfHours(...mDates);
        const sum = this.getParkingSum(totalHours);
        return {
            dates: mDates,
            totalHours,
            fee: { dayFee: this._dayFee, nightFee: this._nightFee },
            sum,
        };
    }
    getParkingSum(totalHours) {
        if (typeof totalHours !== 'object') return null;
        let sum = 0;
        if (!('dayHours' in totalHours) && !('nightHours' in totalHours))
            return null;
        if ('dayHours' in totalHours && totalHours.dayHours !== 0)
            sum += totalHours.dayHours * this.dayFee;
        if ('nightHours' in totalHours && totalHours.nightHours !== 0)
            sum += totalHours.nightHours * this.nightFee;
        return sum;
    }

    getFeePrice(mDateFrom) {
        const timeInMinutes = (mDateFrom.hours() * 60) + mDateFrom.minutes();
        if (timeInMinutes >= this.dayStartMinute && timeInMinutes < this.nightStartMinute) {
            return this.dayFee;
        }
        else {
            return this.nightFee;
        }
    }

    getHalfHours(dateFrom, dateTo) {
        const mDateFrom = moment(dateFrom);
        const mDateTo = moment(dateTo);
        let dayHours = 0;
        let nightHours = 0;
        while (mDateFrom < mDateTo) {
            const feePrice = this.getFeePrice(mDateFrom);
            if (feePrice === this.dayFee) {
                dayHours++;
            }
            else if (feePrice === this.nightFee) {
                nightHours++;
            }
            mDateFrom.add(30, 'minutes');
        }
        return {
            dayHours,
            nightHours
        }

    }

}