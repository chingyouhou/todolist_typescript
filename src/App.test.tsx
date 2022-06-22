import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('最初の状態の確認', () => {
  render(<App />);

  const textButton = screen.getByRole('button', { name: 'TODOはありません' });
  expect(textButton.textContent).toBe('TODOはありません');
});

test('入力の確認', () => {
  const { container, getAllByRole, queryByText } = render(<App />);

  const inputNode = container.querySelector(
    `input[name="input1"]`,
  ) as HTMLInputElement;

  // 前提確認: "タスクa"が存在していないこと
  expect(queryByText(/タスクa/)).toBeNull();
  expect(queryByText(/タスクb/)).toBeNull();
  expect(queryByText(/タスクc/)).toBeNull();
  expect(queryByText(/タスクd/)).toBeNull();
  expect(queryByText(/タスクe/)).toBeNull();

  const addButton = screen.getByRole('button', { name: 'ADD' });

  // 前提確認: "タスクa"が存在していないこと
  userEvent.type(inputNode, 'タスクa');
  expect(inputNode).toHaveValue('タスクa');
  fireEvent.click(addButton);
  userEvent.type(inputNode, 'タスクb');
  expect(inputNode).toHaveValue('タスクb');
  fireEvent.click(addButton);
  userEvent.type(inputNode, 'タスクc');
  expect(inputNode).toHaveValue('タスクc');
  fireEvent.click(addButton);
  userEvent.type(inputNode, 'タスクd');
  expect(inputNode).toHaveValue('タスクd');
  fireEvent.click(addButton);
  userEvent.type(inputNode, 'タスクe');
  expect(inputNode).toHaveValue('タスクe');
  fireEvent.click(addButton);
  expect(addButton.textContent).toBe('ADD');

  const todoList = getAllByRole('listitem');
  const todoTextLists = todoList.map((item) => item.textContent);
  expect(todoList.length).toBe(5);
  expect(todoTextLists[0]).toMatch(/タスクe/);
});

test('入力の確認(25文字を超える場合)', () => {
  const { container, getAllByRole, queryByText } = render(<App />);

  const inputNode = container.querySelector(
    `input[name="input1"]`,
  ) as HTMLInputElement;

  expect(
    queryByText(/一二三四五六七八九十一二三四五六七八九十一二三四五/),
  ).toBeNull();

  const addButton = screen.getByRole('button', { name: 'ADD' });

  userEvent.type(
    inputNode,
    '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十',
  );
  expect(inputNode).toHaveValue(
    '一二三四五六七八九十一二三四五六七八九十一二三四五',
  );
  fireEvent.click(addButton);

  expect(addButton.textContent).toBe('ADD');

  const todoList = getAllByRole('listitem');
  const todoTextLists = todoList.map((item) => item.textContent);
  expect(todoList.length).toBe(6);
  expect(todoTextLists[0]).toMatch(
    /一二三四五六七八九十一二三四五六七八九十一二三四五/,
  );
});

test('チェックを入れるの確認', () => {
  const { queryByText, getByText } = render(<App />);

  expect(getByText(/TODO：0/)).toBeInTheDocument();

  expect(queryByText(/タスクa/)).toBeInTheDocument();
  expect(queryByText(/TODO：0/)).toBeInTheDocument();

  expect(getByText('タスクa')).not.toBeChecked();

  const checkbox1 = screen.getByText('タスクa');
  fireEvent.click(checkbox1);
  const checkbox2 = screen.getByText('タスクb');
  fireEvent.click(checkbox2);
  const checkbox3 = screen.getByText('タスクc');
  fireEvent.click(checkbox3);

  expect(getByText(/TODO：3/)).toBeInTheDocument();
});

test('チェックを外すの確認', () => {
  const { getByText } = render(<App />);

  expect(getByText(/TODO：3/)).toBeInTheDocument();

  const checkbox1 = screen.getByText('タスクb');
  fireEvent.click(checkbox1);
  const checkbox2 = screen.getByText('タスクc');
  fireEvent.click(checkbox2);

  expect(getByText(/TODO：1/)).toBeInTheDocument();
});
