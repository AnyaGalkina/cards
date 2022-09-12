import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react"


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {

    return (
        <button
            className={""}
            {...restProps}
        />
    )
}

export default SuperButton
