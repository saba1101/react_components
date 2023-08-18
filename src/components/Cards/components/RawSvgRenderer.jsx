
const RawSvgRenderer = (image) => {
    return (
        <div>
          <img style={{width: image.iconWidth}} src={`data:image/svg+xml;utf8,${encodeURIComponent(image.svg)}`} />
        </div>
    )
}
export default RawSvgRenderer;
