import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { Dimensions } from 'react-native';
import { Container, Spinner } from 'native-base';
import Dataset from '../impagination/dataset';
import Carousel from '../pinar';

import { PAGE_SIZE, LOAD_HORIZON } from './constants';
import { getRecordIndices } from './utils';
import RobotView from './RobotView';

const baseUrl = 'https://serene-beach-38011.herokuapp.com';
// const baseUrl = 'https://serene-beach-38011.herokuapp.com/api/faker?page=0&per_page=250';

export default () => {
  const [dataset, setDataset] = useState(null);
  const [records, setRecords] = useState(null);
  const [activeRecordIndex, setActiveRecordIndex] = useState(0);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [carouselRecordIndices0, setCarouselRecordIndices0] = useState([]);
  const [carouselRecordIndices1, setCarouselRecordIndices1] = useState([0]);
  const [lowerCarouselIndex, setLowerCarouselIndex] = useState(0);
  const carouselRef0 = useRef(null);
  const carouselRef1 = useRef(null);

  useEffect(() => {
    let dataset = new Dataset({
      pageSize: PAGE_SIZE,
      loadHorizon: LOAD_HORIZON,

      observe: (records) => {
        console.log(`Updating (${records.length} records)`);
        setRecords(records);
      },

      async fetch(pageOffset, pageSize, stats) {
        console.log(
          `Fetching...(pageOffset: ${pageOffset + 1}; pageSize: ${pageSize})`
        );
        try {
          const response = await fetch(
            `${baseUrl}/api/faker?page=${pageOffset + 1}&per_page=${pageSize}`
          );
          return await response.json();
        } catch (error) {
          console.error(error);
        }
      },
    });

    dataset.setReadOffset(0);
    setDataset(dataset);
  }, []);

  const getCarouselIndices = (carouselIndex) => {
    return carouselIndex === 0
      ? carouselRecordIndices0
      : carouselRecordIndices1;
  };

  const getCarousel = (carouselIndex) => {
    return carouselIndex === 0 ? carouselRef0.current : carouselRef1.current;
  };

  const getHiddenCarousel = () => {
    return activeCarouselIndex === 0
      ? carouselRef1.current
      : carouselRef0.current;
  };

  const handleIndexChange = (params) => {
    // Update the carousel screen index
    const { index, total } = params;
    let screenIndex = index;

    // Update the active record index
    const diff = screenIndex - currentScreenIndex;

    const recordIndex = activeRecordIndex + diff;
    setActiveRecordIndex(recordIndex);
    dataset && dataset.setReadOffset(recordIndex);

    // Handle the trigger points
    const activeIndices = getCarouselIndices(activeCarouselIndex);
    const lowerSwapTriggerIndex = activeIndices[0];
    const lowerLoadTriggerIndex = activeIndices[2];
    const upperLoadTriggerIndex = activeIndices[activeIndices.length - 3];
    const upperSwapTriggerIndex = activeIndices[activeIndices.length - 1];

    console.log('---------------------------------------------------------');
    console.log(`diff: ${screenIndex} - ${currentScreenIndex} = ${diff}`);
    console.log(
      `recordIndex: ${recordIndex};`,
      `screenIndex: ${index};`,
      `activeCarousel: ${activeCarouselIndex};`,
      `lowerCarousel: ${lowerCarouselIndex};`,
      `totalScreens: ${total}`
    );
    console.log(`activeIndices: [${activeIndices.toString()}]`);
    console.log(`carouselIndices0: [${carouselRecordIndices0.toString()}]`);
    console.log(`carouselIndices1: [${carouselRecordIndices1.toString()}]`);
    console.log(
      `lowerSwapTrigger: ${lowerSwapTriggerIndex}`,
      `lowerLoadTrigger: ${lowerLoadTriggerIndex}`,
      `upperLoadTrigger: ${upperLoadTriggerIndex}`,
      `upperSwapTrigger: ${upperSwapTriggerIndex}`
    );

    if (activeIndices[0] !== 0) {
      if (recordIndex === upperLoadTriggerIndex && diff === 1) {
        console.log('...checking for lower carousel (up)...');
        console.log('...Swapping lower carousel...');
        if (lowerCarouselIndex === 0) {
          console.log(
            'new carouselIndices0:',
            getRecordIndices(recordIndex, false).toString()
          );
          console.log(
            'new carouselIndices1:',
            getRecordIndices(recordIndex, true).toString()
          );
          setCarouselRecordIndices0(getRecordIndices(recordIndex, false)); // lower
          // setCarouselRecordIndices0(getRecordIndices(recordIndex, false)); // upper
          setLowerCarouselIndex(1);
        } else if (lowerCarouselIndex === 1) {
          console.log(
            'new carouselIndices0:',
            getRecordIndices(recordIndex, true).toString()
          );
          console.log(
            'new carouselIndices1:',
            getRecordIndices(recordIndex, false).toString()
          );
          setCarouselRecordIndices1(getRecordIndices(recordIndex, false)); // lower
          // setCarouselRecordIndices1(getRecordIndices(recordIndex, true)); // upper
          setLowerCarouselIndex(0);
        }
      }
    }

    if (activeIndices[0] !== 0) {
      if (recordIndex === lowerLoadTriggerIndex && diff === -1) {
        console.log('...checking for lower carousel (down)...');
        console.log('...Swapping lower carousel...');
        if (lowerCarouselIndex === 0) {
          console.log('################################################');
          console.log('swapping');
          console.log('################################################');
          console.log(
            'new carouselIndices0:',
            getRecordIndices(recordIndex, true).toString()
          );
          console.log(
            'new carouselIndices1:',
            getRecordIndices(recordIndex - PAGE_SIZE, true).toString()
          );
          setCarouselRecordIndices1(
            getRecordIndices(recordIndex - PAGE_SIZE, true)
          ); // lower
          // setCarouselRecordIndices0(getRecordIndices(recordIndex, false)); // upper
          setLowerCarouselIndex(1);
        } else if (lowerCarouselIndex === 1) {
          console.log('################################################');
          console.log('swapping');
          console.log('################################################');
          console.log(
            'new carouselIndices0:',
            getRecordIndices(recordIndex - PAGE_SIZE, true).toString()
          );
          console.log(
            'new carouselIndices1:',
            getRecordIndices(recordIndex, true).toString()
          );
          setCarouselRecordIndices0(
            getRecordIndices(recordIndex - PAGE_SIZE, true)
          ); // lower
          // setCarouselRecordIndices1(getRecordIndices(recordIndex, true)); // upper
          setLowerCarouselIndex(0);
        }
      }
    }

    if (recordIndex === upperSwapTriggerIndex && diff === 1) {
      console.log('...Switching carousels (up)...');
      console.log({ screenIndex });
      screenIndex = 1;
      console.log({ screenIndex });
      getHiddenCarousel().scrollToIndex({
        index: screenIndex,
        animated: false,
      });
      // setCurrentScreenIndex(screenIndex);
      setActiveCarouselIndex(activeCarouselIndex === 0 ? 1 : 0);
    }

    if (recordIndex !== 0) {
      if (recordIndex === lowerSwapTriggerIndex && diff === -1) {
        console.log('Switching carousels (down)...');
        console.log({ screenIndex });
        screenIndex = activeIndices.length - 2;
        console.log({ screenIndex });
        getHiddenCarousel().scrollToIndex({
          index: screenIndex,
          animated: false,
        });
        // setCurrentScreenIndex(screenIndex);
        setActiveCarouselIndex(activeCarouselIndex === 0 ? 1 : 0);
      }
    }

    setCurrentScreenIndex(screenIndex);

    console.log('---------------------------------------------------------');
  };

  const renderChildrenForCarousel = (carouselIndex) => {
    // console.log('...rendering children for carousel', carouselIndex);
    if (!records) return <Spinner key={Math.random()} />;

    if (carouselRecordIndices0.length === 0) {
      console.log('#########################################################');
      console.log('#########################################################');
      console.log('#########################################################');
      console.log('Initializing...');
      console.log('#########################################################');
      console.log('#########################################################');
      console.log('#########################################################');
      setCarouselRecordIndices0(getRecordIndices(activeRecordIndex, true)); // lower
      setCarouselRecordIndices1(getRecordIndices(activeRecordIndex, false)); // upper
    }

    const carouselRecordIndices = getCarouselIndices(carouselIndex);

    const carouselRecords = carouselRecordIndices.map(
      (index) => records[index]
    );

    return carouselRecords.map((record) => {
      if (!record || !record.isSettled) {
        return <Spinner key={Math.random()} />;
      }

      return (
        <RobotView
          key={record.content.id}
          record={record}
          carouselIndex={carouselIndex}
          activeCarouselIndex={activeCarouselIndex}
        />
      );
    });
  };

  console.log('Rendering.............................................');

  return (
    <Container>
      <Carousel
        horizontal={false}
        showsControls={false}
        showsDots={false}
        onIndexChanged={handleIndexChange}
        ref={carouselRef0}
        height={Dimensions.get('screen').height}
        style={{
          position: 'absolute',
          zIndex: activeCarouselIndex === 0 ? 100 : 0,
        }}
        key={carouselRecordIndices0.toString()}
      >
        {renderChildrenForCarousel(0)}
      </Carousel>
      <Carousel
        horizontal={false}
        showsControls={false}
        showsDots={false}
        onIndexChanged={handleIndexChange}
        ref={carouselRef1}
        height={Dimensions.get('screen').height}
        style={{
          position: 'absolute',
          zIndex: activeCarouselIndex === 1 ? 100 : 0,
        }}
        key={carouselRecordIndices1.toString()}
      >
        {renderChildrenForCarousel(1)}
      </Carousel>
    </Container>
  );
};
