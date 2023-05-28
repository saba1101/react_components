import { NavLink,useLocation, useNavigate} from 'react-router-dom'
import style from './Sidebar.module.scss'
import { RoutesData } from '../../Routes/RoutesData.js'
import { useEffect, useState } from 'react'
import IconLogo from '@/assets/icons/svg/reactLogo.svg'
const Sidebar = () => {
    const [FormNavExpanded,setFormNavExpanded] = useState(false)
    const location = useLocation();
    const navigate = useNavigate()
    const currentRoute = location.pathname;

    useEffect(() => {
        if(RoutesData.find(el => el.collapsable)?.children.map(c => c.path).includes(currentRoute)) setFormNavExpanded(true)
        else setFormNavExpanded(false)
    },[currentRoute])

    const navigateToURL = (e,path,direct) => {
        e.stopPropagation()
        console.log(path)
        if(direct && path) navigate(path)
        else{
            setFormNavExpanded(true)
        }
    }

    return (
        <div className={style.sidebarContent}>
            <div className={style.logo}>
                <img src={IconLogo} alt="" />
                <span>Master Components</span>
            </div>
            <div className={style.parentNavList}>
                {
                    RoutesData.map((r,ind) => {
                        return (
                            <div className={`${style.routeItem} ${currentRoute === r.path ? style.current : ''}`} key={ind} onClick={(e) => navigateToURL(e,r.path,true)}>
                                <span className={`${(r.collapsable && FormNavExpanded) ? style.parentLabel : ''}`}> { r.label } </span>
                                {
                                    (r.collapsable && r.children && FormNavExpanded) && (
                                        <div className={`${style.childNavList} ${FormNavExpanded ? style.isExpanded : ''}`}>
                                            {
                                                r.children.map((c,index) => {
                                                    return (
                                                        <div className={`${style.routeChildItem} ${currentRoute === c.path ? style.current : ''}`} key={index} onClick={(e) => navigateToURL(e,c.path,true)}>
                                                            <span> { c.label } </span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar