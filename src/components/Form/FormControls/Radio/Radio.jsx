import style from '@/components/Form/FormControls/Radio/Radio.module.scss'

const Radio = (
    {
        checked,
        change,
        disabled,
        isRequired,
        withUncheckState,
    }
) => {

    const onChange = () => {
        if(change && typeof change === 'function'){
            if(withUncheckState){
                change(!checked)
            }else{
                change(true)
            }
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
                required={isRequired ?? false}
            />
            <div className={style.radioState}></div>
        </div>
    )
}

export default Radio