import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  useWindowDimensions,
  Animated,
} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';

const data = [
  {
    id: '1',
    title: 'Welcome Aboard',
    description: 'Welcome to Airtel Nigeria Blah Blah',
    image: require('./assets/img1.png'),
  },
  {
    id: '2',
    title: 'Continue Scrolling',
    description: 'Continue Scrolling in Airtel Nigeria Blah Blah',
    image: require('./assets/img2.png'),
  },
  {
    id: '3',
    title: 'Thanks All',
    description: 'Thank you for choosing Airtel Nigeria Blah Blah',
    image: require('./assets/img1.png'),
  },
];

export const Onboarding1 = () => {
  return (
    <View style={styles.parent}>
      <Onboarding />
    </View>
  );
};
export const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const slidesRef = useRef<any>(null);

  const viewableItemsChanged = useRef(({viewableItems}: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>
        <FlatList
          data={data}
          renderItem={({item}) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={data} scrollX={scrollX} />
    </View>
  );
};
export const OnboardingItem = ({item}: any) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.itemContainer, {width}]}>
      <Image
        source={item.image}
        style={[styles.image, {width, resizeMode: 'contain'}]}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

export const Paginator = ({data, scrollX}: any) => {
  const {width} = useWindowDimensions();
  return (
    <View style={{flexDirection: 'row', height: 64}}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity}]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'red',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: 'blue',
    marginHorizontal: 64,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginHorizontal: 8,
  },
});
