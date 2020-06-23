import { Todo } from "../classes";
import { listaTareas } from "../index.js";



const divTodoHtml = document.querySelector('.todo-list');
const txtInput    = document.querySelector('.new-todo');
const btnBorrar   = document.querySelector('.clear-completed');
const ulFiltros   = document.querySelector('.filters');
const aFiltros    = document.querySelectorAll('filtro');


export const crearTodoHtml = ( todo ) => {

   const todoHtml = `
   <li class="${ ( todo.completado ) ? "completed" : "" }" data-id="${ todo.id }">
      <div class="view">
         <input class="toggle" type="checkbox" ${ ( todo.completado ) ? 'checked' : "" }>
         <label>${ todo.tarea }</label>
         <button class="destroy"></button>
      </div>
      <input class="edit" value="Create a TodoMVC template">
   </li>`;

   const div = document.createElement( 'div' );
   div.innerHTML = todoHtml;
   divTodoHtml.append( div.firstElementChild ); // Para sólo insertar el primer hijo es decir el 'li'


   return div.firstElementChild;

}


// Eventos
txtInput.addEventListener('keyup', ( event ) => {

   if ( event.keyCode === 13 && txtInput.value.length > 0 ) {

      const tarea = new Todo( txtInput.value );
      listaTareas.nuevaTarea( tarea );

      crearTodoHtml( tarea );
      txtInput.value = "";
   }

});

divTodoHtml.addEventListener('click', ( event ) => {
   
   const todoElemento = event.target.localName; // Qué elemento se eligió cuando se hizo click
   const otroElemento = event.target.parentElement.parentElement; // Aquí subo de nivel 2 puestos para elegir el elemento 'li'
   const todoId       = otroElemento.getAttribute('data-id');

      
   if ( todoElemento.includes( 'input' ) ) {
      
      listaTareas.marcarCompletado( todoId );
      otroElemento.classList.toggle( 'completed' );

   } else if ( todoElemento.includes( 'button' ) ) {

      listaTareas.eliminarTarea( todoId );
      divTodoHtml.removeChild( otroElemento );
   }
   
});

btnBorrar.addEventListener('click', () => {

   listaTareas.eliminarCompletados();

   for ( let i = divTodoHtml.children.length - 1; i >= 0; i--) {
      
      const elemento = divTodoHtml.children[i];
      
      
      if ( elemento.classList.contains('completed') ) {

         divTodoHtml.removeChild(elemento);
      }
      
   }   
});

ulFiltros.addEventListener('click', ( event ) => {
   
   const filtro = event.target.text; // Todos, Pendientes y Completados

   if ( !filtro ) { return; }

   aFiltros.forEach( element => element.classList.remove('selected'));
   event.target.classList.add('selected');

   for ( const elemento of divTodoHtml.children ) {

      elemento.classList.remove('hidden');

      switch ( filtro ) {

         case  'Completados':
               if ( !elemento.classList.contains('completed') ) {

                  elemento.classList.add('hidden');
               }
            break;

         case  'Pendientes':
               if ( elemento.classList.contains('completed') ) {

                  elemento.classList.add('hidden');
               }
            break;

      }
      
   }
});