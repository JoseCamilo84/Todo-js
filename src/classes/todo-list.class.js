import { Todo } from './index';




export class TodoList {

   constructor () {

      // this.todolist = [];
      this.cargarLocalStorage();
   }

   nuevaTarea( tarea ) {

      this.todolist.push( tarea );
      this.guardarLocalStorage();
   }

   marcarCompletado( id ) {

      for ( const todo of this.todolist ) {

         if ( todo.id === parseInt(id) ) {

            todo.completado = !todo.completado;
            this.guardarLocalStorage();
            break;
         }
      }
   }

   eliminarTarea( id ) {

      this.todolist = this.todolist.filter( todo => todo.id !== parseInt(id) );
      this.guardarLocalStorage();
   }

   eliminarCompletados() {

      this.todolist = this.todolist.filter( todo => !todo.completado );
      this.guardarLocalStorage();
   }

   guardarLocalStorage() {

      localStorage.setItem( 'todo', JSON.stringify( this.todolist ) );
      // console.log(this.todolist);
   }

   cargarLocalStorage() {

      this.todolist = ( localStorage.getItem('todo') ) 
                           ? JSON.parse( localStorage.getItem('todo') ) 
                           : this.todolist = [] ;

      this.todolist = this.todolist.map( obj => Todo.tempTodo( obj ) );
   }

}