import React,{ useState,useEffect } from 'react'

const useForm = (initialFieldValue,validate,setCurrentId) => {

    const [values,setValues] = useState(initialFieldValue)
    const [errors,setErrors] = useState({})

    const handleInputChange = (event) => {

        const {name,value} = event.target
        const fieldValues = {[name]:value}

        setValues({
             ...values,
             ...fieldValues
        })

        validate(fieldValues)
    }

    const resetForm = () => {
        setValues({
            ...initialFieldValue
        })

        setErrors({})
        setCurrentId(0)
    }

    return{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}

export default useForm