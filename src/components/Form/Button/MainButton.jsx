import style from './MainButton.module.scss'

const MainButton = (
    {
        label,
        disabled,
        loading,
        type,
        size,
        customStyle,
        icon,
        onClick
    }
) => {

    const _getSize = () => {
        if(size && !['small','medium','large'].includes(size)) return 'medium'
        return size ? size : 'medium'
    }

    const _getType = () => {
        if(type && !['background','border','text'].includes(type)) return 'background'
        return type ? type : 'background'
    }

    const iconSlot = () => {
        return icon
    }
    const loadingDots = () => {
        return (
            <div className={style.loading}>
                <div className={style.leftDot}></div>
                <div className={style.centerDot}></div>
                <div className={style.rightDot}></div>
            </div>
        )
    }

    return (
        <button 
            style={customStyle && typeof customStyle == 'object' ? {...customStyle} : {}} 
            className={`${style['mainButton']} ${style[_getSize()]} ${style[_getType()]} ${disabled ? style['disabled'] : ''} ${loading ? style.loadingState : ''}`}
            onClick={() => {
                if(onClick && typeof onClick === 'function') onClick()
            }}
        >
            { loading && typeof loading === 'boolean' ? loadingDots() : ''  }
            <span className={style['buttonLabel']}> { label ?? 'Button' } </span>
            <div className={style.iconSlot}>
                {icon ? iconSlot() : '' }
            </div>
        </button>
    )
}

export default MainButton