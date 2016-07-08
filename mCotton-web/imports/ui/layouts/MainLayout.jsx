import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

const lightMuiTheme = getMuiTheme(lightBaseTheme);
const darkMuiTheme = getMuiTheme(darkBaseTheme);

import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

const styles = {
    title: {
        cursor: 'pointer',
    },
};

//const handleTouchTap = () => {
//    // alert('onTouchTap triggered on the title component');
//};

const handleHome = () => {
    FlowRouter.go(FlowRouter.path("Home"));
};

const handleChangeSingle = (event, value) => {
    switch(value) {
        case 0:
            return FlowRouter.go(FlowRouter.path("Home"));
        case 1:
            return FlowRouter.go(FlowRouter.path("createDevice"));
    }
};

const renderAppBarLeft = () => {
    //switch (this.props.layoutMode) {
    //    case LAYOUT_EDIT:
    //    case LAYOUT_RUN:
    //        return (
    //            <IconButton onClick={this.handleClickCarousel}><ActionViewCarousel /></IconButton>
    //        );
    //}
    return (
        <IconMenu iconButtonElement={ <IconButton><NavigationMenu /></IconButton> }
                  onChange={this.handleChangeSingle} >

            <MenuItem primaryText="Home"
                      leftIcon={<IconButton><ActionHome /></IconButton>}
                      />
            <MenuItem primaryText="Add Device"
                      leftIcon={<IconButton><ActionSettings /></IconButton>}
                      />
        </IconMenu>
    );
};

const renderHeader = () => {
    return (
        <AppBar
            title="mCotton 2.0"
            iconElementLeft={<div><IconButton onClick={handleHome}><ActionHome /></IconButton> <AccountsUIWrapper /></div>}
        />
    )

    //// var headerTitle = this.props.headerTitle ? this.props.headerTitle : "mCotton 2.0";
    //
    //var menuItems = [
    //    { route: 'ProjectList', text: 'Home' },
    //    { route: 'customization', text: 'Customization' },
    //    { route: 'components', text: 'Components' },
    //];
    //
    //return (
    //    <AppBar title="mCotton 2.0"
    //            onTitleTouchTap={handleTouchTap}
    //            iconElementLeft={renderAppBarLeft()}
    //            iconElementRight={ <AccountsUIWrapper /> }
    //    />
    //)
};

const renderFooter = () => {
    //return (
    //    <Toolbar float="right">
    //        <ToolbarGroup float="right">
    //            <IconButton><ActionSettings /></IconButton>
    //        </ToolbarGroup>
    //    </Toolbar>
    //)

};

const MainLayout = ({content}) => (
    <div className="main-layout">
        <MuiThemeProvider muiTheme={lightMuiTheme}>
            <div>
                <header>
                    {renderHeader()}
                </header>
                <main>
                    {content}
                </main>
                <footer id="pageFooter">
                    {renderFooter()}
                </footer>
            </div>
        </MuiThemeProvider>
    </div>
);

export default MainLayout
