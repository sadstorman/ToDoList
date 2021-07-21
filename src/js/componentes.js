import { Todo } from "../classes";
import { todoList } from "..";

//Referencias en el HTML
const divTodoList = document.querySelector('.todo-list')
const txtInput = document.querySelector('.new-todo');
const eliminarCompletados = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''}" data-id=${todo.id}>
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    // firstElementChild      funciona para agregar el hijo de ese elemento HTML(en este caso del div) para poder insertar directamente un LI (LIST ITEM)
    divTodoList.append( div.firstElementChild );

    return div;

}

// Eventos
//keyup, puedo saber que teclas se presionan y finalmente la palabra completa que se escribio
txtInput.addEventListener('keyup', (event)  =>{
    // value = a la palabra final
    if( event.keyCode === 13 && txtInput.value.length > 0 ) {
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );
        
        crearTodoHtml(nuevoTodo);
        txtInput.value = "";
    }
});

divTodoList.addEventListener('click', (event) =>{
    //Con esto puedo saber exactamente a que se le hace click

    const nombreElemento = event.target.localName; //Input, label, button
    const todoElemento = event.target.parentElement.parentElement; //Hago referencia al LI(si pondria un solo parent element hago referencia al hijo del LI)
    //Ahora extraigo el ID de la tarea ingresando al elemento que obtuve antes
    const todoId = todoElemento.getAttribute('data-id');


    if( nombreElemento.includes('input') ) {
        todoList.marcarCompletado( todoId);

        //Con esto le modificaba la clase, si existe la quita y sino le pone la clase
        todoElemento.classList.toggle('completed');


        
    } else if( nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild( todoElemento ); 
    }
    
});

eliminarCompletados.addEventListener('click', () => {
    todoList.eliminarCompletados();

    //Hago un FOR a la inversa para que no me modifique el indice al borrar
    for( let i = divTodoList.children.length-1; i>= 0; i--) {
        //Aca obtengo el LI con su clase y el ID
        const elemento = divTodoList.children[i];
        //Entonces aca compruebo si el elemento tiene la clase COMPLETED, si es asi lo borro con removeChilD
        if(elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
})

ulFiltros.addEventListener('click', (event ) => {

    const filter = event.target.text;
    // En este caso es como validación/mecanismo de seguridad. Si no existe filtro, entra en el if y hace un return, 
    //por lo que no seguirá ejecutando las siguientes líneas de código, haciendo de sistema de seguridad para que no se ejecute código que no deseamos.
    if ( !filter ) {return};
    
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    
    for( const elemento of divTodoList.children ) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filter) {
            case 'Pendientes':
                //Si esta completado le agrego la clase HIDDEN, para que solo salgan los pendientes
                if( completado ) {
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;

        }
    }
    
});