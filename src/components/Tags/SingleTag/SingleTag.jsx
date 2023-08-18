import style from '@/components/Tags/SingleTag/SingleTag.module.scss'
import { useRef } from 'react'
import IconTagLabel from '@/assets/svgComponents/IconTagLabel.jsx'
import TooltipLabel from '@/components/Tooltip/Tooltip.jsx'
import IconXRemove from '@/assets/svgComponents/IconXRemove.jsx'

const SingleTag = (
    {
        id,
        type,
        icon,
        withIcon = true,
        allowDelete,
        label,
        size,
        withTooltip,
        tooltipText,
        disabled,
        onDelete,
    }
) => {
    const DefinedTypes = useRef([
        'gray',
        'red',
        'purple',
        'coolBlue',
        'blue',
        'yellow',
        'green',
        'hightContrast',
    ])

    const DefinedSvgLabelColors = useRef({
        gray: '#141719',
        red: '#DA1A1C',
        purple: '#5236E4',
        coolBlue: '#0F437F',
        blue: '#0266EF',
        yellow: '#8C6A00',
        green: '#138761',
        hightContrast: '#FFFFFF',
    })
    
    const TagRef = useRef(null)

    const GetType = () => {
        if(!DefinedTypes.current.includes(type)) return 'gray'
        else return type
    }

    const DeleteTag = () => {
        if(onDelete && typeof onDelete === 'function'){
            onDelete(id ? id : null)
        }
    }

    return (
        <div className={
            `
                ${style.singleTagComponentWrapper}
                ${size && ['small','medium'].includes(size) ? style[size] : style['medium']}
            `
        }>
            <div ref={TagRef} className={
                `
                    ${style.tagContentWrapper}
                    ${style[GetType()]}
                    ${disabled ? style.disabled : ''}
                `
                }
                style={
                    {
                        paddingRight: allowDelete ? '0' : '0.5rem'
                    }
                }
            >

                {
                    withIcon && (
                        <div className={style.tagIconPlaceholder}>
                            {icon ? icon() : withIcon && !icon ? <IconTagLabel stroke={DefinedSvgLabelColors.current[GetType()]}/> : ''}
                        </div>
                    )
                }

                <div className={style.tagLabelPlaceholder}>
                    {
                        withTooltip && (
                            <TooltipLabel label={tooltipText ?? label}>
                                <span>
                                    {label ?? '-'}
                                </span>                                
                            </TooltipLabel>
                        )
                    }
                    {
                        !withTooltip && (
                            <span>
                                {label ?? '-'}
                            </span>
                        )
                    }
                </div>

                {
                    allowDelete && (
                        <div className={style.tagActionPlaceholder} onClick={DeleteTag}>
                            <IconXRemove/>
                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default SingleTag