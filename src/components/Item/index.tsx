import React, { useState } from 'react';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { green } from '@mui/material/colors';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { getLocalTodo, setLocalTodo } from '../utils/localstorage';
import { Todo } from '../type/Todo';
import './index.css';

type IProps = {
  todo: Todo;
  setTodolist: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleDelete: (todo: Todo) => void;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const Item: React.FC<IProps> = ({ todo, setTodolist, handleDelete }) => {
  const [input, setInput] = useState('');
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const labelitemCheckId = `${todo.id}`;
  const labelEidtButtonId = `edit${todo.id}`;
  const labelDeleteButtonId = `delete${todo.id}`;
  const [openMessage, setOpenMessage] = React.useState(false);

  const handleMessageOpen = () => {
    setOpenMessage(true);
  };

  const handleMessageClose = () => {
    setOpenMessage(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const editClickOpen = (list: Todo) => {
    setEditOpen(true);
    setInput(list.name);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editClose = () => {
    setInput('');
    setErrorOpen(false);
    setEditOpen(false);
  };

  const handleOnEdit = (list: Todo) => {
    if (input.trim() === '') {
      setErrorOpen(true);
      setInput('');

      return;
    }
    setErrorOpen(false);
    const allOldTodo: Todo[] = getLocalTodo();
    const newTodo: Todo[] = allOldTodo.map((todoObj: Todo) =>
      todoObj.id === list.id ? { ...list, name: input } : todoObj,
    );
    setLocalTodo(newTodo);
    setTodolist(getLocalTodo());
    setEditOpen(false);
  };

  const todoChangeOnEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleDone = (list: Todo) => {
    const allOldTodo: Todo[] = getLocalTodo();
    const newTodo: Todo[] = allOldTodo.map((todoObj: Todo) =>
      todoObj.id === list.id ? { ...list, done: !list.done } : todoObj,
    );
    setLocalTodo(newTodo);
    setTodolist(getLocalTodo());
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#b71c1c',
      },
      secondary: green,
    },
  });

  return (
    <li
      style={{
        backgroundColor: todo.done ? '#212121' : '#464646',
        color: todo.done ? 'white' : 'black',
      }}
    >
      <Grid>
        <label htmlFor={labelitemCheckId}>
          <FormGroup>
            <FormControlLabel
              style={{
                textDecoration: todo.done ? 'line-through' : 'none',
                color: todo.done ? 'white' : '#f57c00',
                textAlign: 'center',
              }}
              onChange={() => handleDone(todo)}
              control={
                <Checkbox
                  color="default"
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 20 },
                    color: '#bcaaa4',
                  }}
                  id={labelitemCheckId}
                  data-testid="testid"
                  checked={todo.done}
                />
              }
              label={todo.name}
            />
            {}
          </FormGroup>
        </label>
      </Grid>
      <ThemeProvider theme={theme}>
        <Button
          type="button"
          sx={{ right: '-75px' }}
          name={labelDeleteButtonId}
          aria-label={labelDeleteButtonId}
          onClick={() => handleClickOpen()}
        >
          <Tooltip title="削除" placement="right-start" arrow>
            <DeleteIcon
              sx={{
                color: todo.done ? '#212121' : '#212121',
                fontSize: 25,
              }}
            />
          </Tooltip>
        </Button>
        <Button
          type="button"
          name={labelEidtButtonId}
          aria-label={labelEidtButtonId}
          sx={{ right: '-50px' }}
          onClick={todo.done === true ? handleMessageOpen : () => editClickOpen(todo)}
        ><Snackbar
        open={openMessage}
        autoHideDuration={3000}
        onClose={handleMessageClose}
      >
        <Alert 
        severity="warning" 
        sx={{ width: '100%' }}>
      チェックしたTODOは編集できません!
    </Alert>
    </Snackbar>
          <Tooltip title="編集" placement="right-start" arrow>
            <EditIcon
              sx={{
                color: '#2e7d32',
                fontSize: 25,
              }}
            />
          </Tooltip>
        </Button>
        <Box
          textAlign="right"
          sx={{
            color: todo.done ? 'white' : '#f57c00',
            textDecoration: todo.done ? 'line-through' : 'none',
          }}
          fontSize="15px"
        >
          {todo.date}
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">削除確認</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              チェックしたTODOを削除しますか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus sx={{ color: '#2196f3' }}>
              キャンセル
            </Button>
            <Button
              onClick={() => handleDelete(todo)}
              autoFocus
              sx={{ color: '#2196f3' }}
            >
              削除
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={editOpen}
          onClose={editClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">編集確認</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="testid02"
              aria-label="test02"
              defaultValue={todo.name}
              name="input2"
              inputProps={{
                style: { fontSize: 35 },
                maxLength: 25,
                pattern: '/^[a-zA-Z0-9!-/:-@¥[-`{-~ ]*$/',
              }}
              type="text"
              onChange={todoChangeOnEdit}
              fullWidth
              variant="standard"
            />
            <Box textAlign="right" color="red" fontSize="15px">
              {errorOpen === true ? 'TODOを入力してください' : '　　　'}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={editClose} autoFocus sx={{ color: '#2196f3' }}>
              キャンセル
            </Button>
            <Button
              onClick={() => handleOnEdit(todo)}
              autoFocus
              sx={{ color: '#2196f3' }}
            >
              編集
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </li>
  );
};

export default Item;
