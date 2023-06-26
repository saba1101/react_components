import { useEffect, useRef } from 'react'
import style from '@/components/Form/FormControls/Checkbox/Checkbox.module.scss'
// import IconCheckMark from '@/assets/icons/svg/checkmark.svg'
// import IconMinus from '@/assets/icons/svg/minus.svg'
import Minus from '@/assets/svgComponents/Minus.jsx'
import Checkmark from '@/assets/svgComponents/Checkmark.jsx'
const Checkbox = (
    {
        checked,
        change,
        disabled,
        isRequired,
        multipleChecked,
    }
) => {
    const CheckboxRef = useRef(null)

    const onChange = () => {
        if(change && typeof change === 'function'){
            change(!checked)
        }
    }

    return (
        <div 
            className={`${style.checkboxWrapper} ${checked ? style.checked : style.unChecked} ${disabled ? style.disabled : ''}`}
            onClick={onChange}
        >
            <div>
                <div className={style.checkMark}>
                    <input 
                        ref={CheckboxRef} 
                        type="checkbox"  
                        checked={checked} 
                        hidden
                        readOnly={true}
                        required={isRequired ?? false}
                    />
                    {
                        checked ? (multipleChecked ? <Minus/> : <Checkmark/>) : ''
                        // checked ? (<img src={multipleChecked ? IconMinus : IconCheckMark} alt="" />): ''
                    }
                </div>
            </div>
        </div>
    )
}

export default Checkbox