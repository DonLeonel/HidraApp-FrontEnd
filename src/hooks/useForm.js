import { useState, useEffect } from "react"

export const useForm = (initalForm) => {

    const [formState, setFormState] = useState(initalForm)

    useEffect(() => {
        setFormState(initalForm)
    }, [initalForm]);

    const onInputChange = ({ target }) => {
        const { name, value } = target
        setFormState({
            ...formState,
            [name]: value
        })
    }

    return {
        formState,
        onInputChange
    }
}
