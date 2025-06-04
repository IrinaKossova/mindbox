import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

interface TodoListProps {
  todos: { id: number; text: string; completed: boolean }[];
  onToggle: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle }) => {
  return (
    <List>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={onToggle}
        />
      ))}
    </List>
  );
};

export default TodoList;