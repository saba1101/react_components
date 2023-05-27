import { useEffect, useRef, useState } from 'react'
import style from './Search.module.scss'
import IconSearch from '@/assets/icons/svg/search.svg'
import IconClear from '@/assets/icons/svg/x.svg'
import { _getSize } from '../../utils/Helpers'

const Search = (
    {
        value,
        size,
        withSuggestions,
        suggestions,
        change,
        placeholder,
    }
) => {
    const [Focused,setFocused] = useState(false)
    const [Collapsed,setCollapsed] = useState(false)
    const [SuggestionData,setSuggestionsData] = useState([])
    const SearchRef = useRef(null)

    useEffect(() => {
        if(withSuggestions && suggestions){
            ModifySuggestions()
        }
    },[suggestions,withSuggestions])

    useEffect(() => {
        document.addEventListener('click',ClickHandler)

        return () => {
            document.removeEventListener('click',ClickHandler)
        }
    },[])

    const ClickHandler = (event) => {
        if(event.composedPath().includes(SearchRef.current)) return
        setCollapsed(false)
    }

    const Focus = () => {
        setFocused(true)

        // if((withSuggestions && suggestions && !Collapsed) && !value.trim() !== '') setCollapsed(true)
    }

    const onChange = (value) => {
        if(change && typeof change === 'function'){
            change(value)
        }
        if(withSuggestions && suggestions && suggestions.length){
            setCollapsed(true)
        }
    }

    const SelectOption = (value) => {
        change(value)
        setCollapsed(false)
    }

    const clearValue = () => {
        change('')
    }

    const ModifySuggestions = () => {
        if(suggestions && suggestions instanceof Array){
          let splitedWords = suggestions.map(el => [el.split('')])
          setSuggestionsData(splitedWords)
        }
      }
    return (
        <div ref={SearchRef} className={`${style.searchWrapper} ${style[_getSize(size)]} ${Focused ? style.focused : ''}`}>
            <div className={style.iconSearch}>
                <img src={IconSearch} alt="" />
            </div>
            <div className={style.inputWrapper}>
                <input 
                    type="text" 
                    value={value}
                    onFocus={Focus}
                    onBlur={() => setFocused(false)}
                    onChange={(event) => onChange(event.target.value)}
                    spellCheck={false}
                    placeholder={placeholder ?? 'Search..'}
                />
            </div>
            <div onClick={clearValue} className={`${style.iconClear} ${value && value.trim() !== '' ? style.visible : style.hidden}`}>
                <img src={IconClear} alt="" />
            </div>
            {
                Collapsed && withSuggestions && suggestions.length && value ? (
                    <div className={style.suggestionOptions}>
                        <ul>
                            {
                                SuggestionData.map((s,ind) => {
                                    return (
                                        <li 
                                            key={ind}
                                            className={!s[0].join('').toLowerCase().includes(value.toLowerCase()) && value !== '' ? style.hidden : ''}
                                            onClick={() => SelectOption(s[0].join(''))}
                                        >
                                            {
                                                s[0].map((w,index) => {
                                                    return (
                                                        <span
                                                            key={index}
                                                            className={`${w.toLowerCase().includes(value.toLowerCase().split('')[index]) ? style.matchHighlight : ''}`}
                                                        >
                                                            {w}
                                                        </span>
                                                    )
                                                })
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
                : ''
            }
        </div>
    )
}

export default Search