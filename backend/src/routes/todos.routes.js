import { Router } from 'express';
import {
  getAllTodosCtrl,
  createTodosCtrl,
  updateTodosCtrl,
  deleteTodosCtrl,
} from '../controllers/todos.controllers.js';
import validarJwt from '../middlewares/validar-jwt.js';

const todosRouter = Router();

todosRouter.get('/', validarJwt, getAllTodosCtrl);
todosRouter.post('/', validarJwt, createTodosCtrl);
todosRouter.put('/:todoId', validarJwt, updateTodosCtrl);
todosRouter.delete('/:todoId', validarJwt, deleteTodosCtrl);

export { todosRouter };
