
export class Todo {

   static tempTodo({ id, tarea, completado, creado }) {

      const tempTarea = new Todo( tarea );

      tempTarea.id         = id;
      tempTarea.completado = completado;
      tempTarea.creado     = creado;

      return tempTarea;

   } 

   constructor ( tarea ) {

      this.tarea      = tarea;

      this.id         = new Date().getTime();
      this.completado = false;
      this.creado     = new Date();

   }

   imprimirTarea() {

      console.log(`Tarea: ${this.tarea} Id: ${this.id}`);
   }

}