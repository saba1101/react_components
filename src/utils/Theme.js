
export const GlobalTheme = () => {
    const Lstore = window.localStorage
    const Modes = {
        LIGHT: 'theme_light',
        DARK: 'theme_dark',
    }

    const _setTheme = (mode) => {
        Lstore.setItem('__theme_mode',mode)
        const bodyClasses = document.querySelector('body').classList
        if(bodyClasses.contains('theme_dark') || bodyClasses.contains('theme_light') ){
            bodyClasses.remove('theme_dark')
            bodyClasses.remove('theme_light')
        }
        
        bodyClasses.add(mode)
    }

    const _getCurrentTheme = () => {
        return Lstore.getItem('__theme_mode')
    }

    const _createTheme = () => {
        if(!Lstore.getItem('__theme_mode')){
            Lstore.setItem('__theme_mode',Modes.LIGHT)
        }
    }

    return {
        Modes,
        _setTheme,
        _getCurrentTheme,
        _createTheme,
    }
}