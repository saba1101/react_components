import style from '@/components/Files/FileBlock/FileBlock.module.scss'
import Xicon from '@/assets/svgComponents/Xicon.jsx'
import File from '@/assets/svgComponents/File.jsx'
// import IconFile from '@/assets/icons/svg/file.svg'
// import IconDelete from '@/assets/icons/svg/xWhite.svg'

const FileBlock = (
    {
        file,
        onDelete
    }
) => {

    const DeleteFile = () => {
        if(onDelete && typeof onDelete === 'function') onDelete(file)
    }

    return (
        <div className={style.fileBlockWrapper}>
            <div className={style.leftSide}>
                <div className={style.filePreviewFormat}>
                    <div className={style.fileFormat}>
                        <span> { file && file?.format ? file.format : 'FILE' } </span>
                    </div>
                    <File/>
                    {/* <img src={IconFile} alt="" /> */}
                </div>
                <div className={style.fileName}>
                    <span>
                        {file && file?.fileName ? file.fileName : '-'}
                    </span>
                </div>
            </div>
            <div className={style.rightSide}>
                <div className={style.fileSize}>
                    <span>
                        { file && file?.unitSize ? file.unitSize : '' }
                    </span>
                </div>
            </div>
            <div className={style.deleteFile} onClick={DeleteFile}>
                <Xicon/>
                {/* <img src={IconDelete} alt="delete" /> */}
            </div>
        </div>
    )
}

export default FileBlock