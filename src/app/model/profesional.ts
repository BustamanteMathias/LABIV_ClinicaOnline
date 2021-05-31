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
          profesion: ''
        },
        martes: {
          estado: true,
          inicio: 800,
          fin: 1900,
          literal: 'MARTES',
          profesion: ''
        },
        miercoles: {
          estado: true,
          inicio: 800,
          fin: 1900,
          literal: 'MIERCOLES',
          profesion: ''
        },
        jueves: {
          estado: true,
          inicio: 800,
          fin: 1900,
          literal: 'JUEVES',
          profesion: ''
        },
        viernes: {
          estado: true,
          inicio: 800,
          fin: 1900,
          literal: 'VIERNES',
          profesion: ''
        },
        sabado: {
          estado: true,
          inicio: 800,
          fin: 1400,
          literal: 'SABADO',
          profesion: ''
        },
      },
    ];
  }
}
