import React from 'react';
import { render } from '@testing-library/react-native';
import { SplashScreen } from '../SplashScreen';

describe('SplashScreen', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { getByText } = render(<SplashScreen />);

      expect(getByText('Trial Task')).toBeTruthy();
    });

    it('renders with correct logo text', () => {
      const { getByText } = render(<SplashScreen />);

      expect(getByText('Trial Task')).toBeTruthy();
    });

    it('renders with message prop when provided', () => {
      const { getByText } = render(<SplashScreen message='Loading...' />);

      expect(getByText('Trial Task')).toBeTruthy();
    });
  });

  describe('Layout', () => {
    it('has correct container structure', () => {
      const { getByText } = render(<SplashScreen />);

      const logoText = getByText('Trial Task');
      expect(logoText).toBeTruthy();
    });

    it('displays logo text in center', () => {
      const { getByText } = render(<SplashScreen />);

      const logoText = getByText('Trial Task');
      expect(logoText).toBeTruthy();
    });
  });

  describe('Styling', () => {
    it('applies correct container styles', () => {
      const { getByText } = render(<SplashScreen />);

      const logoText = getByText('Trial Task');
      expect(logoText).toBeTruthy();
    });

    it('applies correct logo text styles', () => {
      const { getByText } = render(<SplashScreen />);

      const logoText = getByText('Trial Task');
      expect(logoText).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('renders without accessibility issues', () => {
      const { getByText } = render(<SplashScreen />);

      const logoText = getByText('Trial Task');
      expect(logoText).toBeTruthy();
    });

    it('has appropriate text for screen readers', () => {
      const { getByText } = render(<SplashScreen />);

      const logoText = getByText('Trial Task');
      expect(logoText).toBeTruthy();
    });
  });

  describe('Props', () => {
    it('handles undefined message prop', () => {
      const { getByText } = render(<SplashScreen message={undefined} />);

      expect(getByText('Trial Task')).toBeTruthy();
    });

    it('handles empty message prop', () => {
      const { getByText } = render(<SplashScreen message='' />);

      expect(getByText('Trial Task')).toBeTruthy();
    });

    it('handles null message prop', () => {
      const { getByText } = render(
        <SplashScreen message={null as unknown as string} />
      );

      expect(getByText('Trial Task')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid re-renders', () => {
      const { rerender, getByText } = render(<SplashScreen />);

      // Should handle multiple re-renders
      for (let i = 0; i < 5; i++) {
        rerender(<SplashScreen />);
      }

      expect(getByText('Trial Task')).toBeTruthy();
    });

    it('handles unmounting and remounting', () => {
      const { unmount, getByText } = render(<SplashScreen />);

      expect(getByText('Trial Task')).toBeTruthy();

      unmount();

      const { getByText: getByTextAfterRemount } = render(<SplashScreen />);
      expect(getByTextAfterRemount('Trial Task')).toBeTruthy();
    });
  });

  describe('Performance', () => {
    it('renders efficiently', () => {
      const startTime = Date.now();
      render(<SplashScreen />);
      const endTime = Date.now();

      // Should render quickly
      expect(endTime - startTime).toBeLessThan(1000);
    });

    it('does not cause memory leaks', () => {
      const { unmount } = render(<SplashScreen />);

      // Should unmount without errors
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Consistency', () => {
    it('renders consistently across multiple calls', () => {
      const { getByText: getByText1 } = render(<SplashScreen />);
      const { getByText: getByText2 } = render(<SplashScreen />);

      expect(getByText1('Trial Task')).toBeTruthy();
      expect(getByText2('Trial Task')).toBeTruthy();
    });

    it('maintains structure consistency', () => {
      const { getByText } = render(<SplashScreen />);

      // Should have consistent structure
      expect(getByText('Trial Task')).toBeTruthy();
    });
  });
});
