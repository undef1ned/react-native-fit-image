import React, {
    Component,
    PropTypes
} from 'react';
import  {
    Image,
    PixelRatio
} from 'react-native';


const propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    originalHeight: PropTypes.number,
    originalWidth: PropTypes.number,
    source: PropTypes.object.isRequired,
    style: Image.propTypes.style,
};

class FitImage extends Component {
    constructor(props) {
        super(props);

        const size = [props.width, props.height];
        const originalSize = [props.originalWidth, props.originalHeight];

        if (size.filter(e => e).length === 1) {
            throw new Error('Props error: size props must be present ' +
            'none or both of width and height.');
        }

        if (originalSize.filter(e => e).length === 1) {
            throw new Error('Props error: originalSize props must be present ' +
            'none or both of originalWidth and originalHeight.');
        }

        this.state = {
            height: 0,
            width: 0,
            layoutWidth: undefined,
            originalWidth: undefined,
            originalHeight: undefined,
        };
    }

    componentDidMount() {
        const width = this.props.originalWidth
        const height = this.props.originalHeight

        const newHeight = this.state.layoutWidth / width;

        this.setState({
            height: newHeight,
            originalWidth: width,
            originalHeight: height,
        });
    }

    getStyle() {
        if (this.props.width) {
            return { width: this.props.width };
        }
        if (this.state.width) {
            return { width: this.state.width };
        }
        return { flex: 1 };
    }

    getOriginalWidth() {
        return this.props.originalWidth || this.state.originalWidth;
    }

    getOriginalHeight() {
        return this.props.originalHeight || this.state.originalHeight;
    }

    getRatio(width) {
        const layoutWidth = width || this.state.layoutWidth;

        return layoutWidth / this.getOriginalWidth();
    }

    getHeight(layoutWidth) {
        if (this.props.height) {
            return this.props.height;
        }

        return this.getOriginalHeight() * this.getRatio(layoutWidth);
    }

    resize(event) {
        const { width } = event.nativeEvent.layout;
        const pixelWidth = PixelRatio.getPixelSizeForLayoutSize(width)
        if (this.props.originalWidth < pixelWidth) {
            this.setState({
                width: (this.props.originalWidth / pixelWidth) * width
            })
        }
        const height = this.getHeight(width);


        this.setState({
            height,
            layoutWidth: width,
        });
    }

    render() {
        return (
            <Image
                source={this.props.source}
                style={[
                    { height: this.state.height },
                    this.props.style,
                    this.getStyle(),
                ]}
                onLayout={(event) => this.resize(event)}
            />
        );
    }
}

FitImage.propTypes = propTypes;

export default FitImage;
