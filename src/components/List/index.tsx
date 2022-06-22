import React from 'react';
import { Box, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import { getLocalTodo, setLocalTodo } from '../utils/localstorage';
import Item from '../Item/index';
import { Todo } from '../type/Todo';

type IProps = {
  todolist: Todo[];
  setTodolist: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const List: React.FC<IProps> = ({ todolist, setTodolist }) => {
  const handleDelete = (list: Todo) => {
    const allOldTodo: Todo[] = getLocalTodo();
    const newTodo: Todo[] = allOldTodo.filter(
      (todoObj: Todo) => todoObj.id !== list.id,
    );
    setLocalTodo(newTodo);
    setTodolist(getLocalTodo());
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxHeight: 440,
        overflow: 'auto',
        borderTopColor: 'white',
      }}
    >
      <div style={{ width: '710px' }}>
        {todolist.map((todo) => (
          <ListItemText key={todo.id}>
            <Divider light />
            <Item
              key={todo.id}
              todo={todo}
              setTodolist={setTodolist}
              handleDelete={handleDelete}
            />
            <Divider />
          </ListItemText>
        ))}
      </div>
    </Box>
  );
};

export default List;
