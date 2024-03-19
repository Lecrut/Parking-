const emailPattern
    = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/

export function requiredRule() {
    return (value: string | number | null, textError = "Pole jest wymagane") => {
        return Boolean(value) || textError
    }
}

export function emailRule() {
    return (value: string, textError = "Niepoprawny format email") => {
        return emailPattern.test(value) || textError
    }
}

export function passwordRule() {
    return (value: string, textError = "Min 8 znaków i 1 wielka litera") => {
        return patternPassword.test(value) || textError
    }
}

export function lengthRuleShort() {
    return (value: string | string[], textError = "Nazwa jest za krótka.") => {
        return Boolean(value?.length > 3) || textError
    }
}

export function lengthRule() {
    return (value: string | string[], textError = "Nazwa jest za długa") => {
        return Boolean(value?.length <= 10) || textError
    }
}