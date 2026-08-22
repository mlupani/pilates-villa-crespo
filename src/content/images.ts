export interface StudioImage {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

const local = {
  classStanding: '/images/727243009_18110059942940230_1219740848717855142_n.jpg',
  classLying: '/images/726294668_18110059951940230_2581592702257733486_n.jpg',
  classRow: '/images/727220816_18110059933940230_5139515326900343484_n.jpg',
  reformerDetail: '/images/612992245_18094183831940230_3952051630298498516_n.jpg',
  igIntro: '/images/729840644_18110474839940230_4468849611169536055_n.jpg',
  igTalkative: '/images/730943322_18110474884940230_3314266488773308055_n.jpg',
  igTypes: '/images/730854593_18110474848940230_1004655565575655059_n.jpg'
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
  benefits: {
    src: local.classStanding,
    alt: 'Clase guiada en Reformer, con atención cercana en el estudio',
    width: 4096,
    height: 4096
  },
  classes: {
    reformer: {
      src: local.classLying,
      alt: 'Alumnas en Reformer durante una clase de grupos reducidos',
      width: 4096,
      height: 4096
    },
    mat: {
      src: local.classStanding,
      alt: 'Práctica en el estudio, con seguimiento durante la clase',
      width: 4096,
      height: 4096
    },
    personal: {
      src: local.reformerDetail,
      alt: 'Trabajo de precisión en Reformer, con bandas y springs',
      width: 1440,
      height: 1801
    }
  },
  studio: [
    {
      src: local.classRow,
      alt: 'Fila de máquinas Reformer en el estudio de Villa Crespo',
      caption: 'Villa Crespo',
      width: 4096,
      height: 4096
    },
    {
      src: local.classStanding,
      alt: 'Grupo reducido trabajando en Reformer, con luz pareja',
      caption: 'Grupo reducido',
      width: 4096,
      height: 4096
    },
    {
      src: local.reformerDetail,
      alt: 'Detalle de Reformer de madera, springs y accesorios',
      caption: 'El Reformer',
      width: 1440,
      height: 1801
    }
  ] satisfies StudioImage[],
  cta: {
    src: local.classLying,
    alt: 'Alumnas recostadas en Reformer durante una clase en el estudio',
    width: 4096,
    height: 4096
  },
  og: {
    src: '/og.jpg',
    alt: 'Pilates Villa Crespo, estudio de Reformer en Buenos Aires',
    width: 1200,
    height: 630
  },
  community: [
    {
      src: local.igIntro,
      alt: 'Ilustración del estudio: ¿qué tipo de alumna sos?'
    },
    {
      src: local.igTypes,
      alt: 'Ilustración: distintos ritmos en una misma clase'
    },
    {
      src: local.igTalkative,
      alt: 'Ilustración: el estudio también es un lugar para conversar'
    }
  ]
}
