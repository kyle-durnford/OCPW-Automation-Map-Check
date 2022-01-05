import React from "react"

const AppBar = (props) => {

    return (
        <div className="appbar">
            <div className="appbar__review"></div>
            <div>
                {/* Add code for mapViewToggle */}
            </div>
            <div>
                {/* Add code to place export/save buttons when maps are uploaded */}
                <div>
                    <div className="button button--outline" onClick={props.handleClickOpen}>Upload</div>
                </div>
            </div>
        </div>
    )
}

export default AppBar