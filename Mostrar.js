import promptSync from 'prompt-sync';
const prompt = promptSync();
import {tareas} from './Cargar.js';
import { main } from './index.js';

export function VerTareas() { // funcion impura - parte del 20% 
    let opVer;
    let op;
        if (tareas.length === 0) {
            console.log("No hay tareas ingresadas");
            return;
        }

        console.log("- MENU VER TAREAS -");
        menuVerTareas();
        opVer = prompt("Ingrese una opcion: ");

            switch (opVer) {
                case "1":
                    console.log("Estas son todas tus tareas: \n");
                    tareas.forEach((t , i) => console.log("[" + (i + 1) + "] " + t.titulo));

                    console.log("\n\nDesea ver los detalles de alguna tarea?");
                    console.log("Introduzca el numero de la tarea o 0 para volver al menu principal"); 

                    op = prompt("Ingrese una opcion: ");
                    if (op == "0") { //mejorar? 
                        return;
                    } else {
                        detallesTarea(op);
                    }
                    break;
                case "2":
                    console.log(verTareasPorEstado(tareas ,"pendiente"));
                    break;
                case "3":
                    
                    break;
                case "4":
                    break;
                case "0":
                    main();
                    break;
                default:
                    console.log("Opcion no valida");
                        break;
                
            }
}

export function menu() {
    console.log("- MENU PRINCIPAL - \n");
    console.log("[1]. Ver mis tareas");
    console.log("[2]. Buscar tarea");
    console.log("[3]. Agregar tarea");
    console.log("[0]. Salir");
}//menu principal

export function BuscarTarea(buscar) { //FUNCION PURA  
        if (tareas.length === 0) { 
                console.log("No hay tareas ingresadas");
                return;
            }
        
        const resultado = tareas.filter(t => t.titulo.toLowerCase().includes(buscar.toLowerCase()));

        if (resultado.length === 0){
            console.log("No hay tareas relacionadas con su busqueda\n");
            return;
        }

        console.log("\nTareas relacionadas con su busqueda: \n");
        resultado.forEach((t , i) => {
            console.log("[" + (i + 1) + "] " + t.titulo);
        })
}

function verTareasPorEstado(tareas ,estado){ 
    const tareasFiltradas = tareas.filter(
        t => t.estado.trim().toLowerCase() === estado.trim().toLowerCase()
    );

    if (tareasFiltradas.length === 0) {
        return `No hay tareas con el estado ${estado}.`; 
    }

    let texto = `Tareas ${estado}:\n`;
    tareasFiltradas.forEach((t, i) => {
        texto += `[${i + 1}] ${t.titulo}\n`;
    });

    return texto; 
}


function menuVerTareas() {
    console.log("- Que tarea desea ver? - \n");
    console.log("[1]. Ver todas las tareas");
    console.log("[2]. Ver tareas pendientes");
    console.log("[3]. Ver tareas en curso");
    console.log("[4]. Ver tareas terminadas");
    console.log("[0]. Volver al menu principal");
}// menu secundario que permite ver las tareas cargadas



export function detallesTarea(op) { // cambiar la tarea, eliminar los consoleLOG y la parte de abajo que edita la tarea
    op = Number.parseInt(op);
        let t = tareas[op - 1]; 
        let editar
    
        if (Number.isNaN(op) || op < 1 || op > tareas.length) {
            console.log("⚠️ Opción inválida. No existe esa tarea.");
            return;
        }
    
        console.log("\n--- Detalles de la tarea ---");
        console.log("Titulo: " + t.titulo);
        console.log("Descripcion: " + t.descripcion);
        console.log("Estado: " + t.estado);
        console.log("Fecha de vencimiento: " + t.fechaVencimiento);
        console.log("Dificultad: " + t.dificultad);
        console.log("Fecha de creacion: " + t.fechaActual);
        console.log("ID: " + t.id);
        console.log("----------------------------\n");
    
        console.log("Si desea editar esta tarea, presione 'e', sino presione 0 para volver al menu principal: ")
        editar = prompt(">");
    
        if (editar.toLowerCase() === "e"){
            EditarTarea(op - 1);
        } else {
            console.log("Volviendo al menu principal");
            main();
        }
        
} 


function EditarTarea(i) { // para hacerla funcion pura, devolver un nuevo objeto con los cambios realizados, manteniendo la original en el sistema pero que solo se pueda ver mediante una opcion
    let op;
    let tarea = tareas[i];
    
        console.log("\n Esta editando la tarea :" + tarea.titulo);
        console.log("\n-Si desea mantener los valores de un atributo, presione enter sin escribir nada");
        console.log("-Si desea dejar en blanco un atributo, presione -");  

        console.log("\n 1. Titulo: " + tarea.titulo);
        console.log(" 2. Estado: " + tarea.estado);
        console.log(" 3. Fecha de vencimiento: " + tarea.fechaVencimiento);
        console.log(" 4. Dificultad: " + tarea.dificultad);

        const editarAUX = (valorActual) => {
            const nuevoValor = prompt("> ") || valorActual; 
            return nuevoValor === "-" ? " +-- " : nuevoValor;

        }

        op = prompt("Ingrese lo que desea editar :" );
        switch (op) {
            case "1":
                console.log("Ingrese el nuevo titulo: ");
                tarea.titulo = editarAUX(tarea.titulo);
                break;
            case "2":
                console.log("Ingrese el nuevo estado: ");
                tarea.estado = editarAUX(tarea.estado);
                break;
            case "3":
                console.log("Ingrese la nueva fecha de vencimiento: ");
                tarea.fechaVencimiento = editarAUX(tarea.fechaVencimiento);
                break;
            case "4":
                console.log("Ingrese la nueva dificultad");
                tarea.dificultad = editarAUX(tarea.dificultad);
                break;
            default:
                console.log("Opcion no valida");
                break;
        }
    
}
