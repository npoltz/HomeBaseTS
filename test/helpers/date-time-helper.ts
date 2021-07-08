import { expect } from 'chai';
import { convertTicksToDate, convertDateToTicks, convertTicksToSinceString } from "../../src/helpers/date-time-helper";

describe('date-time-helper', () => {
    it('can convert ticks to date time', () => {
        expect(new Date('2021-04-10T23:06:13.000Z').toDateString()).to.equal(convertTicksToDate([637536927730000000, 0]).toDateString());
    });
    it('can convert date time to ticks', () => {
        expect(637536927730000000).to.equal(convertDateToTicks("2021-04-10T23:06:13.000Z"));
    });
    it('can calculate difference in days', () => {
        expect('3 days ago').to.equal(convertTicksToSinceString([convertDateToTicks('2021-04-10T12:06:13.000Z'), 0], new Date('2021-04-13T16:06:13.000Z').getTime()));
    })
    it('can calculate difference of a single day', () => {
        expect('yesterday').to.equal(convertTicksToSinceString([convertDateToTicks('2021-04-10T12:06:13.000Z'), 0], new Date('2021-04-11T16:06:13.000Z').getTime()));
    })
    it('can calculate difference in hours', () => {
        expect('4 hours ago').to.equal(convertTicksToSinceString([convertDateToTicks('2021-04-10T12:06:13.000Z'), 0], new Date('2021-04-10T16:06:13.000Z').getTime()));
    })
    it('can calculate difference of a single hour', () => {
        expect('1 hour ago').to.equal(convertTicksToSinceString([convertDateToTicks('2021-04-10T12:06:13.000Z'), 0], new Date('2021-04-10T13:06:13.000Z').getTime()));
    })
    it('can calculate difference in minutes', () => {
        expect('9 minutes ago').to.equal(convertTicksToSinceString([convertDateToTicks('2021-04-10T12:06:13.000Z'), 0], new Date('2021-04-10T12:15:13.000Z').getTime()));
    })
    it('can calculate difference of a single minute', () => {
        expect('1 minute ago').to.equal(convertTicksToSinceString([convertDateToTicks('2021-04-10T12:06:13.000Z'), 0], new Date('2021-04-10T12:07:13.000Z').getTime()));
    })
    it('can calculate difference in seconds', () => {
        expect('32 seconds ago').to.equal(convertTicksToSinceString([convertDateToTicks('2021-04-10T12:06:13.000Z'), 0], new Date('2021-04-10T12:06:45.000Z').getTime()));
    })
    it('can calculate difference of a single second', () => {
        expect('1 second ago').to.equal(convertTicksToSinceString([convertDateToTicks('2021-04-10T12:06:13.000Z'), 0], new Date('2021-04-10T12:06:14.000Z').getTime()));
    })
});