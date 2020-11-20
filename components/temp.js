import {
  Header,
  Container,
  Title,
  Content,
  Card,
  CardItem,
  Spinner,
} from 'native-base';

//  const setCurrentReadOffset = (event) => {
//    let itemHeight = 294.666748046875;
//    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
//    let currentItemIndex = Math.ceil(currentOffset / itemHeight);

//    console.log(currentItemIndex);
//    state.dataset && state.dataset.setReadOffset(currentItemIndex);
//  };

//  const renderItems = () => {
//    if (!state.datasetState) return null;

//    return state.datasetState.map((record) => {
//      if (!record.isSettled) {
//        return <Spinner key={Math.random()} />;
//      }

//      return <RobotItem record={record} key={record.content.id} />;
//    });
//  };

//  const renderList = () => {
//    return (
//      <>
//        <Header>
//          <Title>Robot Impagination</Title>
//        </Header>
//        <Content scrollEventThrottle={300} onScroll={setCurrentReadOffset}>
//          {renderItems()}
//        </Content>
//      </>
//    );
//  };
