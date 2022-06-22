import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@mui/material';
import { getLocalTodo, setLocalTodo } from '../utils/localstorage';
import { Todo } from '../type/Todo';
import './index.css';

type IProps = {
  todolist: Todo[];
  setTodolist: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const CountTodo: React.FC<IProps> = ({ todolist, setTodolist }) => {
  const doneCount = todolist.reduce(
    (previous, todo) => previous + (todo.done ? 1 : 0),
    0,
  );
  const allCount = todolist.length;
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const labelCountTodoId = 'label_count_todo';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isAllChecked = (): boolean =>
    !!(doneCount === allCount && allCount !== 0);

  const toggleCheckAll = (done: boolean) => {
    const allOldTodo: Todo[] = getLocalTodo();
    const newTodo: Todo[] = allOldTodo.map((todoObj: Todo) => ({
      ...todoObj,
      done,
    }));
    setLocalTodo(newTodo);
    setTodolist(getLocalTodo());
  };

  const deleteDone = () => {
    const allOldTodo: Todo[] = getLocalTodo();
    const newTodo: Todo[] = allOldTodo.filter((todoObj: Todo) => !todoObj.done);
    setLocalTodo(newTodo);
    setTodolist(getLocalTodo());
    setOpen(false);
  };

  return (
    <div className="todo-counttodo">
      <Grid>
        <label htmlFor={labelCountTodoId}>
          <input
            type="checkbox"
            className="checkbox"
            id={labelCountTodoId}
            name="checkbox"
            ref={checkboxRef}
            onChange={() => toggleCheckAll(checkboxRef.current!.checked)}
            checked={isAllChecked()}
          />
          <span
            style={{
              color: '#f57c00',
              fontSize: '18px',
            }}
          >
            <span> TODO：{doneCount}</span> / {allCount}
          </span>
        </label>
        <Button
          sx={{ fontSize: 15 }}
          variant="contained"
          startIcon={<DeleteIcon />}
          color="secondary"
          type="button"
          onClick={() => handleClickOpen()}
          className="btn btn-danger"
        >
          チェックしたTODOを削除
        </Button>
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
            <Button onClick={deleteDone} autoFocus sx={{ color: '#2196f3' }}>
              削除
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
};

export default CountTodo;
