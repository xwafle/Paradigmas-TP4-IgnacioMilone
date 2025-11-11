import promptSync from 'prompt-sync';
const prompt = promptSync();

export const tareas = []; //array

export const Cargar = { //Funcion IMPURA - en este caso tiene que ser impura ya que el usuario ingresa datos y esta en costante cambio
    titulo: "",
    descripcion: "",
    estado:"", 
    fechaVencimiento: "",
    dificultad: "",
    fechaActual: "",
    id: 0,
    ultimaModificacion: "", // cada vez que se modifique la tarea, se actualiza esta fecha

        Ingresar(){
            this.titulo = prompt("Ingrse el titulo de la tarea: ");
            this.descripcion = (prompt("Ingrese la descripcion de la tarea (opcional): ") || "Sin descripcion").trim().toLowerCase();
            this.estado = (prompt("Ingrese el estado de la tarea (pendiente, en curso, terminada) (por defecto: pendiente): ") || "pendiente").trim().toLowerCase();
            this.fechaVencimiento = (prompt("Ingrese la fecha de vencimiento (opcional) (formato: dd/mm/aaaa): ") || "Sin vencimiento").trim().toLowerCase();
            this.dificultad = (prompt("Ingrese la dificultad (facil, media, dificil) (por defecto: facil): ") || "Facil").trim().toLowerCase();
            this.fechaActual = new Date();
            this.ultimaModificacion = this.fechaActual;
            this.id = tareas.length + 1;
            
            console.log("Tarea agregada con exito");
        },
};