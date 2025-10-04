import React from 'react';
import SkeletonPlaceholderLib from 'react-native-skeleton-placeholder';
import { Colors } from '../../constants';

export const SkeletonPlaceholder: React.FC<SkeletonPlaceholderProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
  children,
}) => {
  return (
    <SkeletonPlaceholderLib
      backgroundColor={Colors.lightGray}
      highlightColor={Colors.white}
      speed={1200}
      direction='right'
      shimmerWidth={0.6}
    >
      {children || (
        <SkeletonPlaceholderLib.Item
          width={width}
          height={height}
          borderRadius={borderRadius}
          style={style}
        />
      )}
    </SkeletonPlaceholderLib>
  );
};
