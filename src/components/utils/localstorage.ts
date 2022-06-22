import { Todo } from '../type/Todo';

const todoContents = 'TodoContents';

export const getLocalTodo = () =>
  JSON.parse(localStorage.getItem(todoContents) || '[]') as Todo[];

export const setLocalTodo = (todo: Todo[]) => {
  localStorage.setItem(todoContents, JSON.stringify(todo));
};
