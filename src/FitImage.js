import React, {
    Component
} from 'react'
import  {
    Image,
    Dimensions
} from 'react-native'

export default class FitImage extends Component {

    state = {
        height: 0,
        width: 0
    }

    componentDidMount(){
        Image.getSize(this.props.source.uri, (imageWidthPx, imageHeightPx) => {
            const screenWidthPt = Dimensions.get('window').width

            let newImageWidth = (imageWidthPx >= screenWidthPt) ?
                screenWidthPt : imageWidthPx
            let newImageHeight = (imageHeightPx / imageWidthPx) * newImageWidth
            this.setState({
                width: Math.round(newImageWidth),
                height: Math.round(newImageHeight)
            })
        })

    }

    render() {
        return (
            <Image
                source={this.props.source}
                style={{
                    width: this.state.width,
                    height: this.state.height
                }}
            />
        )
    }
}
