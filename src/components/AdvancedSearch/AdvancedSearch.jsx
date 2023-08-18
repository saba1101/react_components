import { useEffect, useRef } from 'react'
import { useState } from 'react'
import style from '@/components/AdvancedSearch/AdvancedSearch.module.scss'

import IconSearch from '@/assets/svgComponents/IconSearch.jsx'
import IconConfigure from '@/assets/svgComponents/IconConfigure.jsx'
import Xicon from '@/assets/svgComponents/Xicon.jsx'

import Checkbox from '@/components/Form/FormControls/Checkbox/Checkbox.jsx'
import Arrow from '@/assets/svgComponents/Arrow.jsx'


const AdvancedSearch = ({
    mode,
    multiChoice,
    configureData,
    categories,
    categoryLabel,
    placeholder,
    value,
    selectedCategoryId,
    onChange,
    onCategoryChange,
}) => {
    const Instance = useRef({
        SEARCH_TYPES: {
            DEFAULT: 'default',
            CONFIGURE: "configure",
            CATEGORIES: 'category',
        },
        DEFAULTS: {
            PLACEHOLDER: "Search...."
        }
    })

    const ConfigureTemplateRef = useRef()
    const CategoryTemplateRef = useRef()


    const [ConfigureDropdownVisible,setConfigureDropdownVisible] = useState(false)
    const [CategoryDropdownVisible,setCategoryDropdownVisible] = useState(false)


    const ExpandConfigure = () => {
        setConfigureDropdownVisible(state => !state)
    }

    const ClearValue = () => {
        if(onChange && typeof onChange === 'function'){
            onChange('')
        }        
    }

    const onInputChange = (e) => {
        const eventValue = e.target.value
        if(onChange && typeof onChange === 'function'){
            onChange(eventValue)
        }
    }

    const onItemClick = (item) => {
        if(onChange && typeof onChange === 'function'){
            onChange(item.parameter)
        }
    }

    const onMultiSelectionFilterChange = (params) => {
        if(onChange && typeof onChange === 'function'){
            onChange(params)
        }
    }

    const syncSelectedCategory = (categoryObj) => {
        if(onCategoryChange && typeof onCategoryChange === 'function'){
            onCategoryChange(categoryObj)
            setCategoryDropdownVisible(false)
        }
    }

    const ClickHandler = (event) => {
        setCategoryDropdownVisible(false)
        setConfigureDropdownVisible(false)
    }

    useEffect(() => {
        document.addEventListener('click',ClickHandler)
        return () => {
            document.removeEventListener('click',ClickHandler)
        }
    },[])


    const ConfigureDropdownTemplate = (
        {
            data,
            onSelect,
            multiChoice,
            onClose,
            value,
            triggerValueChange
        }
    ) => {

        const onItemChange = (state,element) => {
            let newValue = state ? (value + ' ' + element.parameter ) : (value.replace(element.parameter,''))
            triggerValueChange(newValue)
        }

        return (
            <div className={style.configureDropdownTemplate} ref={ConfigureTemplateRef} onClick={e => e.stopPropagation()}>
                <ul>
                    {
                        data && data.map((element,index) => {
                            return (
                                <li key={index}>
                                    {
                                        !multiChoice ? (
                                            <div className={style.contentWrapper} onClick={() => (onSelect(element),onClose())}>
                                                <span className={style.itemTitle} data-filter-param={element?.parameter}>
                                                    { element?.label }
                                                </span>              
                                            </div> 
                                        ) : (element.group && element.children) ? (
                                            <>
                                                <div className={style.groupLabel}>
                                                    <span>
                                                        {element.label}
                                                    </span>
                                                </div>
                                                {
                                                    element.children.map((child,ind) => {
                                                        return (
                                                            <div key={ind} className={style.multiChoiceContentWrapper}>
                                                                <Checkbox
                                                                    checked={value.includes(child.parameter)}
                                                                    change={(state) => onItemChange(state,child)}
                                                                />
                                                                <span className={style.itemTitle}>
                                                                    { child?.label }
                                                                </span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </>
                                        ) : (
                                            <div className={style.multiChoiceContentWrapper}>
                                                <Checkbox
                                                    checked={value.includes(element.parameter)}
                                                    change={(state) => onItemChange(state,element)}
                                                />
                                                <span className={style.itemTitle}>
                                                    { element?.label }
                                                </span>
                                            </div>
                                        )
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    const CategoryDropdownTemplate = ({
        title,
        data,
        dropdownVisible,
        onDropdownVisibleChange,
        selectedCategoryId,
        onCategorySelect,
    }) => {
        return (
            <>
                <div className={style.categoryDropdownTemplate} onClick={e => e.stopPropagation()}>
                    <div className={style.selectedCategory} onClick={onDropdownVisibleChange}>
                         <span className={style.selectedCategoryLabel}>
                            {
                                data?.filter(el => el.id == selectedCategoryId).length ? data?.filter(el => el.id == selectedCategoryId)[0].label : (title ?? '')
                            }
                         </span>
                         <Arrow/>
                    </div>
                    {
                        (dropdownVisible && data) && (
                            <div className={style.categoryList} ref={CategoryTemplateRef}>
                                <ul>
                                    {
                                        data && data.map((element,index) => {
                                            return (
                                                <li key={index} onClick={() => onCategorySelect(element)}>
                                                    
                                                        {
                                                            element.icon && (
                                                                <div className={style.categoryItemIcon}>
                                                                    { element.icon() }    
                                                                </div>
                                                            )
                                                        }
                                                    <span className={style.categoryLabel}>
                                                        {element.label}
                                                    </span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    }
                </div>
            </>
        )
    }

    return (
        <>
            <div className={style.advancedSearchComponentsWrapper}>
                <div className={`
                    ${mode.includes(Instance.current.SEARCH_TYPES.CATEGORIES) ? style.adaptLeftPadding : ''}
                    ${style.searchContainer}
                `}>
                    <div className={style.leftActionsBar}>
                        {
                            ((mode && mode === Instance.current.SEARCH_TYPES.DEFAULT)
                            || (Array.isArray(mode) && mode.includes(Instance.current.SEARCH_TYPES.DEFAULT))) && (
                                <div className={style.defaultIconWrapper}>
                                    <IconSearch/>
                                </div>
                            )
                        }
                        {
                            (mode && mode === Instance.current.SEARCH_TYPES.CATEGORIES) && (
                                <div className={style.categoriesContainerWrapper}>
                                    <CategoryDropdownTemplate
                                        data={categories}
                                        dropdownVisible={CategoryDropdownVisible}
                                        title={categoryLabel}
                                        onDropdownVisibleChange={() => setCategoryDropdownVisible(state => !state)}
                                        onCategorySelect={(selectedCategory) => syncSelectedCategory(selectedCategory)}
                                        selectedCategoryId={selectedCategoryId}
                                    />
                                </div>
                            )
                        }
                    </div>
                    <div className={style.inputWrapper}>
                        <input 
                            type="text"
                            placeholder={placeholder ?? Instance.current.DEFAULTS.PLACEHOLDER}
                            value={value ?? ''}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <div className={style.rightActionsBar}>
                        {
                            (value && value.length) && (
                                <div className={style.iconClearValue} onClick={ClearValue}>
                                    <Xicon/>
                                </div>
                            )
                        }

                        {
                            ((mode && mode === Instance.current.SEARCH_TYPES.CONFIGURE)
                            || (Array.isArray(mode) && mode.includes(Instance.current.SEARCH_TYPES.CONFIGURE))) && (
                                <div className={style.configureContainerWrapper} onClick={e => e.stopPropagation()}>
                                    <div className={style.configureIconAction} onClick={ExpandConfigure}>
                                        <IconConfigure/>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {
                        ConfigureDropdownVisible && (
                            <ConfigureDropdownTemplate
                                onSelect={(item) => onItemClick(item)}
                                data={configureData}
                                onClose={() => setConfigureDropdownVisible(false)}
                                value={value}
                                multiChoice={multiChoice}
                                triggerValueChange={onMultiSelectionFilterChange}
                            />
                        )
                    }
                </div>
            </div>
        </>
    )    
}

export default AdvancedSearch