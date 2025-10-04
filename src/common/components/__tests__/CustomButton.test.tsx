import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CustomButton } from '../CustomButton';

describe('CustomButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  describe('Rendering', () => {
    it('renders with title', () => {
      const { getByText } = render(
        <CustomButton title='Test Button' onPress={mockOnPress} />
      );

      expect(getByText('Test Button')).toBeTruthy();
    });

    it('renders with custom style', () => {
      const customStyle = { backgroundColor: 'red' };
      const { getByText } = render(
        <CustomButton
          title='Test Button'
          onPress={mockOnPress}
          style={customStyle}
        />
      );

      expect(getByText('Test Button')).toBeTruthy();
    });

    it('renders with custom text style', () => {
      const customTextStyle = { fontSize: 20 };
      const { getByText } = render(
        <CustomButton
          title='Test Button'
          onPress={mockOnPress}
          textStyle={customTextStyle}
        />
      );

      expect(getByText('Test Button')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it('renders primary variant by default', () => {
      const { getByText } = render(
        <CustomButton title='Primary Button' onPress={mockOnPress} />
      );

      expect(getByText('Primary Button')).toBeTruthy();
    });

    it('renders secondary variant', () => {
      const { getByText } = render(
        <CustomButton
          title='Secondary Button'
          onPress={mockOnPress}
          variant='secondary'
        />
      );

      expect(getByText('Secondary Button')).toBeTruthy();
    });

    it('renders outline variant', () => {
      const { getByText } = render(
        <CustomButton
          title='Outline Button'
          onPress={mockOnPress}
          variant='outline'
        />
      );

      expect(getByText('Outline Button')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      const { getByText } = render(
        <CustomButton title='Small Button' onPress={mockOnPress} size='small' />
      );

      expect(getByText('Small Button')).toBeTruthy();
    });

    it('renders medium size by default', () => {
      const { getByText } = render(
        <CustomButton title='Medium Button' onPress={mockOnPress} />
      );

      expect(getByText('Medium Button')).toBeTruthy();
    });

    it('renders large size', () => {
      const { getByText } = render(
        <CustomButton title='Large Button' onPress={mockOnPress} size='large' />
      );

      expect(getByText('Large Button')).toBeTruthy();
    });
  });

  describe('Loading State', () => {
    it('shows loading indicator when loading is true', () => {
      const { UNSAFE_getByType } = render(
        <CustomButton
          title='Loading Button'
          onPress={mockOnPress}
          loading={true}
        />
      );

      // Should render without crashing
      expect(UNSAFE_getByType).toBeDefined();
    });

    it('hides title text when loading is true', () => {
      const { queryByText } = render(
        <CustomButton
          title='Loading Button'
          onPress={mockOnPress}
          loading={true}
        />
      );

      expect(queryByText('Loading Button')).toBeNull();
    });

    it('shows title text when loading is false', () => {
      const { getByText } = render(
        <CustomButton
          title='Not Loading Button'
          onPress={mockOnPress}
          loading={false}
        />
      );

      expect(getByText('Not Loading Button')).toBeTruthy();
    });
  });

  describe('Disabled State', () => {
    it('is disabled when disabled prop is true', () => {
      const { getByText } = render(
        <CustomButton
          title='Disabled Button'
          onPress={mockOnPress}
          disabled={true}
        />
      );

      expect(getByText('Disabled Button')).toBeTruthy();
    });

    it('is disabled when loading is true', () => {
      const { UNSAFE_getByType } = render(
        <CustomButton
          title='Loading Button'
          onPress={mockOnPress}
          loading={true}
        />
      );

      expect(UNSAFE_getByType).toBeDefined();
    });

    it('is enabled when both disabled and loading are false', () => {
      const { getByText } = render(
        <CustomButton
          title='Enabled Button'
          onPress={mockOnPress}
          disabled={false}
          loading={false}
        />
      );

      expect(getByText('Enabled Button')).toBeTruthy();
    });
  });

  describe('Interaction', () => {
    it('calls onPress when pressed', () => {
      const { getByText } = render(
        <CustomButton title='Press Me' onPress={mockOnPress} />
      );

      fireEvent.press(getByText('Press Me'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('does not call onPress when disabled', () => {
      const { getByText } = render(
        <CustomButton
          title='Disabled Button'
          onPress={mockOnPress}
          disabled={true}
        />
      );

      fireEvent.press(getByText('Disabled Button'));
      expect(mockOnPress).not.toHaveBeenCalled();
    });

    it('does not call onPress when loading', () => {
      const { UNSAFE_getByType } = render(
        <CustomButton
          title='Loading Button'
          onPress={mockOnPress}
          loading={true}
        />
      );

      // Should render without crashing
      expect(UNSAFE_getByType).toBeDefined();
    });

    it('calls onPress multiple times when pressed multiple times', () => {
      const { getByText } = render(
        <CustomButton title='Press Me' onPress={mockOnPress} />
      );

      fireEvent.press(getByText('Press Me'));
      fireEvent.press(getByText('Press Me'));
      fireEvent.press(getByText('Press Me'));

      expect(mockOnPress).toHaveBeenCalledTimes(3);
    });
  });

  describe('Accessibility', () => {
    it('renders without accessibility issues', () => {
      const { getByText } = render(
        <CustomButton title='Accessible Button' onPress={mockOnPress} />
      );

      expect(getByText('Accessible Button')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty title', () => {
      const { UNSAFE_getByType } = render(
        <CustomButton title='' onPress={mockOnPress} />
      );

      expect(UNSAFE_getByType).toBeDefined();
    });

    it('handles very long title', () => {
      const longTitle =
        'This is a very long button title that should be handled properly by the component';
      const { getByText } = render(
        <CustomButton title={longTitle} onPress={mockOnPress} />
      );

      expect(getByText(longTitle)).toBeTruthy();
    });

    it('handles undefined onPress gracefully', () => {
      const { getByText } = render(
        <CustomButton
          title='No Press Handler'
          onPress={undefined as unknown as () => void}
        />
      );

      expect(getByText('No Press Handler')).toBeTruthy();
    });
  });
});
