import React, {
    Component,
    PropTypes
} from 'react';
import  {
    Image,
    PixelRatio,
    Dimensions
} from 'react-native';


const propTypes = {
    originalHeight: PropTypes.number,
    originalWidth: PropTypes.number,
    source: PropTypes.object.isRequired
};

class FitImage extends Component {
    render() {
        const imageHeightPx = this.props.originalHeight
        const imageWidthPx = this.props.originalWidth
        const screenWidthPt = Dimensions.get('window').width
        const screenHeightPt = Dimensions.get('window').height
        const screenWidthPx = PixelRatio.getPixelSizeForLayoutSize(screenWidthPt)

        let newImageWidth = (imageWidthPx >= screenWidthPx) ?
            screenWidthPt :
            (imageWidthPx / screenWidthPx) * screenWidthPt
        let newImageHeight = (imageWidthPx >= screenWidthPx) ?
            (imageHeightPx / imageWidthPx) * screenWidthPt :
            (imageHeightPx / imageWidthPx) * newImageWidth

        return (
            <Image
                source={this.props.source}
                style={{
                    width: newImageWidth,
                    height: newImageHeight
                }}
            />
        )
    }
}

FitImage.propTypes = propTypes;

export default FitImage;
