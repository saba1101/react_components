const _getSize = (size) => {
    if(size && !['xs','small','medium','large','fullsize'].includes(size)) return 'medium'
    return size ? size : 'small'
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

const _isProd = location.href.indexOf('.upgaming.dev') > 0 || location.href.indexOf('.upgaming.com') > 0

const __formatDate = (dateOrTimestamp, format) =>  {
  let date;
  if (dateOrTimestamp instanceof Date) {
    date = dateOrTimestamp;
  } else if (typeof dateOrTimestamp === 'number') {
    date = new Date(dateOrTimestamp);
  } else if (typeof dateOrTimestamp === 'string') {
    date = new Date(dateOrTimestamp);
  } else {
    throw new Error('Invalid date or timestamp provided.');
  }

  const tokens = {
    YYYY: date.getUTCFullYear().toString(),
    MM: (date.getUTCMonth() + 1).toString().padStart(2, '0'),
    DD: date.getUTCDate().toString().padStart(2, '0'),
    HH: date.getUTCHours().toString().padStart(2, '0'),
    mm: date.getUTCMinutes().toString().padStart(2, '0'),
    ss: date.getUTCSeconds().toString().padStart(2, '0'),
    ms: date.getUTCMilliseconds().toString().padStart(3, '0')
  };

  const formatTokens = Object.keys(tokens).join('|');
  const formattedString = format.replace(new RegExp(formatTokens, 'g'), match => tokens[match]);

  return formattedString;
}

const __formatToFixedPoint = (int,fixedPoint) => {
  const stringTypeFormat =  int.toString()
  const splitTypeFormat = stringTypeFormat.split('')
  const fixedsplitTypeFormat = splitTypeFormat.slice(0,splitTypeFormat.length - fixedPoint)
  const joinedFixedTypeFormat = fixedsplitTypeFormat.join('')
  return Number(joinedFixedTypeFormat) || parseInt(joinedFixedTypeFormat)
}



export {
    _getSize,
    _calculateSizeByUnit,
    _getFileFormat,
    _toBase64,
    _isProd,
    __formatDate,
    __formatToFixedPoint,
}