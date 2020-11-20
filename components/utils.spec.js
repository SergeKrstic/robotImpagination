import { expect } from 'chai';
import { getRecordIndices } from './utils';

describe('getRecordIndices', () => {
  xit('should get indices for first carousel', () => {
    expect(getRecordIndices(0, true)).to.eql([0, 1, 2, 3, 4, 5]);
    expect(getRecordIndices(1, true)).to.eql([0, 1, 2, 3, 4, 5]);
    expect(getRecordIndices(2, true)).to.eql([0, 1, 2, 3, 4, 5]);
    expect(getRecordIndices(3, true)).to.eql([0, 1, 2, 3, 4, 5]);
    expect(getRecordIndices(4, true)).to.eql([0, 1, 2, 3, 4, 5]);
  });

  xit('should get indices for second carousel', () => {
    expect(getRecordIndices(5, false)).to.eql([4, 5, 6, 7, 8, 9, 10]);
    expect(getRecordIndices(6, false)).to.eql([4, 5, 6, 7, 8, 9, 10]);
    expect(getRecordIndices(7, false)).to.eql([4, 5, 6, 7, 8, 9, 10]);
    expect(getRecordIndices(8, false)).to.eql([4, 5, 6, 7, 8, 9, 10]);
    expect(getRecordIndices(9, false)).to.eql([4, 5, 6, 7, 8, 9, 10]);
  });

  it('should prepare next carousel when trigger point reached', () => {
    expect(getRecordIndices(8, true)).to.eql([4, 5, 6, 7, 8, 9, 10]);
    expect(getRecordIndices(8, false)).to.eql([9, 10, 11, 12, 13, 14, 15]);
  });
});
