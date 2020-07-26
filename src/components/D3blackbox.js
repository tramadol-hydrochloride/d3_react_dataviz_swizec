import React from 'react';

const D3blackbox = (D3render) => {
    return (
        class Blackbox extends React.Component {
            anchor = React.createRef();

            componentDidMount() {
                D3render(this.anchor, this.props, this.state);
            }

            componentDidUpdate() {
                D3render(this.anchor, this.props, this.state);
            }

            render() {
                const {x, y} = this.props;
                const Component = this.props.component || "g";

                return React.createElement(Component, {
                    transform: `translate(${x}, ${y})`,
                    ref: this.anchor
                });
            }
        }
    );
}

const useD3 = (render) => {
    const refAnchor = React.useRef(null);

    React.useEffect(() => {
        render(refAnchor.current);
    });

    return refAnchor;
};

export {D3blackbox, useD3}
