export class Profesional {
  id: string;
  tipo: string;
  correo: string;
  nombre: string;
  apellido: string;
  edad: number;
  dni: number;
  foto1: string;
  estado: string;
  especialidades: string[];
  atiende: any[];

  constructor() {
    this.tipo = 'PROFESIONAL';
    this.especialidades = [];
    this.atiende = [
      {
        lunes: {
          estado: true,
          inicio: 800,
          fin: 1900,
          literal: 'LUNES',
        },
        martes: {
          estado: true,
          inicio: 800,
          fin: 1900,
          literal: 'MARTES',
        },
        miercoles: {
          estado: true,
          inicio: 800,
          fin: 1900,
          literal: 'MIERCOLES',
        },
        jueves: {
          estado: true,
          inicio: 800,
          fin: 1900,
          literal: 'JUEVES',
        },
        viernes: {
          estado: true,
          inicio: 800,
          fin: 1900,
          literal: 'VIERNES',
        },
        sabado: {
          estado: true,
          inicio: 800,
          fin: 1400,
          literal: 'SABADO',
        },
      },
    ];
  }
}
