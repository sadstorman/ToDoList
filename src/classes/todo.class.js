
export class Todo {

    static fromJson( {id, tarea, completado, creado} ) {
        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor( tarea ) {

        this.tarea = tarea;

        this.id = new Date().getTime(); // recibo los numeros de la hora actual, 532651263
        this.completado = false;
        this.creado = new Date();
    }
}