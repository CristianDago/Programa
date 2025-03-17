type PositiveFeedbackOptions =
  | ""
  | "AÚN SIN RESPUESTAS"
  | "NO SE MATRICULARÁ"
  | "INCONTACTABLE"
  | "PERSONA INTERESADA QUE ENVIARÁ DOCUMENTACIÓN"
  | "PERSONA QUE ENVIÓ DOCUMENTACIÓN PERO LE FALTA FIRMAR SU MATRÍCULA"
  | "PERSONA QUE IRÁ A MATRICULARSE DIRECTAMENTE A LA ESCUELA"
  | "PERSONA CON DOCUMENTACIÓN Y MATRÍCULA FIRMADA EN ESCUELA"
  | "INTERESADA PARA PRÓXIMO AÑO"
  | "PERSONA QUE ENVÍA DOCUMENTACIÓN Y SE DEBE TRASLADAR A OTRA PLANILLA";


export interface StudentList {
    id:string;
    name: string;
    lastname: string;
    rut?: string; 
    positiveFeedback: PositiveFeedbackOptions;
  }
  