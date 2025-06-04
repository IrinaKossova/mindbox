import React from 'react';
import styled from 'styled-components';

const Item = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 2px solid #e5e5e5;
`;

const CheckboxWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  cursor: pointer;
`;

const CustomCheckbox = styled.div<{ checked: boolean }>`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
  border: 2px solid #e5e5e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  transition: background 0.2s ease;
  cursor: pointer;

  ${({ checked }) =>
    checked &&
    `
      background: none;
      &:after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 16px;
        height: 16px;
        background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 4L6 12L2 8' stroke='%23A0D3C7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: contain;
      }
    `}
`;

const Text = styled.span<{ $completed: boolean }>`
  flex-grow: 1;
  text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
  color: #8c8c8c;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.5em;
  border: none;
  background: none;

  ${({ $completed }) =>
    $completed &&
    `
      color: #e5e5e5;
    `}

  &:focus {
    outline: none;
    border-bottom: 2px solid #e5e5e5;
  }
`;

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggle }) => {
  return (
    <Item>
      <CheckboxWrapper onClick={() => onToggle(id)}>
        <HiddenCheckbox
          checked={completed}
          onChange={() => onToggle(id)}
        />
        <CustomCheckbox checked={completed} />
      </CheckboxWrapper>
      <Text $completed={completed}>{text}</Text>
    </Item>
  );
};

export default TodoItem;