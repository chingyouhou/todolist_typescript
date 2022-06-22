import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, Paper } from '@mui/material';
import { getLocalTodo, setLocalTodo } from '../utils/localstorage';
import { Todo } from '../type/Todo';
import './index.css';

type IProps = {
  todolist: Todo[];
  setTodolist: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const AddTodo: React.FC<IProps> = ({ todolist, setTodolist }) => {
  const [input, setInput] = useState('');
  const [open, setOpen] = React.useState(false);

  const addTodo = () => {
    if (input.trim() === '') {
      setOpen(true);
      setInput('');

      return;
    }
    setOpen(false);
    const todoDate = new Date();
    const todotime = `${todoDate.getFullYear()}年${
      todoDate.getMonth() + 1
    }月${todoDate.getDate()}日`;
    const newTask: Todo = {
      id: Date.now(),
      name: input,
      done: false,
      date: todotime,
    };
    setLocalTodo([newTask, ...todolist]);
    setTodolist(getLocalTodo());
    setInput('');
  };

  const todoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <Paper
        sx={{
          '& > :not(style)': { m: 0, width: '100%' },
        }}
      >
        <TextField
          id="testid01"
          aria-label="test01"
          name="input1"
          variant="filled"
          inputProps={{
            style: { fontSize: 35 },
            maxLength: 25,
            pattern: '/^[a-zA-Z0-9!-/:-@¥[-`{-~ ]*$/',
          }}
          style={{
            backgroundColor: 'white',
          }}
          margin="normal"
          focused
          value={input}
          onChange={todoChange}
        />
      </Paper>
      <Box textAlign="right" color="red" fontSize="15px">
        {open === true ? 'TODOを入力してください' : '　　　'}
      </Box>
      <br />
      <Box textAlign="center">
        <Button
          color="warning"
          variant="contained"
          onClick={addTodo}
          sx={{ fontSize: 25 }}
          startIcon={<AddCircleIcon sx={{ fontSize: 25 }} />}
        >
          ADD
        </Button>
      </Box>
    </div>
  );
};

export default AddTodo;
