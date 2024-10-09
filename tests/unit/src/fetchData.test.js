import { expect } from 'chai';
import sinon from 'sinon';
import fetchData from '../../../src/fetchData.js';

describe('fetchData', function () {
  let mockedFetch, mockResponse;

  beforeEach(() => {
    mockedFetch = sinon.stub(global, 'fetch');

    mockResponse = {
      ok: true,
      status: 200,
      json: sinon.stub().resolves({ temp: 20 }),
    };

    mockedFetch.resolves(mockResponse);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call fetch with the correct url', async function () {
    await fetchData('today', 'cairo');

    expect(mockedFetch.calledOnceWith('http://localhost:5000/today/cairo'));
  });

  it('should throw an error if the response is not ok', async function () {
    mockResponse.ok = false;
    mockResponse.status = 400;
    mockResponse.json.resolves({ error: 'Something went wrong!' });

    let errorMessage;

    try {
      await fetchData('today', 'ca');
    } catch (error) {
      errorMessage = error.message;
    }

    expect(errorMessage).to.equal('Something went wrong!');
  });

  it('should return the correct data', async function () {
    expect(await fetchData('today', 'cairo')).to.deep.equal({ temp: 20 });
  });
});
