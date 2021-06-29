import { expect } from 'chai';
import { convertTicksToDate, convertDateToTicks } from "../../src/helpers/date-time-helper";

describe('date-time-helper', () => {
    it('can convert ticks to date time', () => {
        expect(new Date('2021-04-10T23:06:13.000Z').toDateString()).to.equal(convertTicksToDate([637536927730000000, 0]).toDateString());
    });
    it('can convert date time to ticks', () => {
        expect(637536927730000000).to.equal(convertDateToTicks("2021-04-10T23:06:13.000Z"));
    });
});