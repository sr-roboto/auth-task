import { database } from '../db/database.js';

export const getAllTodosCtrl = (req, res) => {
  const { id } = req.user;

  const todos = database.todos.filter((todo) => todo.owner === id);

  res.json({ todos });
};

export const createTodosCtrl = (req, res) => {
  const { id } = req.user;
  const { title, completed } = req.body;

  const newTodo = {
    id: database.todos.length + 1,
    title,
    completed,
    owner: id,
  };

  database.todos.push(newTodo);

  res.json({ message: 'Tarea creada exitosamente' });
};

export const updateTodosCtrl = (req, res) => {
  const { id } = req.user;
  const { todoId } = req.params;
  const { title, completed } = req.body;

  const todo = database.todos.find(
    (todo) => todo.id === Number(todoId) && todo.owner === id
  );

  if (!todo) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  todo.title = title;
  todo.completed = completed;

  res.json({ message: 'Tarea actualizada exitosamente' });
};

export const deleteTodosCtrl = (req, res) => {
  const { id } = req.user;
  const { todoId } = req.params;

  const index = database.todos.findIndex(
    (todo) => todo.id === Number(todoId) && todo.owner === id
  );

  if (index === -1) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  database.todos.splice(index, 1);

  res.json({ message: 'Tarea eliminada exitosamente' });
};
