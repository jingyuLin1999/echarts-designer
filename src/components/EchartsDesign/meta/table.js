
import { baseForm, widgetLayout, baseSchema, coddeButton, borderLayout } from "./base";

export const form = {
    ...baseForm,
    ...coddeButton,
    layout: [
        { ...borderLayout },
    ],
}

export const schema = {
    ...baseSchema
}

export const values = {

}



