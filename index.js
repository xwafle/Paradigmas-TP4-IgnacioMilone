import promptSync from 'prompt-sync';
import { Cargar , tareas } from './Cargar.js';
import { VerTareas ,menu , BuscarTarea, detallesTarea } from './Mostrar.js';
const prompt = promptSync({sigint: true});


/* TP 4 - CAMBIAR LAS FUNCIONES ESPECIFICADAS 

Ignacio Milone - Exequiel Alaniz - Ramiro Fernandez - ING EN SISTEMAS - 
*/

export function main() { // funcion impura - parte del 20%
    let op;
    do {
        console.log("--- Bienvenido a la lista de tareas! --- \n")
        menu();
        op = prompt("Ingrese una opcion:  ");
        switch (op) {
            case "1":
                VerTareas();
                break;
            case "2":
                console.log("Ingrese el titulo de la tarea a buscar");
                const buscar = prompt("Titulo: ");
                console.log(BuscarTarea(tareas,buscar));

                console.log("Desea ver los detalles de la tarea? ingrese el numero de la tarea o 0 para volver al menu principal\n");
                
                    op = prompt(">: ");
                    if (op == "0"){
                        return;
                    } else {
                        detallesTarea(tareas,op);
                    }
                break;
            case "3":
                const nuevaTarea = Object.create(Cargar);
                nuevaTarea.Ingresar();
                tareas.push(nuevaTarea);
                break;
            case "0":
                console.log("Saliendo...");
                break;
            default:
                console.log("Opcion no valida");
                break;
        }
    } while (op !== "0");
}
main();

