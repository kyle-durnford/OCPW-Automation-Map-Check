import React from "react"

import '../custom.css'

const appBarProps = {
    style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid rgb(204 209 226)',
        padding: '1rem'
    }
    
};

const mapViewToggleProps = {

};

const buttonRowProps = {

};

const buttonOutlineProps = {
    style: {
        fontFamily: 'poppins, sans-serif',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#fe805c',
        padding: '.25rem 1.5rem',
        background: '#fff',
        border: '2px solid #fe805c',
        borderRadius: '.5rem',
        cursor: 'pointer',
        textTransform: 'uppercase',
        transition: 'color .2s ease, background.2s ease',
    }
};

const reviewNumProps = {
    style: {
        fontFamily: 'poppins, sans-serif',
        fontWeight: '600',
        fontSize: '1.5rem'
    }
};

const AppBar = (props) => {

    return (
        <div {...appBarProps}>
            <div {...reviewNumProps}></div>
            <div {...mapViewToggleProps}>
                {/* Add code for mapViewToggle */}
            </div>
            <div {...buttonRowProps}>
                {/* Add code to place export/save buttons when maps are uploaded */}
                <div>
                    <div {...buttonOutlineProps} className={`orangeOutlineButton`} onClick={props.handleClickOpen}>Upload</div>
                </div>
            </div>
        </div>
    )
}

export default AppBar