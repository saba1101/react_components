const _getSize = (size) => {
    if(size && !['small','medium','large'].includes(size)) return 'medium'
    return size ? size : 'medium'
}

export {
    _getSize
}