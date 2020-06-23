import './style.css';

import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/complementos.js';



export const listaTareas = new TodoList();


// const newTodo = new Todo('Aprendiendo Javascript');
// newTodo.imprimirTarea();
// listaTareas.nuevaTarea(newTodo);



listaTareas.todolist.forEach( element => crearTodoHtml(element) );
// listaTareas.todolist[7].imprimirTarea();

console.log( listaTareas );