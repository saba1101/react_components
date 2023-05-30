const _getSize = (size) => {
    if(size && !['small','medium','large'].includes(size)) return 'medium'
    return size ? size : 'medium'
}

const _calculateSizeByUnit = (x) => {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    let l = 0, n = parseInt(x, 10) || 0;
    while(n >= 1024 && ++l){
      n = n/1024;
    }
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  }

const _getFileFormat = (filename) => filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);

const _toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result.split(',')[1])
      reader.onerror = (error) => reject(error)
})


export {
    _getSize,
    _calculateSizeByUnit,
    _getFileFormat,
    _toBase64,
}