export interface Motel {
    nitMotel: string;
    nombreMotel: string;
    direccionMotel: string;
    telefonoMotel: string;
    correoMotel: string ;
    pagWebMotel: string; 
    latitudMotel?: string;
    longitudMotel?: string;
    estadoMotel: boolean;
}

export class ClaveImagenes { 
   nombre: Array<string>;
}
   

export class serviciosMotel {
    codigo: string;
    nombre: string
}