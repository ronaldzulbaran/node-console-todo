require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
    pausa,
    leerInput,
    listadoBorrarTarea,
    confirmar,
    listadoTareaConfirmar,
    } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

// const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear();


const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDb = leerDB();

    if(tareasDb){

        tareas.cargarTareasFromArray(tareasDb);
    }

    do{
        
        opt = await inquirerMenu();

        // console.log(opt);
        
        switch (opt) {
            case '1':
                const descr = await leerInput('Descripción de la tarea: ');
                tareas.crearTarea(descr);

                break;

            case '2':
                tareas.listadoCompleto();
                console.log('')
            break;
            
            case '3':
                tareas.listadoPendienteCompletadas();
            break;

            case '4':
                tareas.listadoPendienteCompletadas(false);
            break;

            case '5':

                const ids = await listadoTareaConfirmar(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                
                const id = await listadoBorrarTarea(tareas.listadoArr);
                
                if( id !== '0'){
                    
                    const ok = await confirmar('¿Estas segur@ de borrar la tarea');
                    
                    if(ok){
                        tareas.borrarTareas(id);
                        console.log('Tarea borrada con exito.')
                    }
                }

            break;
        
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    }while( opt !== '0')

};

main();