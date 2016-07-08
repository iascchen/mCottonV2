import React, {Component, PropTypes} from 'react';
import {GridList} from 'material-ui/GridList';
import {GridTile} from 'material-ui/GridList';

const defaultBreakPoint = {
    2: 480,
    4: 720,
    8: 1280,
    16: Infinity,
};

export class ResponsiveGirdList extends Component {
    get breakpoints() {
        return this.props.breakpoints || defaultBreakPoint;
    };

    handleCurrentState() {
        const windowWidth = window.innerWidth;
        const bp = this.breakpoints;
        let cols = 16;

        for (let col in bp) {
            if (bp.hasOwnProperty(col) && windowWidth < bp[col]) {
                cols = col;
                break;
            }
        }

        return { windowWidth: windowWidth, cols: parseInt(cols) };
    }

    handleResize() {
        this.setState(this.handleCurrentState());
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.last_refresh !== nextProps.refresh) {
            return true;
        }
        this.last_refresh = nextProps.refresh;
        return nextState.cols !== this.state.cols;
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
        this.handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    render() {
        return (
            <container id={this.props.id} type="page">
                <GridList cols={this.state.cols}>
                    {this.props.children}
                </GridList>
            </container>
        );
    }
}

ResponsiveGirdList.propTypes = {
    breakpoints: PropTypes.object,
};

export class ResponsiveGirdTile extends Component {
    render() {
        const control = this.props.children;
        const type = this.props.type || control.type;
        const cols = this.props.cols || type.cols || control.cols;
        const rows = this.props.rows || type.rows || control.rows;

        return (
            <GridTile rows={rows} cols={-1}>
                {control}
            </GridTile>
        );
    }
}

ResponsiveGirdTile.propTypes = {
    control: PropTypes.object,
    cols: PropTypes.number,
    rows: PropTypes.number,
};
