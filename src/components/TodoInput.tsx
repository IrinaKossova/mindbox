import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import type { ChangeEvent, KeyboardEvent } from 'react';

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  cursor: default;
`;

const Arrow = styled.div<{ $isActive: boolean }>`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23${(props) => (props.$isActive ? '8c8c8c' : 'e7e7e7')}' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6' stroke='%23${(props) => (props.$isActive ? '8c8c8c' : 'e7e7e7')}' stroke-width='2' fill='none'/%3E%3C/svg%3E") no-repeat center;
  background-size: contain;
  pointer-events: auto;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;

  &${(props) => props.$isActive ? '.active' : ''} {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%238c8c8c' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6' stroke='%238c8c8c' stroke-width='2' fill='none'/%3E%3C/svg%3E") no-repeat center;
  }

  &:hover {
    transform: translateY(-50%) rotate(180deg);
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23909090' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6' stroke='%23909090' stroke-width='2' fill='none'/%3E%3C/svg%3E") no-repeat center;
    background-size: contain;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 15px 15px 60px;
  font-size: 1.5em;
  border: none;
  border-bottom: 2px solid #e5e5e5;
  color: #8c8c8c;
  font-style: italic;
  font-family: 'Open Sans', sans-serif;
  background: none;
  cursor: default;
  box-sizing: border-box;
  line-height: 1.5;
  min-height: 60px;
  overflow-wrap: break-word;
  white-space: normal;

  &::placeholder {
    color: #e5e5e5;
    font-style: italic;
    overflow-wrap: break-word;
    white-space: normal;
  }

  @media (max-width: 576px) {
    &::placeholder {
      font-size: 0.9em;
    }
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #8c8c8c;
  }
`;

interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ value: initialValue, onChange, onAdd }) => {
  const [value, setValue] = useState(initialValue);
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.slice(0, 250);
      setValue(newValue);
      onChange(newValue);
    },
    [onChange],
  );
  
 const handleClick = useCallback(() => {
    if (inputRef.current && document.activeElement === inputRef.current) return;
    if (value.trim()) {
      setIsActive(true);
      onAdd();
      setValue(''); 
      onChange('');
      setTimeout(() => setIsActive(false), 200);
    }
  }, [onAdd, value, onChange]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && value.trim()) {
        setIsActive(true);
        onAdd();
        setValue(''); 
        onChange('');
        setTimeout(() => setIsActive(false), 200);
      }
    },
    [onAdd, value, onChange],
  );

  return (
    <InputWrapper data-testid="input-wrapper" onClick={handleClick}>
      <Arrow
        data-testid="arrow"
        $isActive={isActive}
        className={isActive ? 'active' : ''}
      />
      <Input
        type="text"
        placeholder="What needs to be done?"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        maxLength={250}
        ref={inputRef}
      />
    </InputWrapper>
  );
};

export default TodoInput;
