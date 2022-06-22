import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Todo } from '../type/Todo';
import Footer from './index';

const firstState: Todo[] = [
  { id: 1001, name: 'タスクa', done: true, date: '2021年11月24日' },
  { id: 1002, name: 'タスクb', done: true, date: '2021年11月24日' },
  { id: 1003, name: 'タスクc', done: false, date: '2021年11月24日' },
  { id: 1004, name: 'タスクd', done: false, date: '2021年11月24日' },
];

test('footer test 全選択_チェックを入れるの確認', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <Footer todolist={todolist} setTodolist={setTodolist} />;
  };

  const { getByText } = render(<Wrapper />);

  expect(getByText(/TODO：2/)).toBeInTheDocument();

  const checkbox1 = screen.getByText('TODO：2');
  fireEvent.click(checkbox1);

  expect(getByText(/TODO：4/)).toBeInTheDocument();
});

test('footer test 全選択_チェックを外すの確認', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <Footer todolist={todolist} setTodolist={setTodolist} />;
  };

  const { getByText } = render(<Wrapper />);

  expect(getByText(/TODO：2/)).toBeInTheDocument();

  const checkbox1 = screen.getByText('TODO：2');
  fireEvent.click(checkbox1);

  expect(getByText(/TODO：4/)).toBeInTheDocument();

  const checkbox2 = screen.getByText('TODO：4');
  fireEvent.click(checkbox2);

  expect(getByText(/TODO：0/)).toBeInTheDocument();
});

test('footer test TODO全削除(チェックなし)の確認', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <Footer todolist={todolist} setTodolist={setTodolist} />;
  };

  const { getByText } = render(<Wrapper />);

  expect(getByText(/TODO：2/)).toBeInTheDocument();

  const checkbox1 = screen.getByText('TODO：2');
  fireEvent.click(checkbox1);

  expect(getByText(/TODO：4/)).toBeInTheDocument();

  const checkbox2 = screen.getByText('TODO：4');
  fireEvent.click(checkbox2);

  expect(getByText(/TODO：0/)).toBeInTheDocument();

  const button = screen.getByRole('button', { name: 'チェックしたTODOを削除' });
  fireEvent.click(button);

  const deleteButton1 = screen.getByRole('button', { name: '削除' });
  fireEvent.click(deleteButton1);

  expect(getByText(/TODO：0/)).toBeInTheDocument();
});

test('footer test TODO全削除(チェックなし_NO)の確認', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <Footer todolist={todolist} setTodolist={setTodolist} />;
  };

  const { getByText } = render(<Wrapper />);

  expect(getByText(/TODO：2/)).toBeInTheDocument();

  const checkbox1 = screen.getByText('TODO：2');
  fireEvent.click(checkbox1);

  expect(getByText(/TODO：4/)).toBeInTheDocument();

  const checkbox2 = screen.getByText('TODO：4');
  fireEvent.click(checkbox2);

  expect(getByText(/TODO：0/)).toBeInTheDocument();

  const button = screen.getByRole('button', { name: 'チェックしたTODOを削除' });
  fireEvent.click(button);

  const deleteButton1 = screen.getByRole('button', { name: 'キャンセル' });
  fireEvent.click(deleteButton1);

  expect(getByText(/TODO：0/)).toBeInTheDocument();
});

test('footer test TODO全削除(複数チェック)の確認', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <Footer todolist={todolist} setTodolist={setTodolist} />;
  };

  const { getByText } = render(<Wrapper />);

  expect(getByText(/TODO：2/)).toBeInTheDocument();

  const button = screen.getByRole('button', { name: 'チェックしたTODOを削除' });
  fireEvent.click(button);

  const deleteButton1 = screen.getByRole('button', { name: '削除' });
  fireEvent.click(deleteButton1);

  expect(getByText(/TODO：0/)).toBeInTheDocument();
});

test('footer test TODO全削除(複数チェック_NO)の確認', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <Footer todolist={todolist} setTodolist={setTodolist} />;
  };

  const { getByText } = render(<Wrapper />);

  expect(getByText(/TODO：2/)).toBeInTheDocument();

  const button = screen.getByRole('button', { name: 'チェックしたTODOを削除' });
  fireEvent.click(button);

  const deleteButton1 = screen.getByRole('button', { name: 'キャンセル' });
  fireEvent.click(deleteButton1);

  expect(getByText(/TODO：2/)).toBeInTheDocument();
});

test('footer test TODO全削除(全部チェック)の確認', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <Footer todolist={todolist} setTodolist={setTodolist} />;
  };

  const { getByText } = render(<Wrapper />);

  expect(getByText(/TODO：2/)).toBeInTheDocument();

  const checkbox1 = screen.getByText('TODO：2');
  fireEvent.click(checkbox1);

  expect(getByText(/TODO：4/)).toBeInTheDocument();

  const button = screen.getByRole('button', { name: 'チェックしたTODOを削除' });
  fireEvent.click(button);

  const deleteButton1 = screen.getByRole('button', { name: '削除' });
  fireEvent.click(deleteButton1);

  expect(getByText(/TODO：0/)).toBeInTheDocument();
});

test('footer test TODO全削除(全部チェック_NO)の確認', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <Footer todolist={todolist} setTodolist={setTodolist} />;
  };

  const { getByText } = render(<Wrapper />);

  expect(getByText(/TODO：2/)).toBeInTheDocument();

  const checkbox1 = screen.getByText('TODO：2');
  fireEvent.click(checkbox1);

  expect(getByText(/TODO：4/)).toBeInTheDocument();

  const button = screen.getByRole('button', { name: 'チェックしたTODOを削除' });
  fireEvent.click(button);

  const deleteButton1 = screen.getByRole('button', { name: 'キャンセル' });
  fireEvent.click(deleteButton1);

  expect(getByText(/TODO：4/)).toBeInTheDocument();
});
