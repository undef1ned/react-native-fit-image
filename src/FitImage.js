import React, {
    Component
} from 'react'
import  {
    Image,
    Dimensions
} from 'react-native'

export default class FitImage extends Component {

    shouldComponentUpdate(){
        return false
    }

    render() {
        const imageHeightPx = this.props.originalHeight || 1
        const imageWidthPx = this.props.originalWidth || 1
        const screenWidthPt = Dimensions.get('window').width

        let newImageWidth = (imageWidthPx >= screenWidthPt) ?
            screenWidthPt : imageWidthPx
        let newImageHeight = (imageHeightPx / imageWidthPx) * newImageWidth

        return (
            <Image
                source={this.props.source}
                style={{
                    width: Math.round(newImageWidth),
                    height: Math.round(newImageHeight),
                    resizeMode: "contain"
                }}
            />
        )
    }
}
