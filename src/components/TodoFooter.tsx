import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #9e9e9e;
  padding: 15px;

  @media (max-width: 576px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  background-color: transparent;
  color: #9e9e9e;
  border: none;
  padding: 5px;
  margin: 0 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.8em;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    border: 1px solid #eee6e5;
  }

  ${(props) =>
    props.$active &&
    `
    border: 1px solid #eee6e5;
  `}
`;

const ItemsLeft = styled.span`
  color: #9e9e9e;
  font-size: 0.8em;

  @media (max-width: 576px) {
    margin-bottom: 5px;
  }
`;

const FilterButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  @media (max-width: 576px) {
    margin-bottom: 5px;
  }
`;

interface TodoFooterProps {
  activeCount: number;
  filter: string;
  onFilterChange: (filter: string) => void;
  onClearCompleted: () => void;
}

const TodoFooter: React.FC<TodoFooterProps> = ({ activeCount, filter, onFilterChange, onClearCompleted }) => {
  return (
    <FooterContainer>
      <ItemsLeft>{activeCount} items left</ItemsLeft>
      <FilterButtonsContainer>
        <FilterButton $active={filter === 'all'} onClick={() => onFilterChange('all')}>All</FilterButton>
        <FilterButton $active={filter === 'active'} onClick={() => onFilterChange('active')}>Active</FilterButton>
        <FilterButton $active={filter === 'completed'} onClick={() => onFilterChange('completed')}>Completed</FilterButton>
      </FilterButtonsContainer>
      <FilterButton onClick={onClearCompleted}>Clear completed</FilterButton>
    </FooterContainer>
  );
};

export default TodoFooter;