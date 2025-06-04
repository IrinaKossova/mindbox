import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoInput from './TodoInput';
import userEvent from '@testing-library/user-event';

test('renders input with correct placeholder', () => {
  render(<TodoInput value="" onChange={() => {}} onAdd={() => {}} />);
  const inputElement = screen.getByPlaceholderText('What needs to be done?');
  expect(inputElement).toBeInTheDocument();
});

test('calls onChange when typing in input', () => {
  const mockOnChange = jest.fn();
  render(<TodoInput value="" onChange={mockOnChange} onAdd={() => {}} />);
  const inputElement = screen.getByPlaceholderText('What needs to be done?');
  fireEvent.change(inputElement, { target: { value: 'Test' } });
  expect(mockOnChange).toHaveBeenCalledTimes(1);
  expect(mockOnChange).toHaveBeenCalledWith('Test');
});

test('limits input to 250 characters', async () => {
  const mockOnChange = jest.fn();
  render(<TodoInput value="" onChange={mockOnChange} onAdd={() => {}} />);
  const inputElement = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;
  const longText = 'a'.repeat(251);
  await userEvent.type(inputElement, longText);
  expect(mockOnChange).toHaveBeenCalled();
  expect(inputElement.value).toHaveLength(250);
});

test('calls onAdd when Enter is pressed', async () => {
  const mockOnAdd = jest.fn();
  const initialValue = "Test todo";
  render(<TodoInput value={initialValue} onChange={() => {}} onAdd={mockOnAdd} />);
  const inputElement = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;
  await userEvent.type(inputElement, initialValue);
  fireEvent.keyDown(inputElement, { key: 'Enter' });
  expect(mockOnAdd).toHaveBeenCalledTimes(1);
});


test('calls onAdd when clicking InputWrapper', () => {
  const mockOnAdd = jest.fn();
  const initialValue = "Test todo";
  render(<TodoInput value={initialValue} onChange={() => {}} onAdd={mockOnAdd} />);
  const inputWrapper = screen.getByTestId('input-wrapper');
  fireEvent.click(inputWrapper);
  expect(mockOnAdd).toHaveBeenCalledTimes(1);
});

test('changes state on input focus', () => {
  render(<TodoInput value="" onChange={() => {}} onAdd={() => {}} />);
  const inputElement = screen.getByPlaceholderText('What needs to be done?');
  const arrowElement = screen.getByTestId('arrow');
  fireEvent.focus(inputElement);
  expect(arrowElement).toHaveClass('active');
});

test('changes state on input blur', () => {
  render(<TodoInput value="" onChange={() => {}} onAdd={() => {}} />);
  const inputElement = screen.getByPlaceholderText('What needs to be done?');
  const arrowElement = screen.getByTestId('arrow');

  fireEvent.focus(inputElement);
  fireEvent.blur(inputElement);

  expect(arrowElement).not.toHaveClass('active');
});

test('displays value from props', () => {
  const initialValue = 'Initial todo value';
  render(<TodoInput value={initialValue} onChange={() => {}} onAdd={() => {}} />);
  const inputElement = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;
  expect(inputElement.value).toBe(initialValue);
});

test('calls onAdd only with non-empty value', () => {
  const mockOnAdd = jest.fn();
  render(<TodoInput value="" onChange={() => {}} onAdd={mockOnAdd} />);
  const inputElement = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;
  const inputWrapper = screen.getByTestId('input-wrapper');

  fireEvent.click(inputWrapper);
  expect(mockOnAdd).not.toHaveBeenCalled();

  fireEvent.change(inputElement, { target: { value: 'Test' } });
  fireEvent.click(inputWrapper);
  expect(mockOnAdd).toHaveBeenCalledTimes(1);
});

test('clears input after adding a task', () => {
  const onAdd = jest.fn();
  const onChange = jest.fn();
  render(<TodoInput value="" onChange={onChange} onAdd={onAdd} />);

  const inputElement = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: 'New task' } });
  fireEvent.keyDown(inputElement, { key: 'Enter' });

  expect(onAdd).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith('');
  expect(inputElement.value).toBe('');
});