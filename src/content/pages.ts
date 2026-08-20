import { business } from '@/content/business'
import { routes } from '@/lib/routes'

export const pages = {
  villaCrespo: {
    path: routes.villaCrespo,
    seo: {
      title: 'Pilates en Villa Crespo',
      description: 'Estudio de Pilates en Villa Crespo, CABA. Clases de Reformer y Mat en grupos reducidos, a pasos de Warnes. Reservá una clase de prueba.'
    },
    hero: {
      eyebrow: 'Estudio en el barrio',
      title: 'Un estudio de Pilates en Villa Crespo, pensado para tu ritmo',
      description: `En ${business.local.streetAddress} encontrás un espacio íntimo para moverte mejor, con o sin experiencia previa. Grupos reducidos, atención cercana y una primera clase para conocer cómo trabajamos.`
    }
  },
  classes: {
    path: routes.classes,
    seo: {
      title: 'Clases de Pilates',
      description: 'Conocé las clases de Pilates Reformer, Mat y personalizadas en Villa Crespo. Elegí la modalidad que mejor se adapte a vos y reservá una clase de prueba.'
    },
    hero: {
      eyebrow: 'Modalidades',
      title: 'Tres formas de practicar Pilates, según lo que necesites',
      description: 'Reformer, Mat o una sesión personalizada. Las tres se adaptan a tu nivel: no hace falta haber practicado antes para empezar.'
    }
  },
  reformer: {
    path: routes.reformer,
    seo: {
      title: 'Pilates Reformer',
      description: 'Clases de Pilates Reformer en Villa Crespo. Grupos reducidos, todos los niveles y una primera clase para conocer la máquina y el estudio.'
    },
    hero: {
      eyebrow: 'Pilates Reformer',
      title: 'Reformer con guía cercana, en grupos reducidos',
      description: 'La máquina acompaña el movimiento, suma resistencia y ayuda a trabajar fuerza, control y postura. En el estudio lo hacemos con atención personalizada, a tu ritmo.'
    }
  },
  schedule: {
    path: routes.schedule,
    seo: {
      title: 'Horarios y precios',
      description: 'Consultá horarios y planes de Pilates en Villa Crespo. Confirmamos disponibilidad y valores al reservar tu clase de prueba.'
    },
    hero: {
      eyebrow: 'Información práctica',
      title: 'Horarios, planes y cómo reservar tu lugar',
      description: 'Mirá la grilla de referencia, elegí un plan según tu ritmo y escribinos para confirmar cupo. Los valores se confirman al consultar disponibilidad.'
    }
  },
  trial: {
    path: routes.trial,
    seo: {
      title: 'Clase de prueba',
      description: 'Reservá tu primera clase de Pilates en Villa Crespo. Sin experiencia previa: te contamos qué esperar, qué llevar y cómo llegar al estudio.'
    },
    hero: {
      eyebrow: 'Primera visita',
      title: 'Tu clase de prueba, con calma y sin experiencia previa',
      description: 'Venís, conocés el estudio, practicás en un grupo reducido y ves si el horario y la dinámica te quedan cómodos. Te confirmamos el cupo antes de que vengas.'
    }
  }
} as const

export const classGuide = [
  {
    id: 'reformer',
    name: 'Pilates Reformer',
    forWhom: 'Todos los niveles',
    href: routes.reformer,
    what: 'Es la práctica sobre la máquina Reformer: un carro móvil, springs y accesorios que acompañan cada ejercicio. Permite trabajar fuerza, movilidad y control con más contención que el trabajo solo en el piso.',
    who: 'Sirve si nunca hiciste Pilates, si volvés a moverte o si ya practicás y buscás un espacio más cuidado. La máquina se regula: no hace falta “saber” usarla de antemano.',
    next: 'Si te interesa esta modalidad, podés leer cómo es una clase de Reformer o ir directo a reservar una clase de prueba.'
  },
  {
    id: 'mat',
    name: 'Pilates Mat',
    forWhom: 'Ideal para comenzar',
    href: `${routes.classes}#pilates-mat`,
    what: 'Es el trabajo en colchoneta, con el propio cuerpo como resistencia. Se enfoca en fuerza, movilidad y conciencia del centro, con ejercicios que podés reconocer y repetir con claridad.',
    who: 'Puede ser un buen punto de partida si preferís empezar sin máquina, o un complemento si ya venís a Reformer y querés sostener la práctica de otra forma.',
    next: 'Para conocer el espacio y la dinámica del estudio, lo más simple es una clase de prueba. Ahí vemos juntos qué modalidad te queda mejor.'
  },
  {
    id: 'personal',
    name: 'Pilates Personalizado',
    forWhom: 'Objetivos específicos',
    href: `${routes.classes}#pilates-personalizado`,
    what: 'Es una sesión pensada 100% para una persona: ritmo, objetivos y necesidades de ese momento. Hay más tiempo para corregir, adaptar y seguir de cerca cada movimiento.',
    who: 'Tiene sentido si buscás un trabajo más puntual, si preferís no estar en grupo, o si querés una mirada más detallada sobre tu práctica.',
    next: 'La disponibilidad de sesiones personalizadas se confirma al consultar. Podés empezar por una clase de prueba y, si hace falta, vemos esta opción.'
  }
] as const

export const reformerGuide = {
  what: [
    'El Reformer es una máquina de Pilates con un carro que se desplaza, springs que regulan la resistencia y accesorios para brazos, piernas y postura. El movimiento queda más guiado que en el piso: sentís el trabajo, pero con un recorrido más contenido.',
    'En el estudio lo usamos en grupos reducidos, para poder mirar cómo te acomodás y ajustar el ejercicio si hace falta. No es una clase masiva ni una rutina igual para todas.'
  ],
  how: [
    'Llegás, te recibimos y te explicamos cómo es la máquina. La primera vez no esperamos que “sepas” nada: te mostramos dónde ponerte, cómo empujar y cuándo frenar.',
    'La clase combina fuerza, control y movilidad, con pausas para acomodar. El objetivo no es hacer más repeticiones, sino moverte con claridad y sin apuro.'
  ],
  who: [
    'Puede servirte si nunca hiciste Pilates, si estás volviendo a moverte o si ya practicás y querés un espacio más íntimo. También si te interesa trabajar postura y fuerza sin un formato de gym tradicional.',
    'Si tenés una lesión, una operación reciente o una necesidad muy puntual, avisanos al reservar. Vemos juntas si esta clase es el mejor primer paso o si conviene una sesión más personalizada.'
  ],
  firstClass: [
    'Llegá unos minutos antes. Traé ropa cómoda, agua y medias antideslizantes si las usás. El resto está en el estudio.',
    'En la primera clase priorizamos que entiendas la máquina y te sientas segura. No hace falta experiencia previa. Al final, si querés, vemos horarios para continuar.'
  ]
}

export const trialGuide = {
  how: [
    'Elegís un día y un horario de la grilla de referencia. Nos dejás tu nombre y WhatsApp. Te confirmamos si hay cupo y te recordamos la dirección.',
    'El día de la clase llegás un poco antes, te mostramos el espacio y practicás con el resto del grupo, con seguimiento cercano.'
  ],
  expect: [
    'Un grupo reducido, un ritmo calmo y alguien que te indique cómo acomodarte. No es una clase para “seguir de lejos”: si es tu primera vez, te acompañamos en cada paso.',
    'Vas a moverte, sí, pero el foco está en que entiendas qué estás haciendo. Salís con una idea clara de cómo es practicar acá, no con una rutina imposible de repetir.'
  ]
}
