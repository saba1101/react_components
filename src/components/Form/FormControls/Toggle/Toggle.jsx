import style from './Toggle.module.scss'

const Toggle = (
    {
        checked,
        change,
        disabled,
        isRequired
    }
) => {

    const onChange = () => {
        if(change && typeof change === 'function'){
            change(!checked)
        }
    }

    return (
        <div 
            onClick={onChange}
            className={`
                ${style.toggleWrapper}
                ${checked ? style.checked : ''}
                ${disabled ? style.disabled : ''}
            `}
        >
            <div className={style.toggleState}>
                <input 
                    type="checkbox" 
                    checked={checked} 
                    readOnly={true} 
                    disabled={disabled ?? false} 
                    hidden 
                    required={isRequired ?? false}
                />
            </div>
        </div>
    )
}

export default Toggle