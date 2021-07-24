import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import MainHeader from './Mainheader';
import SideDrawer from './SideDrawer';
import NavLinks from './Navlinks';
import Backdrop from '../UIElements/Backdrop';
import './Mainnavigation.css';

const MainNavigation = props => {
    const [isOpen, setToOpen] = useState(false);

    const openDrawer = () => {
        setToOpen(true);
    };

    const closeDrawer = () => {
        setToOpen(false);
    };

    return  (
        <React.Fragment>
            {isOpen && <Backdrop  onClick={closeDrawer}/>}
            <SideDrawer show={isOpen} onClick={closeDrawer}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawer}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">Your Places!!</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;