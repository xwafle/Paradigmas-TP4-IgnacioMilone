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
                    if (op == "0") {  
                        return;
                    } else {
                        const indiceTarea = Number.parseInt(op) - 1; 
                        console.log(detallesTarea(tareas, op));

                        console.log("\n\nDesea editar esta tarea?");
                        console.log("Introduzca 1 para editar o 0 para volver al menu principal"); 
                        const opcionEditar = prompt("Ingrese una opcion: "); // nueva variable

                        if (opcionEditar == "1") {
                            EditarTarea(tareas, indiceTarea); 
                        } else {
                            return;
                        }
                    }

                    break;
                case "2":
                    console.log(verTareasPorEstado(tareas ,"pendiente"));
                    break;
                case "3":
                    console.log(verTareasPorEstado(tareas ,"en curso"));
                    break;
                case "4":
                    console.log(verTareasPorEstado(tareas ,"terminada"));
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

export function BuscarTarea(tareas, buscar) {
    let texto; 
        if (tareas.length === 0) { 
                return("No hay tareas ingresadas")
            }
        
        const resultado = tareas.filter(t => t.titulo.toLowerCase().includes(buscar.trim().toLowerCase()));

        if (resultado.length === 0){
            return  ("No hay tareas relacionadas con su busqueda\n")
        }

        texto = "Tareas relacionadas con su busqueda:\n";
            resultado.forEach((t, i) => {texto += `[${i + 1}] ${t.titulo}\n`;
        });

    return texto;
}

function verTareasPorEstado(tareas ,estado){ 
    if (tareas.length === 0) {
        return "No hay tareas ingresadas";
    }

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



export function detallesTarea(tareas, op) { 
    op = Number.parseInt(op);
    const t = tareas[op - 1];
    let texto; 
    
        if(tareas.length === 0 || op < 1 || op > tareas.length){
            return ("No hay tareas ingresadas");
        }

        texto = `\n Detalles de la tarea "${t.titulo}":\n`;
        texto += `Descripcion: ${t.descripcion}\n`;
        texto += `Estado: ${t.estado}\n`;
        texto += `Fecha de vencimiento: ${t.fechaVencimiento}\n`;
        texto += `Dificultad: ${t.dificultad}\n`;
        texto += `Fecha de ultima modificacion: ${t.ultimaModificacion}\n`;
        texto += `ID: ${t.id}\n`;


    return texto;
} 

function EditarTareaPuras(tareas, i, cambio) {
    if (tareas.length === 0 || i < 0 || i >= tareas.length) {
        return {
            mensaje: "No hay tareas ingresadas o índice inválido.",
            tareas
        };
    }

    const tareaOriginal = tareas[i];

    const tareaEditada = {
        ...tareaOriginal,
        ...cambio,
        ultimaModificacion: new Date()
    };

    // Actualizar la tarea en el array original
    tareas[i] = tareaEditada;

    return {
        mensaje: "Tarea editada con éxito.",
        tareas
    };
}


function EditarTarea(tareas, i, cambios,) { 
    let op;
    
    // Validar que el array no esté vacío y el índice sea válido
    if (tareas.length === 0 || i < 0 || i >= tareas.length) {
        console.log("No hay tareas ingresadas o índice inválido");
        return;
    }
    
    let tarea = tareas[i];
    cambios = {};
    
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
                cambios.titulo = editarAUX("Titulo",tarea.titulo);
                break;
            case "2":
                cambios.estado = editarAUX("Estado",tarea.estado);
                break;
            case "3":
                cambios.fechaVencimiento = editarAUX("Fecha de vencimiento",tarea.fechaVencimiento);
                break;
            case "4":
                cambios.dificultad = editarAUX("Dificultad",tarea.dificultad);
                break;
            default:
                console.log("Opcion no valida");
                break;
        }

    const resultado = EditarTareaPuras(tareas, i, cambios);
    console.log(resultado.mensaje);
    return resultado.tareas;
    
}
