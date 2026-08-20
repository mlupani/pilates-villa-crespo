export interface StudioImage {
  src: string
  alt: string
  width: number
  height: number
}

const local = {
  classStanding: '/images/727243009_18110059942940230_1219740848717855142_n.jpg',
  classLying: '/images/726294668_18110059951940230_2581592702257733486_n.jpg',
  classRow: '/images/727220816_18110059933940230_5139515326900343484_n.jpg',
  reformerDetail: '/images/612992245_18094183831940230_3952051630298498516_n.jpg',
  igIntro: '/images/729840644_18110474839940230_4468849611169536055_n.jpg',
  igCompetitive: '/images/731052259_18110474881940230_5389740812546627957_n.jpg',
  igTalkative: '/images/730943322_18110474884940230_3314266488773308055_n.jpg',
  igTypes: '/images/730854593_18110474848940230_1004655565575655059_n.jpg',
  igLate: '/images/731059103_18110474857940230_6902708601477499030_n.jpg'
}

export const images = {
  logo: {
    src: '/logo.jpg',
    alt: 'Pilates Villa Crespo',
    width: 417,
    height: 417
  },
  hero: {
    src: local.classRow,
    video: '/hero_mobile.mp4',
    poster: local.classRow,
    alt: 'Clase de Pilates Reformer en el estudio de Villa Crespo',
    width: 4096,
    height: 4096
  },
  classes: {
    reformer: {
      src: local.reformerDetail,
      alt: 'Ejercicio en máquina Reformer con bandas y springs en el estudio',
      width: 1440,
      height: 1801
    },
    mat: {
      src: local.classLying,
      alt: 'Grupo reducido trabajando fuerza y control en Reformer',
      width: 4096,
      height: 4096
    },
    personal: {
      src: local.classStanding,
      alt: 'Clase acompañada en el estudio, con máquinas de Pilates',
      width: 4096,
      height: 4096
    }
  },
  studio: [
    {
      src: local.classStanding,
      alt: 'Clase de Pilates Reformer en el local de Villa Crespo',
      width: 4096,
      height: 4096
    },
    {
      src: local.classLying,
      alt: 'Alumnas y alumno en Reformer, en un espacio íntimo y cerrado',
      width: 4096,
      height: 4096
    },
    {
      src: local.reformerDetail,
      alt: 'Detalle de Reformer de madera, springs y trabajo de precisión',
      width: 1440,
      height: 1801
    },
    {
      src: local.classRow,
      alt: 'Fila de máquinas Reformer en el estudio boutique',
      width: 4096,
      height: 4095
    }
  ] satisfies StudioImage[],
  instructor: {
    src: local.reformerDetail,
    alt: 'Práctica de Pilates Reformer en el estudio',
    width: 1440,
    height: 1801
  },
  cta: {
    src: local.classLying,
    alt: 'Clase de Pilates en máquinas Reformer en Villa Crespo',
    width: 4096,
    height: 4096
  },
  og: {
    src: local.classStanding,
    alt: 'Pilates Villa Crespo — Reformer en Buenos Aires'
  },
  instagram: [
    {
      src: local.igIntro,
      alt: 'Campaña de Instagram de Pilates Villa Crespo'
    },
    {
      src: local.igCompetitive,
      alt: 'Pieza de Instagram: la alumna competitiva'
    },
    {
      src: local.igTalkative,
      alt: 'Pieza de Instagram: la alumna charlatana'
    },
    {
      src: local.igTypes,
      alt: 'Pieza de Instagram: tipos de alumna'
    },
    {
      src: local.igLate,
      alt: 'Pieza de Instagram: la que llega siempre tarde'
    }
  ]
}
