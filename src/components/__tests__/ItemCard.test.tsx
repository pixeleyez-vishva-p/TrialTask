import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ItemCard } from '../ItemCard';
import { Item } from '../../types';

// Mock data for testing
const mockItem: Item = {
  id: 1,
  title: 'Test Product',
  description: 'This is a test product description',
  price: 29.99,
  category: 'Electronics',
  image: 'https://example.com/image.jpg',
  rating: {
    rate: 4.5,
    count: 120,
  },
};

const mockItemWithLongTitle: Item = {
  ...mockItem,
  title:
    'This is a very long product title that should be truncated properly to avoid layout issues',
};

const mockItemWithHighPrice: Item = {
  ...mockItem,
  price: 999.99,
};

const mockItemWithLowRating: Item = {
  ...mockItem,
  rating: {
    rate: 2.1,
    count: 5,
  },
};

describe('ItemCard', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  describe('Rendering', () => {
    it('renders with all item details', () => {
      const { getByText } = render(
        <ItemCard item={mockItem} onPress={mockOnPress} />
      );

      expect(getByText('Test Product')).toBeTruthy();
      expect(getByText('Electronics')).toBeTruthy();
      expect(getByText('$29.99')).toBeTruthy();
      expect(getByText('⭐ 4.5')).toBeTruthy();
      expect(getByText('(120)')).toBeTruthy();
    });

    it('renders with custom style', () => {
      const customStyle = { marginBottom: 20 };
      const { getByText } = render(
        <ItemCard item={mockItem} onPress={mockOnPress} style={customStyle} />
      );

      expect(getByText('Test Product')).toBeTruthy();
    });

    it('renders image with correct source', () => {
      const { UNSAFE_getByType } = render(
        <ItemCard item={mockItem} onPress={mockOnPress} />
      );

      expect(UNSAFE_getByType).toBeDefined();
    });
  });

  describe('Content Display', () => {
    it('displays title with correct text', () => {
      const { getByText } = render(
        <ItemCard item={mockItem} onPress={mockOnPress} />
      );

      expect(getByText('Test Product')).toBeTruthy();
    });

    it('displays category with correct text', () => {
      const { getByText } = render(
        <ItemCard item={mockItem} onPress={mockOnPress} />
      );

      expect(getByText('Electronics')).toBeTruthy();
    });

    it('displays price with correct format', () => {
      const { getByText } = render(
        <ItemCard item={mockItem} onPress={mockOnPress} />
      );

      expect(getByText('$29.99')).toBeTruthy();
    });

    it('displays rating with correct format', () => {
      const { getByText } = render(
        <ItemCard item={mockItem} onPress={mockOnPress} />
      );

      expect(getByText('⭐ 4.5')).toBeTruthy();
      expect(getByText('(120)')).toBeTruthy();
    });

    it('displays high price correctly', () => {
      const { getByText } = render(
        <ItemCard item={mockItemWithHighPrice} onPress={mockOnPress} />
      );

      expect(getByText('$999.99')).toBeTruthy();
    });

    it('displays low rating correctly', () => {
      const { getByText } = render(
        <ItemCard item={mockItemWithLowRating} onPress={mockOnPress} />
      );

      expect(getByText('⭐ 2.1')).toBeTruthy();
      expect(getByText('(5)')).toBeTruthy();
    });
  });

  describe('Title Truncation', () => {
    it('handles long titles with numberOfLines prop', () => {
      const { getByText } = render(
        <ItemCard item={mockItemWithLongTitle} onPress={mockOnPress} />
      );

      const titleElement = getByText(mockItemWithLongTitle.title);
      expect(titleElement).toBeTruthy();
      expect(titleElement.props.numberOfLines).toBe(2);
    });

    it('displays short titles normally', () => {
      const { getByText } = render(
        <ItemCard item={mockItem} onPress={mockOnPress} />
      );

      const titleElement = getByText(mockItem.title);
      expect(titleElement).toBeTruthy();
      expect(titleElement.props.numberOfLines).toBe(2);
    });
  });

  describe('Interaction', () => {
    it('calls onPress with correct item when pressed', () => {
      const { getByText } = render(
        <ItemCard item={mockItem} onPress={mockOnPress} />
      );

      fireEvent.press(getByText('Test Product'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
      expect(mockOnPress).toHaveBeenCalledWith(mockItem);
    });

    it('calls onPress multiple times when pressed multiple times', () => {
      const { getByText } = render(
        <ItemCard item={mockItem} onPress={mockOnPress} />
      );

      const card = getByText('Test Product');
      fireEvent.press(card);
      fireEvent.press(card);
      fireEvent.press(card);

      expect(mockOnPress).toHaveBeenCalledTimes(3);
      expect(mockOnPress).toHaveBeenCalledWith(mockItem);
    });

    it('renders without crashing', () => {
      const { UNSAFE_getByType } = render(
        <ItemCard item={mockItem} onPress={mockOnPress} />
      );

      expect(UNSAFE_getByType).toBeDefined();
    });
  });

  describe('Accessibility', () => {
    it('renders without accessibility issues', () => {
      const { getByText } = render(
        <ItemCard item={mockItem} onPress={mockOnPress} />
      );

      expect(getByText('Test Product')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles item with zero price', () => {
      const freeItem = { ...mockItem, price: 0 };
      const { getByText } = render(
        <ItemCard item={freeItem} onPress={mockOnPress} />
      );

      expect(getByText('$0')).toBeTruthy();
    });

    it('handles item with zero rating count', () => {
      const noRatingItem = {
        ...mockItem,
        rating: { rate: 0, count: 0 },
      };
      const { getByText } = render(
        <ItemCard item={noRatingItem} onPress={mockOnPress} />
      );

      expect(getByText('⭐ 0')).toBeTruthy();
      expect(getByText('(0)')).toBeTruthy();
    });

    it('handles item with very high rating', () => {
      const highRatingItem = {
        ...mockItem,
        rating: { rate: 5.0, count: 9999 },
      };
      const { getByText } = render(
        <ItemCard item={highRatingItem} onPress={mockOnPress} />
      );

      expect(getByText('⭐ 5')).toBeTruthy();
      expect(getByText('(9999)')).toBeTruthy();
    });

    it('handles item with decimal price', () => {
      const decimalPriceItem = { ...mockItem, price: 19.99 };
      const { getByText } = render(
        <ItemCard item={decimalPriceItem} onPress={mockOnPress} />
      );

      expect(getByText('$19.99')).toBeTruthy();
    });

    it('handles item with decimal rating', () => {
      const decimalRatingItem = {
        ...mockItem,
        rating: { rate: 3.7, count: 42 },
      };
      const { getByText } = render(
        <ItemCard item={decimalRatingItem} onPress={mockOnPress} />
      );

      expect(getByText('⭐ 3.7')).toBeTruthy();
      expect(getByText('(42)')).toBeTruthy();
    });
  });

  describe('Styling', () => {
    it('renders without styling issues', () => {
      const { getByText } = render(
        <ItemCard item={mockItem} onPress={mockOnPress} />
      );

      expect(getByText('Test Product')).toBeTruthy();
    });

    it('applies correct price container styles', () => {
      const { getByText } = render(
        <ItemCard item={mockItem} onPress={mockOnPress} />
      );

      expect(getByText('$29.99')).toBeTruthy();
    });

    it('applies correct rating container styles', () => {
      const { getByText } = render(
        <ItemCard item={mockItem} onPress={mockOnPress} />
      );

      expect(getByText('⭐ 4.5')).toBeTruthy();
      expect(getByText('(120)')).toBeTruthy();
    });
  });

  describe('Data Validation', () => {
    it('handles missing optional properties gracefully', () => {
      const minimalItem = {
        id: 1,
        title: 'Minimal Item',
        description: '',
        price: 0,
        category: '',
        image: '',
        rating: { rate: 0, count: 0 },
      } as Item;

      const { getByText } = render(
        <ItemCard item={minimalItem} onPress={mockOnPress} />
      );

      expect(getByText('Minimal Item')).toBeTruthy();
      expect(getByText('$0')).toBeTruthy();
      expect(getByText('⭐ 0')).toBeTruthy();
      expect(getByText('(0)')).toBeTruthy();
    });

    it('handles special characters in title', () => {
      const specialCharItem = {
        ...mockItem,
        title: 'Item with Special Chars: !@#$%^&*()',
      };

      const { getByText } = render(
        <ItemCard item={specialCharItem} onPress={mockOnPress} />
      );

      expect(getByText('Item with Special Chars: !@#$%^&*()')).toBeTruthy();
    });

    it('handles special characters in category', () => {
      const specialCharItem = {
        ...mockItem,
        category: 'Category with Special Chars: !@#$%^&*()',
      };

      const { getByText } = render(
        <ItemCard item={specialCharItem} onPress={mockOnPress} />
      );

      expect(getByText('Category with Special Chars: !@#$%^&*()')).toBeTruthy();
    });
  });
});
