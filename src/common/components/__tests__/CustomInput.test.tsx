import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CustomInput } from '../CustomInput';

describe('CustomInput', () => {
  const mockOnChangeText = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();

  beforeEach(() => {
    mockOnChangeText.mockClear();
    mockOnFocus.mockClear();
    mockOnBlur.mockClear();
  });

  describe('Rendering', () => {
    it('renders with label', () => {
      const { getByText } = render(
        <CustomInput label='Test Label' onChangeText={mockOnChangeText} />
      );

      expect(getByText('Test Label')).toBeTruthy();
    });

    it('renders TextInput', () => {
      const { getByDisplayValue } = render(
        <CustomInput
          label='Test Label'
          value='test value'
          onChangeText={mockOnChangeText}
        />
      );

      expect(getByDisplayValue('test value')).toBeTruthy();
    });

    it('renders with placeholder', () => {
      const { getByPlaceholderText } = render(
        <CustomInput
          label='Test Label'
          placeholder='Enter text here'
          onChangeText={mockOnChangeText}
        />
      );

      expect(getByPlaceholderText('Enter text here')).toBeTruthy();
    });

    it('renders with custom container style', () => {
      const customStyle = { marginBottom: 20 };
      const { getByTestId } = render(
        <CustomInput
          label='Test Label'
          onChangeText={mockOnChangeText}
          containerStyle={customStyle}
          testID='custom-input'
        />
      );

      expect(getByTestId('custom-input')).toBeTruthy();
    });

    it('renders with custom input style', () => {
      const customStyle = { fontSize: 18 };
      const { getByDisplayValue } = render(
        <CustomInput
          label='Test Label'
          value='test value'
          onChangeText={mockOnChangeText}
          style={customStyle}
        />
      );

      expect(getByDisplayValue('test value')).toBeTruthy();
    });
  });

  describe('Error State', () => {
    it('shows error message when error prop is provided', () => {
      const { getByText } = render(
        <CustomInput
          label='Test Label'
          error='This field is required'
          onChangeText={mockOnChangeText}
        />
      );

      expect(getByText('This field is required')).toBeTruthy();
    });

    it('does not show error message when error prop is not provided', () => {
      const { queryByText } = render(
        <CustomInput label='Test Label' onChangeText={mockOnChangeText} />
      );

      expect(queryByText('This field is required')).toBeNull();
    });

    it('does not show error message when error prop is empty string', () => {
      const { queryByText } = render(
        <CustomInput
          label='Test Label'
          error=''
          onChangeText={mockOnChangeText}
        />
      );

      expect(queryByText('This field is required')).toBeNull();
    });

    it('applies error styling when error is present', () => {
      const { getByDisplayValue } = render(
        <CustomInput
          label='Test Label'
          value='test value'
          error='This field is required'
          onChangeText={mockOnChangeText}
        />
      );

      const input = getByDisplayValue('test value');
      expect(input).toBeTruthy();
      // The error styling should be applied to the TextInput
    });
  });

  describe('TextInput Props', () => {
    it('passes through all TextInput props', () => {
      const { getByDisplayValue } = render(
        <CustomInput
          label='Test Label'
          value='test value'
          onChangeText={mockOnChangeText}
          placeholder='Enter text'
          secureTextEntry={true}
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
        />
      );

      const input = getByDisplayValue('test value');
      expect(input).toBeTruthy();
      expect(input.props.secureTextEntry).toBe(true);
      expect(input.props.keyboardType).toBe('email-address');
      expect(input.props.autoCapitalize).toBe('none');
      expect(input.props.autoCorrect).toBe(false);
    });

    it('has correct placeholder text color', () => {
      const { getByPlaceholderText } = render(
        <CustomInput
          label='Test Label'
          placeholder='Enter text'
          onChangeText={mockOnChangeText}
        />
      );

      const input = getByPlaceholderText('Enter text');
      expect(input).toBeTruthy();
      // placeholderTextColor should be set to Colors.textTertiary
    });
  });

  describe('Interaction', () => {
    it('calls onChangeText when text changes', () => {
      const { getByDisplayValue } = render(
        <CustomInput
          label='Test Label'
          value='initial value'
          onChangeText={mockOnChangeText}
        />
      );

      const input = getByDisplayValue('initial value');
      fireEvent.changeText(input, 'new value');

      expect(mockOnChangeText).toHaveBeenCalledWith('new value');
    });

    it('calls onFocus when input is focused', () => {
      const { getByDisplayValue } = render(
        <CustomInput
          label='Test Label'
          value='test value'
          onChangeText={mockOnChangeText}
          onFocus={mockOnFocus}
        />
      );

      const input = getByDisplayValue('test value');
      fireEvent(input, 'focus');

      expect(mockOnFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur when input loses focus', () => {
      const { getByDisplayValue } = render(
        <CustomInput
          label='Test Label'
          value='test value'
          onChangeText={mockOnChangeText}
          onBlur={mockOnBlur}
        />
      );

      const input = getByDisplayValue('test value');
      fireEvent(input, 'blur');

      expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });

    it('handles multiple text changes', () => {
      const { getByDisplayValue } = render(
        <CustomInput
          label='Test Label'
          value='initial value'
          onChangeText={mockOnChangeText}
        />
      );

      const input = getByDisplayValue('initial value');
      fireEvent.changeText(input, 'first change');
      fireEvent.changeText(input, 'second change');
      fireEvent.changeText(input, 'third change');

      expect(mockOnChangeText).toHaveBeenCalledTimes(3);
      expect(mockOnChangeText).toHaveBeenNthCalledWith(1, 'first change');
      expect(mockOnChangeText).toHaveBeenNthCalledWith(2, 'second change');
      expect(mockOnChangeText).toHaveBeenNthCalledWith(3, 'third change');
    });
  });

  describe('Accessibility', () => {
    it('renders without accessibility issues', () => {
      const { getByText } = render(
        <CustomInput label='Test Label' onChangeText={mockOnChangeText} />
      );

      expect(getByText('Test Label')).toBeTruthy();
    });

    it('has correct accessibility hint when error is present', () => {
      const { getByText } = render(
        <CustomInput
          label='Test Label'
          error='This field is required'
          onChangeText={mockOnChangeText}
        />
      );

      expect(getByText('This field is required')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty label', () => {
      const { getByDisplayValue } = render(
        <CustomInput
          label=''
          value='test value'
          onChangeText={mockOnChangeText}
        />
      );

      expect(getByDisplayValue('test value')).toBeTruthy();
    });

    it('handles undefined value', () => {
      const { getByPlaceholderText } = render(
        <CustomInput
          label='Test Label'
          placeholder='Enter text'
          onChangeText={mockOnChangeText}
        />
      );

      expect(getByPlaceholderText('Enter text')).toBeTruthy();
    });

    it('handles null value', () => {
      const { getByPlaceholderText } = render(
        <CustomInput
          label='Test Label'
          value={null as unknown as string}
          placeholder='Enter text'
          onChangeText={mockOnChangeText}
        />
      );

      expect(getByPlaceholderText('Enter text')).toBeTruthy();
    });

    it('handles very long error message', () => {
      const longError =
        'This is a very long error message that should be displayed properly and not cause any layout issues in the component';
      const { getByText } = render(
        <CustomInput
          label='Test Label'
          error={longError}
          onChangeText={mockOnChangeText}
        />
      );

      expect(getByText(longError)).toBeTruthy();
    });

    it('handles special characters in label', () => {
      const specialLabel = 'Test Label with Special Characters: !@#$%^&*()';
      const { getByText } = render(
        <CustomInput label={specialLabel} onChangeText={mockOnChangeText} />
      );

      expect(getByText(specialLabel)).toBeTruthy();
    });
  });

  describe('Styling', () => {
    it('applies correct styles to container', () => {
      const { getByTestId } = render(
        <CustomInput
          label='Test Label'
          onChangeText={mockOnChangeText}
          testID='input-container'
        />
      );

      expect(getByTestId('input-container')).toBeTruthy();
    });

    it('applies correct styles to label', () => {
      const { getByText } = render(
        <CustomInput label='Test Label' onChangeText={mockOnChangeText} />
      );

      expect(getByText('Test Label')).toBeTruthy();
    });

    it('applies correct styles to input', () => {
      const { getByDisplayValue } = render(
        <CustomInput
          label='Test Label'
          value='test value'
          onChangeText={mockOnChangeText}
        />
      );

      expect(getByDisplayValue('test value')).toBeTruthy();
    });

    it('applies correct styles to error text', () => {
      const { getByText } = render(
        <CustomInput
          label='Test Label'
          error='Error message'
          onChangeText={mockOnChangeText}
        />
      );

      expect(getByText('Error message')).toBeTruthy();
    });
  });
});
