import React from "react"

const AppBar = ({handleClickOpen, setMapSplit, mapSplit, files}) => {

    return (
        <div className="appbar">
            <div className="appbar__review">{files[0]?.name}</div>
            <div className="appbar__toggle">
                <div className={mapSplit === 1 ? "appbar__toggle--left appbar__toggle--left--selected" : "appbar__toggle--left"} onClick={() => setMapSplit(1)}><span className={mapSplit === 1 ? "appbar__toggle__box--left appbar__toggle__box--left--selected" : "appbar__toggle__box--left"}></span></div>
                <div className={mapSplit === 2 ? "appbar__toggle--middle appbar__toggle--middle--selected" : 'appbar__toggle--middle' } onClick={() => setMapSplit(2)}><span className={mapSplit === 2 ? "appbar__toggle__box--middle--left appbar__toggle__box--middle--left--selected" : "appbar__toggle__box--middle--left"}></span><span className={mapSplit === 2 ? "appbar__toggle__box--middle--right appbar__toggle__box--middle--right--selected" : "appbar__toggle__box--middle--right"}></span></div>
                <div className={mapSplit === 3 ? "appbar__toggle--right appbar__toggle--right--selected" : "appbar__toggle--right"} onClick={() => setMapSplit(3)}><span className={mapSplit === 3 ? "appbar__toggle__box--right appbar__toggle__box--right--selected" : "appbar__toggle__box--right"}></span></div>
            </div>
            <div className="appbar__button">
                <div className="button button--outline button--fit" onClick={handleClickOpen}>upload</div>
            </div>
        </div>
    )
}

export default AppBar