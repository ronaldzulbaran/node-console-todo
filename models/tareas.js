const Tarea = require("./tarea");


class Tareas {

    _listado = {};

    constructor() {

        this._listado = {};
    }

    get listadoArr() {

        const listado = [];

        Object.keys(this._listado).forEach(key => listado.push(this._listado[key]));

        return listado;
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(val => this._listado[val.id] = val);
    }

    crearTarea(descr = '') {

        const tarea = new Tarea(descr);

        this._listado[tarea.id] = tarea;
    }

    borrarTareas( id = ''){

        if(this._listado[id]){
            delete this._listado[id];
        }


    }

    listadoCompleto() {
        console.log('')
        return this.listadoArr.forEach((t, i) => {
            const idx = `${i + 1}`.green;
            const { descripcion, completadoEn } = t;
            const estado = completadoEn ? 'COMPLETADA'.green : 'PENDIENTE '.red;

            console.log(`[ ${estado} ] ${idx}. ${descripcion}`);
        });

    }

    listadoPendienteCompletadas(estadoTarea = true) {
        console.log('')

        let idx = 0;
        
        return this.listadoArr.forEach((t, i) => {
            const { descripcion, completadoEn } = t;
            const estado = completadoEn ? 'COMPLETADA'.green : 'PENDIENTE'.red;

            if (estadoTarea) {
                if (t.completadoEn) {
                    idx += 1;
                    console.log(`[ ${ completadoEn.green } ] ${ idx.toString().green }. ${descripcion}`);
                }
            } else {
                if (!t.completadoEn) {
                    idx += 1;
                    console.log(`[ ${estado} ] ${ idx.toString().green }. ${descripcion}`);
                }
            }

        });

    }


    toggleCompletadas( ids = [] ){

        ids.forEach(id => {

            const tarea = this._listado[id];

            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach( t => {

            if(!ids.includes(t.id)){
                this._listado[t.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;