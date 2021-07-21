import './styles.css';

//Si yo lo dejo asi vacio importa predeterminadamente  busca INDEX.JS
import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();

//Esto es lo mismo que
// todoList.todos.forEach(todo => crearTodoHtml(todo));

//Esto pero mas simplificado, ya que como "todo" es el unico argumento que quiero enviar, lo puedo obviar
todoList.todos.forEach( crearTodoHtml );