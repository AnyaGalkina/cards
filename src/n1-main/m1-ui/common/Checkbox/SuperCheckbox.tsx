import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import styles from './SuperCheckbox.module.css'


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
    {
        type,
        onChange, onChangeChecked,
        className, spanClassName,
        children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        if(onChangeChecked) {
            onChangeChecked(e.currentTarget.checked);
        }
        if(onChange) {
            onChange(e);
        }
    }

    const finalInputClassName = `${styles.checkbox} ${className ? className : ''}`

    return (
        <label>
            <input
                type={'checkbox'}
                onChange={onChangeCallback}
                className={finalInputClassName}

                {...restProps}
            />
            {children && <span className={styles.spanClassName}>{children}</span>}
        </label> // благодаря label нажатие на спан передастся в инпут
    )
}

export default SuperCheckbox
