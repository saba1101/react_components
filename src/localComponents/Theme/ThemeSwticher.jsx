import style from '@/localComponents/Theme/ThemeSwitcher.module.scss'
import IconThemeDark from '@/assets/svgComponents/IconThemeDark'
import { useDispatch, useSelector } from "react-redux"
import { SetTheme } from '@/redux/Theme/ThemeStore'
import { GlobalTheme } from '@/utils/Theme'

const ThemeSwitcher = () => {
    const dispatch = useDispatch()
    const ToggleTheme = () => {
        const current = GlobalTheme()._getCurrentTheme()
        const modes = GlobalTheme().Modes
        if(current ==  modes.LIGHT){
            GlobalTheme()._setTheme(modes.DARK)
            dispatch(SetTheme(modes.DARK)) 
        } 
        if(current ==  modes.DARK){
            GlobalTheme()._setTheme(modes.LIGHT)
            dispatch(SetTheme(modes.LIGHT))
        } 
    }
    return (
        <div className={
            `   
                ${style.themeSwitcherWrapper}
                ${GlobalTheme()._getCurrentTheme() === GlobalTheme().Modes.LIGHT ? style.white : GlobalTheme()._getCurrentTheme() === GlobalTheme().Modes.DARK ? style.dark : ''}    
            `
        }
        onClick={ToggleTheme}
        >
            <IconThemeDark/>
        </div>
    )
}

export default ThemeSwitcher