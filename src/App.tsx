import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import AddTodo from './components/AddTodo';
import List from './components/List';
import CountTodo from './components/CountTodo';
import { getLocalTodo } from './components/utils/localstorage';
import { Todo } from './components/type/Todo';
import Background from './102.jpeg';
import './App.css';

const App: React.VFC = () => {
  const [todolist, setTodolist] = useState<Todo[]>([]);

  useEffect((): void => {
    setTodolist(getLocalTodo());
  }, []);

  const sectionStyle = {
    width: '100%',
    height: '1000px',
    backgroundImage: `url(${Background})`,
  };

  return (
    <section style={sectionStyle}>
      <div
        style={{ backgroundImage: `url(./102.jpeg)` }}
        className="todo-container"
      >
        <div className="todo-wrap">
          <h1 className="todo-text">TODOLIST</h1>
          <h1 className="tsk-text">25文字以内で入力してください</h1>
          <AddTodo todolist={todolist} setTodolist={setTodolist} />
          <br />
          {todolist.length !== 0 ? (
            <div>
              <List todolist={todolist} setTodolist={setTodolist} />
              <br />
              <CountTodo todolist={todolist} setTodolist={setTodolist} />
            </div>
          ) : (
            <Box textAlign="center">
              <h1 className="list-text">TODOはありません</h1>
            </Box>
          )}
        </div>
      </div>
    </section>
  );
};

export default App;
