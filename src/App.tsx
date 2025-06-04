import { useState, useMemo, useEffect } from 'react';
import styled, { StyleSheetManager } from 'styled-components';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';
import './index.css';

const AppContainer = styled.div`
  background-color: #f5f5f5;
  max-width: 1400px;
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 20px;
  font-family: 'Open Sans', sans-serif;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 6em;
  color: #ebdddd;
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 300;
  margin-bottom: 0;
  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

const Container = styled.div`
  background-color: white;
  border-radius: 2px;
  box-shadow: 0px 2px 4px rgb(200,200,200);

  margin-bottom: 20px;
  max-width: 40%;
  margin: 0 auto;

  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 2px;
    right: 2px;
    height: 8px;
    background: #f0f0f0;
    box-shadow: 0 -1px 3px rgb(180,180,180);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 4px;
    right: 4px;
    height: 4px;
    background: #e0e0e0;
    box-shadow: 0 -1px 4px rgb(160,160,160);
    border-bottom: 1px solid #c0c0c0;
  }

  @media (max-width: 1200px) {
    max-width: 60%;
  }

  @media (max-width: 768px) {
    max-width: 80%;
  }

  @media (max-width: 480px) {
    max-width: 95%;
  }
`;

const shouldForwardProp = (prop: string) => prop !== 'onAdd';

function App() {
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([{ id: Date.now(), text: newTodo.trim(), completed: false }, ...todos]);
      setNewTodo('');
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  return (
    <AppContainer>
      <Header>todos</Header>
      <Container>
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <TodoInput
        value={newTodo}
        onChange={setNewTodo}
        onAdd={addTodo}
        />
       </StyleSheetManager>
      <TodoList
        todos={filteredTodos}
        onToggle={toggleComplete}
      />
      <TodoFooter
        activeCount={activeTodosCount}
        filter={filter}
        onFilterChange={setFilter}
        onClearCompleted={clearCompleted}
        />
        </Container>
    </AppContainer>
  );
}

export default App;