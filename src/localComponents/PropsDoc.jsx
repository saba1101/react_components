const PropsDoc = (
{
    propsList
}
) => {
    return (
        <ul>
        {
            propsList && propsList.map((p,ind) => {
                return (
                    <li key={ind} className={p.propType}>
                        <span className='docs__label'>
                            <span> { p.title}</span> 
                        </span>
                        <span className='docs__type'>
                            <span>
                                { p.type} 
                            </span>
                        </span>
                        <span className='docs__description'>
                            <span>{ p.description}</span>
                        </span>
                        <span className='docs__example'> 
                            <span> { p.example} </span>
                        </span>
                    </li>
                )
            })
        }
    </ul>
    )
}

export default PropsDoc