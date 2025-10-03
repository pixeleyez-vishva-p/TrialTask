import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SkeletonPlaceholder } from './SkeletonPlaceholder';
import { Colors } from '../constants';

export const ItemCardSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Image skeleton */}
      <SkeletonPlaceholder
        width='100%'
        height={200}
        borderRadius={12}
        style={styles.image}
      />

      <View style={styles.content}>
        {/* Title skeleton - two lines for more realistic loading */}
        <SkeletonPlaceholder
          width='95%'
          height={18}
          borderRadius={4}
          style={styles.title}
        />
        <SkeletonPlaceholder
          width='70%'
          height={18}
          borderRadius={4}
          style={styles.titleLine2}
        />

        {/* Category skeleton */}
        <SkeletonPlaceholder
          width='45%'
          height={14}
          borderRadius={12}
          style={styles.category}
        />

        <View style={styles.priceContainer}>
          {/* Price skeleton */}
          <SkeletonPlaceholder
            width={90}
            height={22}
            borderRadius={4}
            style={styles.price}
          />

          {/* Rating skeleton */}
          <View style={styles.ratingContainer}>
            <SkeletonPlaceholder
              width={50}
              height={14}
              borderRadius={4}
              style={styles.rating}
            />
            <SkeletonPlaceholder
              width={30}
              height={12}
              borderRadius={4}
              style={styles.ratingCount}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 6,
  },
  titleLine2: {
    marginBottom: 8,
  },
  category: {
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {},
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginRight: 4,
  },
  ratingCount: {},
});
