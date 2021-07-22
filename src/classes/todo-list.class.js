import { Todo } from "./todo.class";

export class TodoList {

    constructor() {
        //Siempre que inicio necesito realizar la funcion para verificar si ya hay algo almacenado...
        //Dentro de esta funcion ademas inicializo mi array...
        this.cargarLocalStorage();
    }


    nuevoTodo(tarea) {
        this.todos.push(tarea);
        this.guardarlocalStorage();
        this.contadorPendiente();
    }

    eliminarTodo(id) {
        //Recorro el array y reviso los ID, los que sean diferentes al que le pase como argumento lo va a sobreescribir en el array que ya tenia( .filter me devuelve un array nuevo)
        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarlocalStorage();
        this.contadorPendiente();
    }

    marcarCompletado(id) {

        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarlocalStorage();
                break;
            }
        }
        this.contadorPendiente();
    }

    eliminarCompletados() {
        //Regreso todos los que NO estan completados, para que de esa forma me cree un array nuevo con esos no completados 
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarlocalStorage();
        this.contadorPendiente();
    }

    guardarlocalStorage() {

        //Convierto un objeto en en un formato JSON, ya que el localStorage solo almacena STRINGS
        //Almaceno todas mis tareas, llamo esta funcion en otras funciones para que constantemente actualice el localStorage
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
        this.todos = (localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : []);
        this.todos = this.todos.map(obj => Todo.fromJson(obj));
        //Puedo resumirlo asi....
        // this.todos = this.todos.map(Todo.fromJson);
        this.contadorPendiente();
    }

    contadorPendiente(){
        let auxiliar = 0;
        const contador = document.querySelector('.todo-count strong');
        this.todos.forEach(element => {
            if(!element.completado) {
                auxiliar = auxiliar+1;
            }
        });
        contador.innerHTML = auxiliar;
    }
    // //Le pregunto si esta vacio el toDo, si lo esta inicializo mi array. Si no esta vacio entonces hago un getITem para conseguir los toDos almacenados
    // if(localStorage.getItem('todo')) {
    //     //Aca vuelvo a transformar el STRING de toDos en un OBJETO
    //     this.todos = JSON.parse(localStorage.getItem('todo'));
    // }else{
    //     this.todos = [];

}