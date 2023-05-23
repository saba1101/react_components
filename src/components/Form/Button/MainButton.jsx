import style from './MainButton.module.scss'

const MainButton = (
    {
        label,
        disabled,
        loading,
        type,
        size,
        customStyle,
        icon
    }
) => {

    const _getSize = () => {
        if(size && !['small','medium','large'].includes(size)) return 'medium'
        return size ? size : 'medium'
    }

    const _getType = () => {
        if(type && !['background','border','text'].includes(type)) return 'background'
        return type ? type : 'type-background'
    }

    const iconSlot = () => {
        return icon
    }

    return (
        <button style={customStyle && typeof customStyle == 'object' ? {...customStyle} : {}} className={`${style['mainButton']} ${style[_getSize()]} ${style[_getType()]} ${disabled ? style['disabled'] : ''}`}>
                <span className={style['buttonLabel']}> { label ?? 'Button' } </span>
                {icon ? iconSlot() : '' }
        </button>
    )
}

export default MainButton