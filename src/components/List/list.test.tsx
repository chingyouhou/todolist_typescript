import React, { useState } from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { screen, render, fireEvent } from '@testing-library/react';
import { Todo } from '../type/Todo';
import List from './index';

const firstState: Todo[] = [
  { id: 1001, name: 'タスクa', done: true, date: '2021年11月24日' },
  { id: 1002, name: 'タスクb', done: true, date: '2021年11月25日' },
];

test('list test　編集の確認(OKの場合)', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <List todolist={todolist} setTodolist={setTodolist} />;
  };

  const { getByLabelText, queryByText, getByText } = render(<Wrapper />);

  expect(queryByText(/タスクa/)).toBeInTheDocument();

  const editButton = screen.getByRole('button', {
    name: /edit1001/i,
  });

  fireEvent.click(editButton);
  expect(getByText(/編集確認/)).toBeInTheDocument();

  const editNode = getByLabelText('test02').querySelector(
    'input',
  ) as HTMLInputElement;

  userEvent.clear(screen.getByRole('textbox'));
  userEvent.type(editNode, 'タスクe');
  expect(editNode).toHaveValue('タスクe');

  const okButton = screen.getByRole('button', { name: '編集' });
  fireEvent.click(okButton);
  expect(okButton.textContent).toBe('編集');

  expect(queryByText(/タスクa/)).toBeNull();
  expect(queryByText(/タスクe/)).toBeInTheDocument();
});

test('list test　編集の確認(NOの場合)', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <List todolist={todolist} setTodolist={setTodolist} />;
  };
  const { getByLabelText, queryByText, getByText } = render(<Wrapper />);

  expect(queryByText(/タスクa/)).toBeInTheDocument();

  const editButton = screen.getByRole('button', {
    name: /edit1001/i,
  });

  fireEvent.click(editButton);
  expect(getByText(/編集確認/)).toBeInTheDocument();

  const editNode = getByLabelText('test02').querySelector(
    'input',
  ) as HTMLInputElement;

  userEvent.clear(screen.getByRole('textbox'));
  userEvent.type(editNode, 'タスクe');
  expect(editNode).toHaveValue('タスクe');

  const okButton = screen.getByRole('button', { name: 'キャンセル' });
  fireEvent.click(okButton);
  expect(okButton.textContent).toBe('キャンセル');

  expect(queryByText(/タスクa/)).toBeInTheDocument();
});

test('list test　編集の確認(NULLの場合)', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <List todolist={todolist} setTodolist={setTodolist} />;
  };
  const { getByLabelText, queryByText, getByText } = render(<Wrapper />);

  expect(queryByText(/タスクa/)).toBeInTheDocument();

  const button = screen.getByRole('button', { name: '2021年11月24日' });
  fireEvent.click(button);

  const editButton = screen.getByRole('button', {
    name: /edit1001/i,
  });

  fireEvent.click(editButton);
  expect(getByText(/編集確認/)).toBeInTheDocument();

  const editNode = getByLabelText('test02').querySelector(
    'input',
  ) as HTMLInputElement;

  userEvent.clear(screen.getByRole('textbox'));
  userEvent.type(editNode, '');
  expect(editNode).toHaveValue('');

  const okButton = screen.getByRole('button', { name: '編集' });
  fireEvent.click(okButton);

  expect(okButton.textContent).toBe('編集');

  expect(queryByText(/タスクa/)).toBeInTheDocument();
});

test('list test　編集の確認(スペースのみの場合)', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <List todolist={todolist} setTodolist={setTodolist} />;
  };
  const { getByLabelText, queryByText, getByText } = render(<Wrapper />);

  expect(queryByText(/タスクa/)).toBeInTheDocument();

  const button = screen.getByRole('button', { name: '2021年11月24日' });
  fireEvent.click(button);

  const editButton = screen.getByRole('button', {
    name: /edit1001/i,
  });

  fireEvent.click(editButton);
  expect(getByText(/編集確認/)).toBeInTheDocument();

  const editNode = getByLabelText('test02').querySelector(
    'input',
  ) as HTMLInputElement;

  userEvent.clear(screen.getByRole('textbox'));
  userEvent.type(editNode, '   ');
  expect(editNode).toHaveValue('   ');

  const okButton = screen.getByRole('button', { name: '編集' });
  fireEvent.click(okButton);
  expect(okButton.textContent).toBe('編集');

  expect(queryByText(/タスクa/)).toBeInTheDocument();
});

test('list test　編集の確認(25文字を超える場合)', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <List todolist={todolist} setTodolist={setTodolist} />;
  };
  const { getByLabelText, queryByText, getByText } = render(<Wrapper />);

  expect(queryByText(/タスクa/)).toBeInTheDocument();

  const button = screen.getByRole('button', { name: '2021年11月24日' });
  fireEvent.click(button);

  const editButton = screen.getByRole('button', {
    name: /edit1001/i,
  });

  fireEvent.click(editButton);
  expect(getByText(/編集確認/)).toBeInTheDocument();

  const editNode = getByLabelText('test02').querySelector(
    'input',
  ) as HTMLInputElement;

  userEvent.clear(screen.getByRole('textbox'));
  userEvent.type(
    editNode,
    '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十',
  );
  expect(editNode).toHaveValue(
    '一二三四五六七八九十一二三四五六七八九十一二三四五',
  );

  const okButton = screen.getByRole('button', { name: '編集' });
  fireEvent.click(okButton);
  expect(okButton.textContent).toBe('編集');

  expect(
    queryByText(/一二三四五六七八九十一二三四五六七八九十一二三四五/),
  ).toBeInTheDocument();
});

test('list test　削除の確認(OKの場合)', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <List todolist={todolist} setTodolist={setTodolist} />;
  };
  const { queryByText, getByText } = render(<Wrapper />);

  expect(queryByText(/タスクa/)).toBeInTheDocument();

  const deleteButton = screen.getByRole('button', {
    name: /delete1001/i,
  });

  fireEvent.click(deleteButton);
  expect(getByText(/削除確認/)).toBeInTheDocument();

  const deleteButton1 = screen.getByRole('button', { name: '削除' });
  fireEvent.click(deleteButton1);

  expect(queryByText(/タスクa/)).toBeNull();
});

test('list test　削除の確認(NOの場合)', () => {
  const Wrapper = () => {
    const [todolist, setTodolist] = useState<Todo[]>(firstState);

    return <List todolist={todolist} setTodolist={setTodolist} />;
  };
  const { queryByText, getByText } = render(<Wrapper />);

  expect(queryByText(/タスクa/)).toBeInTheDocument();

  const deleteButton = screen.getByRole('button', {
    name: /delete1001/i,
  });

  fireEvent.click(deleteButton);
  expect(getByText(/削除確認/)).toBeInTheDocument();

  const deleteButton1 = screen.getByRole('button', { name: 'キャンセル' });
  fireEvent.click(deleteButton1);

  expect(queryByText(/タスクa/)).toBeInTheDocument();
});
