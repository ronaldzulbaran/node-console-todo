const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.green}. Crear Tarea`
            },
            {
                value: '2',
                name: `${'2'.green}. Listar Tareas`
            },
            {
                value: '3',
                name: `${'3'.green}. Listar Tareas Completada`
            },
            {
                value: '4',
                name: `${'4'.green}. Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${'5'.green}. Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${'6'.green}. Borrar Tarea`
            },
            {
                value: '0',
                name: `${'0'.red}. Salir [<-`
            },
        ]
    }
]


const inquirerMenu = async () => {

    console.clear();
    console.log('==========================================  '.green);
    console.log('           Seleccione una opción            '.green);
    console.log('==========================================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas)

    return opcion;

}


const pausa = async () => {

    let preguntas = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]

    await inquirer.prompt(preguntas)

}


const leerInput = async (message) => {

    let preguntas = [
        {
            type: 'input',
            name: 'descripcion',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }

                return true;
            }
        }
    ]

    const { descripcion } = await inquirer.prompt(preguntas)

    return descripcion;
};


const listadoBorrarTarea = async (tareas) => {
    console.clear();

    const choices = tareas.map(t => {

        const { id, descripcion } = t;
        return {
            value: id,
            name: descripcion
        }
    });

    choices.unshift({
        value: '0',
        name: '0. Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: 'Seleccionar la tarea a borrar:',
            choices
        }
    ]

    const { opcion } = await inquirer.prompt(preguntas)

    return opcion;

}

const confirmar = async (message) => {


    const preguntas = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(preguntas)

    return ok;
}

const listadoTareaConfirmar = async (tareas) => {
    console.clear();

    const choices = tareas.map(t => {

        const { id, descripcion } = t;
        return {
            value: id,
            name: descripcion,
            checked: ( t.completadoEn) ? true : false
        }
    });

    // choices.unshift({
    //     value: '0',
    //     name: '0. Cancelar',
    //     checked: false
    // });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccionar la tarea a borrar:',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(preguntas)

    return ids;

}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoBorrarTarea,
    confirmar,
    listadoTareaConfirmar
}