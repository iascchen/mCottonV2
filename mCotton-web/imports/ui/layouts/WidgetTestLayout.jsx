import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import AppBar from 'material-ui/AppBar';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ImageNavigate from 'material-ui/svg-icons/image/navigate-before';
import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import {ResponsiveGirdList, ResponsiveGirdTile} from '../components/lists/ResponsiveGirdList';

const lightMuiTheme = getMuiTheme(lightBaseTheme);
const darkMuiTheme = getMuiTheme(darkBaseTheme);

//import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

const testBreakPoint = {
    2: 480,
    4: Infinity,
};

export default function WidgetTestLayout(props) {
    const controls = props.children;

    return (
        <div className="main-layout">
            <MuiThemeProvider muiTheme={lightMuiTheme}>
                <div>
                    <header>
                        <AppBar
                            iconElementLeft={<IconButton href="/" linkButton={true}><ImageNavigate /></IconButton>}
                            title="Widget Test"
                        />
                    </header>
                    <main>
                        <ResponsiveGirdList breakpoints={testBreakPoint}>

                            {props.children.map((item) => (
                                <ResponsiveGirdTile type={item.type}>
                                    {item}
                                </ResponsiveGirdTile>
                            ))}

                        </ResponsiveGirdList>
                    </main>
                    <footer id="pageFooter">
                        <Toolbar float="right">
                            <ToolbarGroup float="right">
                                <IconButton><ActionSettings /></IconButton>
                            </ToolbarGroup>
                        </Toolbar>
                    </footer>
                </div>
            </MuiThemeProvider>
        </div>
    )
};
