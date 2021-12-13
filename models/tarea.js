const { v4: uuidv4 } = require('uuid');

class Tarea {

    id           = '';
    descripcion  = '';
    completadoEn = null;


    constructor( descr){
        this.id = uuidv4();
        this.descripcion = descr;
        this.completadoEn = null;
    }

}


module.exports = Tarea;