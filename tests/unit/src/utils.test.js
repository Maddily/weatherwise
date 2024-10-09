import { expect } from 'chai';
import sinon from 'sinon';
import esmock from 'esmock';
import {
  getWindDirectionText,
  formatTime,
  formatDate,
  getCurrentHour,
  getUvIndexText,
  convertFToC,
  convertCToF,
  getVisibilityText,
} from '../../../src/utils.js';

describe('utils', function () {
  let utils,
    mockedParse,
    mockedFormat,
    mockedStartOfTomorrow,
    mockedDifferenceInHours,
    getRemainingHoursToday,
    clock;

  beforeEach(async () => {
    const fixedDate = new Date(Date.UTC(2024, 0, 1, 12, 0, 0));
    clock = sinon.useFakeTimers(fixedDate.getTime());

    mockedParse = sinon.stub();
    mockedFormat = sinon.stub();

    mockedStartOfTomorrow = sinon
      .stub()
      .returns(new Date(Date.UTC(2024, 0, 2, 0, 0, 0)));

    mockedDifferenceInHours = sinon.stub().callsFake((tomorrow, today) => {
      const hours = (tomorrow - today) / (1000 * 60 * 60);
      return hours;
    });

    utils = await esmock('../../../src/utils.js', {
      'date-fns': {
        parse: mockedParse,
        format: mockedFormat,
        startOfTomorrow: mockedStartOfTomorrow,
        differenceInHours: mockedDifferenceInHours,
      },
    });

    getRemainingHoursToday = utils.getRemainingHoursToday;
  });

  afterEach(() => {
    sinon.restore();
    clock.restore();
  });

  describe('getWindDirectionText', function () {
    it('should return the correct wind direction text', function () {
      expect(getWindDirectionText(335.9)).to.equal('NNW');
    });
  });

  describe('formatTime', function () {
    it('should return the correct time format', function () {
      mockedParse.returns(
        'Thu Sep 19 2024 12:00:00 GMT+0300 (Eastern European Summer Time)'
      );
      mockedFormat.returns('12 PM');

      expect(formatTime('12:00:00')).to.equal('12 PM');
    });
  });

  describe('formatDate', function () {
    it('should return the correct date format', function () {
      const date =
        'Fri Sep 20 2024 00:00:00 GMT+0300 (Eastern European Summer Time)';

      mockedParse.returns(date);
      mockedFormat.withArgs(date, 'd/M').returns('20/9');
      mockedFormat.withArgs(date, 'EEE').returns('Fri');

      expect(formatDate('2024-09-20')).to.deep.equal({
        formattedDate: '20/9',
        dayOfWeek: 'Fri',
      });
    });
  });

  describe('getCurrentHour', function () {
    it('should return the correct hour for a given tzoffset', function () {
      const tzoffset = 3;
      const expectedHour = 15; // 12:00 UTC + 3 hours = 15:00

      const result = getCurrentHour(tzoffset);

      expect(result).to.equal(expectedHour);
    });

    it('should handle negative tzoffset correctly', function () {
      const tzoffset = -5;
      const expectedHour = 7; // 12:00 UTC - 5 hours = 07:00

      const result = getCurrentHour(tzoffset);

      expect(result).to.equal(expectedHour);
    });

    it('should handle tzoffset that wraps around midnight', function () {
      const tzoffset = -13;
      const expectedHour = 23; // 12:00 UTC - 13 hours = 23:00

      const result = getCurrentHour(tzoffset);

      expect(result).to.equal(expectedHour);
    });
  });

  describe('getUvIndexText', function () {
    it('should return the correct UV index value and phrase', function () {
      const result = getUvIndexText(9);

      expect(result).to.deep.equal({
        value: 'Very High',
        phrase:
          'Extra protection is needed. Avoid being outside during midday hours.',
      });
    });
  });

  describe('convertFToC', function () {
    it('should convert a temperature from Fahrenheit to Celsius', function () {
      expect(convertFToC(93)).to.equal(34);
    });
  });

  describe('convertCToF', function () {
    it('should convert a temperature from Celsius to Fahrenheit', function () {
      expect(convertCToF(34)).to.equal(93);
    });
  });

  describe('getVisibilityText', function () {
    it('should return the correct message according to the given visibility value', function () {
      expect(getVisibilityText(24.1)).to.equal('Very clear');
    });
  });

  describe('getRemainingHoursToday', function () {
    it('should correctly calculate the hours remaining in the day', function () {
      expect(getRemainingHoursToday()).to.equal(12);
    });
  });
});
