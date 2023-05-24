import style from './Radio.module.scss'

const Radio = (
    {
        checked,
        change,
        disabled,
        isRequired,
    }
) => {

    const onChange = () => {
        if(change && typeof change === 'function'){
            change(!checked)
        }
    }

    return (
        <div 
            className={
                `
                    ${style.radioWrapper}
                    ${checked ? style.checked : ''}
                    ${disabled ? style.disabled : ''}
                `
            }
            onClick={onChange}
        >
            <input 
                type="radio" 
                checked={true}
                readOnly={true}
                hidden
                disabled={disabled ?? false}
                required={isRequired ?? fale}
            />
            <div className={style.radioState}></div>
        </div>
    )
}

export default Radio