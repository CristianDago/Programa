import React from "react";
import { Student } from "../../../../interface/student/stundent";
import FormInput from "../formInput";
import { Grid } from "../../grid/grid";
import css from "../studentForms.module.scss";
import moment from "moment";

interface StudentFormProps {
  student: Student;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({
  student,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className={css.datosPersonales}>
        <h2>Datos personales</h2>
        <Grid className="grid-columns-3">
          <FormInput
            label="Nombres"
            name="name"
            type="text"
            value={student.name} 
            onChange={onChange}
            required
          />
          <FormInput
            label="Apellido"
            name="lastname"
            type="text"
            value={student.lastname} 
            onChange={onChange}
            required
          />
          <FormInput
            label="RUT"
            name="rut"
            type="text"
            value={student.rut} 
            onChange={onChange}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={student.email} 
            onChange={onChange}
          />
          <FormInput
            label="Teléfono"
            name="phone"
            type="text"
            value={student.phone} 
            onChange={onChange}
          />
          <FormInput
            label="Fecha de Nacimiento"
            name="birthdate"
            type="date"
            value={
              student.birthdate
                ? moment(student.birthdate).format("YYYY-MM-DD")
                : ""
            }
            onChange={onChange}
          />

          <FormInput
            label="Género"
            name="sex"
            type="select"
            value={student.sex} 
            onChange={onChange}
            options={["", "MASCULINO", "FEMENINO", "OTROS"]}
          />

          <FormInput
            label="Dirección"
            name="address"
            type="text"
            value={student.address} 
            onChange={onChange}
          />

          <FormInput
            label="Nacionalidad"
            name="nationality"
            type="text"
            value={student.nationality} 
            onChange={onChange}
          />

          <FormInput
            label="Fuente"
            name="source"
            type="select"
            value={student.source}
            onChange={onChange}
            options={["", "REDES SOCIALES", "CAPTADOR"]}
          />

          <FormInput
            label="Escuela"
            name="school"
            type="select"
            value={student.school} 
            onChange={onChange}
            options={[
              "",
              "QUINTA NORMAL",
              "BUÍN",
              "LA GRANJA",
              "ÑUÑOA",
              "PUDAHUEL",
              "SAN MIGUEL",
            ]}
          />

          <FormInput
            label="Curso"
            name="course"
            type="select"
            value={student.course} 
            onChange={onChange}
            options={[
              "",
              "1° NIVEL BÁSICO",
              "2° NIVEL BÁSICO",
              "3° NIVEL BÁSICO",
              "1° NIVEL MEDIO",
              "2° NIVEL MEDIO",
            ]}
          />
        </Grid>
      </div>

      <div className={css.datosComunicacion}>
        <h2>CONTACTO</h2>
        <Grid className="grid-columns-2">
          <FormInput
            label="Estado"
            name="positiveFeedback"
            type="select"
            value={student.positiveFeedback || ""}
            onChange={onChange}
            options={[
              "",
              "AÚN SIN RESPUESTAS",
              "NO SE MATRICULARÁ",
              "INCONTACTABLE",
              "PERSONA INTERESADA QUE ENVIARÁ DOCUMENTACIÓN",
              "PERSONA QUE ENVIÓ DOCUMENTACIÓN PERO LE FALTA FIRMAR SU MATRÍCULA",
              "PERSONA QUE IRÁ A MATRICULARSE DIRECTAMENTE A LA ESCUELA",
              "PERSONA CON DOCUMENTACIÓN y MATRÍCULA FIRMADA EN ESCUELA",
              "INTERESADA PARA PRÓXIMO AÑO",
              "PERSONA QUE ENVÍA DOCUMENTACIÓN Y SE DEBE TRASLADAR A OTRA PLANILLA",
            ]}
          />
          <FormInput
            label="¿Quién realizó el contacto?"
            name="contact"
            type="select"
            value={student.contact || ""}
            onChange={onChange}
            options={["", "LORENA", "ARLETTE", "MARÍA", "ROWINA"]}
          />
          <FormInput
            label="Fecha de contacto"
            name="contactDate"
            type="date"
            value={
              student.contactDate
                ? moment(student.contactDate).format("YYYY-MM-DD")
                : ""
            }
            onChange={onChange}
          />
          <FormInput
            label="Preferencia de Comunicación"
            name="communicationPreference"
            type="select"
            value={student.communicationPreference || ""}
            onChange={onChange}
            options={["", "WHATSAPP", "TELÉFONO"]}
          />

          <FormInput
            label="Llamada 1 - Completada"
            name="call1"
            type="select"
            value={student.call1}
            onChange={onChange}
            options={["", "SÍ", "NO"]}
          />
          <FormInput
            label="Comentario Llamada 1"
            name="comments1"
            type="text"
            value={student.comments1}
            onChange={onChange}
          />

          <FormInput
            label="Llamada 2 - Completada"
            name="call2"
            type="select"
            value={student.call2}
            onChange={onChange}
            options={["", "SÍ", "NO"]}
          />
          <FormInput
            label="Comentario Llamada 2"
            name="comments2"
            type="text"
            value={student.comments2}
            onChange={onChange}
          />

          <FormInput
            label="Llamada 3 - Completada"
            name="call3"
            type="select"
            value={student.call3}
            onChange={onChange}
            options={["", "SÍ", "NO"]}
          />
          <FormInput
            label="Comentario Llamada 3"
            name="comments3"
            type="text"
            value={student.comments3}
            onChange={onChange}
          />
        </Grid>
      </div>

      <div className={css.datosDocumentacion}>
        <h2>DOCUMENTACIÓN</h2>
        <Grid className="grid-columns-2">
          <FormInput
            label="Foto del Estudiante"
            name="studentImage"
            type="file"
            accept="image/*"
            onChange={onChange}
          />
          <FormInput
            label="Certificado de nacimiento"
            name="birthCertificate"
            type="file"
            accept="image/*"
            onChange={onChange}
          />
          <FormInput
            label="Certificado de estudio"
            name="studyCertificate"
            type="file"
            accept="image/*"
            onChange={onChange}
          />
          <FormInput
            label="Cédula de identidad"
            name="linkDni"
            type="file"
            accept="image/*"
            onChange={onChange}
          />
        </Grid>
      </div>
      <button type="submit">Actualizar estudiante</button>
    </form>
  );
};

export default StudentForm;
