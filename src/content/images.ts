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
  groupRest: '/images/497275881_18069912067940230_9013976940119170084_n.jpg',
  sideKick: '/images/491543415_18067417318940230_1430160949737132260_n.jpg',
  sideStraps: '/images/491460285_18067417309940230_4341070358452224722_n.jpg',
  legsUp: '/images/490894052_18067417300940230_910443114374101002_n.jpg',
  instructorStretch: '/images/469724939_18055414516940230_1480617481387555384_n.jpg',
  classLunge: '/images/469484851_18055161493940230_1885284855283819032_n.jpg',
  hamstring: '/images/463165023_18050759218940230_4701405280753415713_n.jpg',
  magicCircle: '/images/469491082_18055164925940230_8588060605917881083_n.jpg',
  emptyReformers: '/images/469576293_18055161670940230_4762255815645022345_n.jpg',
  igIntro: '/images/729840644_18110474839940230_4468849611169536055_n.jpg',
  igTalkative: '/images/730943322_18110474884940230_3314266488773308055_n.jpg',
  igTypes: '/images/730854593_18110474848940230_1004655565575655059_n.jpg'
}

export const images = {
  logo: {
    src: '/logo.png',
    alt: 'Logo de Pilates Villa Crespo',
    width: 417,
    height: 417
  },
  hero: {
    src: '/hero.png',
    mobile: '/hero_mobile.png',
    alt: 'Alumna en Reformer en el estudio de Villa Crespo',
    width: 1672,
    height: 941,
    mobileWidth: 916,
    mobileHeight: 1717
  },
  benefits: {
    src: local.classStanding,
    alt: 'Clase guiada en Reformer, con atención cercana en el estudio',
    width: 4096,
    height: 4096
  },
  firstTime: {
    src: local.legsUp,
    alt: 'Alumnas en Reformer durante una primera clase, con piernas en straps',
    width: 640,
    height: 800
  },
  classes: {
    reformer: {
      src: local.classLying,
      alt: 'Alumnas en Reformer durante una clase de grupos reducidos',
      width: 4096,
      height: 4096
    },
    mat: {
      src: local.sideKick,
      alt: 'Trabajo de lado en Reformer, con seguimiento durante la clase',
      width: 640,
      height: 800
    },
    personal: {
      src: local.reformerDetail,
      alt: 'Trabajo de precisión en Reformer, con bandas y springs',
      width: 1440,
      height: 1801
    }
  },
  reformerIntro: {
    src: local.sideStraps,
    alt: 'Alumnas trabajando con straps en Reformer',
    width: 640,
    height: 800
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
      src: local.instructorStretch,
      alt: 'Clase en grupo reducido, con guía cercana en el estudio',
      caption: 'Grupo reducido',
      width: 640,
      height: 682
    },
    {
      src: local.emptyReformers,
      alt: 'Reformers de madera alineados en el estudio, con luz natural',
      caption: 'El Reformer',
      width: 640,
      height: 410
    }
  ] satisfies StudioImage[],
  reformerGuide: [
    {
      src: local.hamstring,
      alt: 'Estiramiento en Reformer durante una clase en el estudio',
      width: 640,
      height: 480
    },
    {
      src: local.groupRest,
      alt: 'Grupo reducido en posición de descanso sobre el Reformer',
      width: 640,
      height: 800
    },
    {
      src: local.sideStraps,
      alt: 'Trabajo con straps en Reformer, en grupos reducidos',
      width: 640,
      height: 800
    }
  ] satisfies StudioImage[],
  pages: {
    villaCrespo: {
      src: local.instructorStretch,
      alt: 'Clase de Pilates en el estudio de Villa Crespo',
      width: 640,
      height: 682
    },
    classes: {
      src: local.groupRest,
      alt: 'Grupo reducido trabajando en Reformer en el estudio',
      width: 640,
      height: 800
    },
    reformer: {
      src: local.magicCircle,
      alt: 'Práctica de Pilates Reformer con accesorios en el estudio',
      width: 640,
      height: 800
    },
    schedule: {
      src: local.emptyReformers,
      alt: 'Máquinas Reformer listas para la clase en Villa Crespo',
      width: 640,
      height: 410
    },
    trial: {
      src: local.legsUp,
      alt: 'Primera clase de Pilates Reformer, sin experiencia previa',
      width: 640,
      height: 800
    }
  },
  cta: {
    src: local.classLunge,
    alt: 'Alumnas en Reformer durante una clase en el estudio',
    width: 640,
    height: 360
  },
  og: {
    src: '/og.jpg',
    alt: 'Pilates Reformer Villa Crespo — grupos reducidos, clase de prueba sin cargo',
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
