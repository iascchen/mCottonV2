var React = require('react');

export default class Affix extends React.Component {
    constructor(a, b, c) {
        super(a, b, c);
        this.state = {
            affix: false
        };
    }

    handleScroll() {
        var affix = this.state.affix;
        var offset = this.props.offset;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if (!affix && scrollTop >= offset) {
            this.setState({
                affix: true
            });
        }

        if (affix && scrollTop < offset) {
            this.setState({
                affix: false
            });
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    /**
     * @return {void}
     */
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    render() {
        if (this.state.affix) {
            return (
                <div id="AffixContainer" className="affix">
                    <div className="spacer"></div>
                    <div className="fix">
                        {this.props.children}
                    </div>
                </div>
            );
        } else {
            return this.props.children;
        }
    }

}
Affix.propTypes = { offset: React.PropTypes.number.isRequired };
