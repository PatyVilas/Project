import { useForm } from "../../utils/hooks/useForm";
import { validationsForms } from "../../utils/helpers";


const initialForm = {
    name: "",
    email: "",
    subject: "",
    comments: "",
}

function ContactForm() {
    const { form, errors, loading, response, handleChange, handleBlur, handleSubmit } = useForm(initialForm, validationsForms);
  
    return (
        <div>
            <h2 className="titleForm"> Formulario de Contacto</h2>
            <form className="loginForm" onSubmit={handleSubmit}>
                <fieldset className="fieldsetForm">
                    <legend className="legendForm">Contact Us</legend>
                    <label> Nombre
                        <input
                            className="inputLabel"
                            type="text"
                            name="name"
                            placeholder="Escribe tu nombre"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.name}
                            required />
                    </label>
                    <label className="error">{errors.name && <p>{errors.name}</p>}</label>
                    <label> Email
                        <input     
                            className="inputLabel"
                            type="email"
                            name="email"
                            placeholder="Escribe tu email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.email}
                            required />
                    </label>
                    <label className="error">{errors.email && <p>{errors.email}</p>}</label>
                    <label> Motivo de consulta
                        <input
                            className="inputLabel"
                            type="text"
                            name="subject"
                            placeholder="Motivo de consulta"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.subject}
                            required />
                    </label>
                    <label className="error">{errors.subject && <p>{errors.subject}</p>}</label>
                    <label>
                        <textarea
                            className="textarea"
                            name="comments"
                            cols="50"
                            rows="5"
                            placeholder="Escribe aquí tu consulta"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.comments}
                            required></textarea>
                    </label>
                    <label className="error">{errors.comments && <p>{errors.comments}</p>}</label>
                    <label>
                        <input className="button--brown" type="submit" value="Enviar" />
                    </label>
                </fieldset>
            </form>
            {loading && <p>...loading</p>}
            {response && <p>Los datos han sido enviados</p>}
        </div>
    );  
}   

export default ContactForm;