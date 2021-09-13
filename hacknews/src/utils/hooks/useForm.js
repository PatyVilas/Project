import { useState } from "react"


export const useForm = (initialForm, validateForm) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validateForm(form));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validateForm(form));

        if (Object.keys(errors).length < 1) {
            alert("Enviando mensaje");
            setLoading(true);

            
            setTimeout(() => setResponse(false), 5000);
            setForm(initialForm);
        } else {
            return
        }
    }

    return {
        form, errors, loading, response, handleChange, handleBlur, handleSubmit
    }
}