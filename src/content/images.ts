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
    alt: 'Logo de Pilates Villa Crespo',
    width: 417,
    height: 417
  },
  hero: {
    src: local.classRow,
    video: '/hero_mobile.mp4',
    poster: local.classRow,
    alt: 'Grupo practicando en máquinas Reformer dentro del estudio',
    width: 4096,
    height: 4096
  },
  classes: {
    reformer: {
      src: local.reformerDetail,
      alt: 'Detalle de una máquina Reformer con bandas y springs',
      width: 1440,
      height: 1801
    },
    mat: {
      src: local.classLying,
      alt: 'Alumnas recostadas en Reformer durante una clase',
      width: 4096,
      height: 4096
    },
    personal: {
      src: local.classStanding,
      alt: 'Alumna de pie junto al Reformer, acompañada en clase',
      width: 4096,
      height: 4096
    }
  },
  studio: [
    {
      src: local.classStanding,
      alt: 'Clase en el estudio, con Reformer y luz natural',
      width: 4096,
      height: 4096
    },
    {
      src: local.classLying,
      alt: 'Grupo reducido trabajando en Reformer, en un espacio cerrado',
      width: 4096,
      height: 4096
    },
    {
      src: local.reformerDetail,
      alt: 'Reformer de madera, springs y accesorios de la práctica',
      width: 1440,
      height: 1801
    },
    {
      src: local.classRow,
      alt: 'Fila de máquinas Reformer listas para la clase',
      width: 4096,
      height: 4095
    }
  ] satisfies StudioImage[],
  instructor: {
    src: local.reformerDetail,
    alt: 'Detalle de Reformer usado en las clases del estudio',
    width: 1440,
    height: 1801
  },
  cta: {
    src: local.classLying,
    alt: '',
    width: 4096,
    height: 4096
  },
  og: {
    src: '/og.jpg',
    alt: 'Pilates Villa Crespo, estudio de Reformer en Buenos Aires',
    width: 1200,
    height: 630
  },
  instagram: [
    {
      src: local.igIntro,
      alt: 'Publicación de Instagram del estudio: bienvenida al espacio'
    },
    {
      src: local.igCompetitive,
      alt: 'Publicación de Instagram: ilustración de una alumna competitiva'
    },
    {
      src: local.igTalkative,
      alt: 'Publicación de Instagram: ilustración de una alumna charlatana'
    },
    {
      src: local.igTypes,
      alt: 'Publicación de Instagram: distintos tipos de alumna en clase'
    },
    {
      src: local.igLate,
      alt: 'Publicación de Instagram: ilustración de quien llega tarde a clase'
    }
  ]
}
