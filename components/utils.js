import { PAGE_SIZE } from './constants';

const MAX_PAGES = 10;
const MAX_RECORDS = PAGE_SIZE * MAX_PAGES;

export const getRecordIndices = (activeRecordIndex, isLowerCarousel) => {
  let startRecordIndex = activeRecordIndex - (activeRecordIndex % PAGE_SIZE);
  if (!isLowerCarousel) {
    // Roll over to the next page, since this is now the upper carousel
    startRecordIndex += PAGE_SIZE;
  }

  const startIndex = Math.max(startRecordIndex - 1, 0);
  const endIndex = Math.min(startRecordIndex + PAGE_SIZE + 1, MAX_RECORDS);

  let recordIndices = [];
  for (let index = startIndex; index < endIndex; index++) {
    recordIndices.push(index);
  }

  return recordIndices;
};
