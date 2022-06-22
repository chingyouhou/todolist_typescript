import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Todo } from '../type/Todo';
import Header from './index';

const firstState: Todo[] = [];

test('header test 入力欄（最初の状態）の確認', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <Header todolist={todolist} setTodolist={setTodolist} />;
  };
  const { container } = render(<Wrapper />);

  const inputNode = container.querySelector(
    `input[name="input1"]`,
  ) as HTMLInputElement;

  expect(inputNode.value).toBe('');
});

test('header test 入力欄に"タスク１"を入力', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <Header todolist={todolist} setTodolist={setTodolist} />;
  };
  const { container } = render(<Wrapper />);

  const inputNode = container.querySelector(
    `input[name="input1"]`,
  ) as HTMLInputElement;

  userEvent.type(inputNode, 'タスク１');
  expect(inputNode).toHaveValue('タスク１');
});

test('header test 入力欄に"タスク１"を入力、「ADD」ボタンを押す', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <Header todolist={todolist} setTodolist={setTodolist} />;
  };
  const { container } = render(<Wrapper />);

  const inputNode = container.querySelector(
    `input[name="input1"]`,
  ) as HTMLInputElement;

  userEvent.type(inputNode, 'タスク１');
  expect(inputNode).toHaveValue('タスク１');

  const addButton = screen.getByRole('button', { name: 'ADD' });
  fireEvent.click(addButton);
  expect(inputNode.value).toBe('');
});

test('header test NULLの場合', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <Header todolist={todolist} setTodolist={setTodolist} />;
  };
  const { container } = render(<Wrapper />);

  const inputNode = container.querySelector(
    `input[name="input1"]`,
  ) as HTMLInputElement;

  const addButton = screen.getByRole('button', { name: 'ADD' });
  fireEvent.click(addButton);

  expect(inputNode.value).toBe('');
});

test('header test スペースのみの場合', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <Header todolist={todolist} setTodolist={setTodolist} />;
  };
  const { container } = render(<Wrapper />);

  const inputNode = container.querySelector(
    `input[name="input1"]`,
  ) as HTMLInputElement;

  userEvent.type(inputNode, '   ');
  expect(inputNode).toHaveValue('   ');

  const addButton = screen.getByRole('button', { name: 'ADD' });
  fireEvent.click(addButton);

  expect(inputNode.value).toBe('');
});
