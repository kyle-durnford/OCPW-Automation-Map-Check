import React from 'react';
import good from '../assets/check.svg'
import error from '../assets/error.svg'
import Project from "../assets/Project.js"

const ProjectDrawer = ({parcelCount, lines, curves, lineErrors, curveErrors, lineMissing, curveMissing, inputMapType, inputParcelCount}) => {

    const linePercent = Math.round((100 - ((lineErrors)/lines*100)))
    const curvePercent = Math.round((100 - ((curveErrors)/curves*100)))
    const totalPercent = Math.round((100 - (((lineErrors + curveErrors)/(lines + curves)) * 100)))

    return (
        <div className="project">
            {totalPercent > 80 ? <div className="validation--success"><img src={good} alt="Pass" style={{marginRight: '.5rem'}}></img>File meets standards</div> : <div className="validation--error"><img src={error} alt="Fail" style={{marginRight: '.5rem'}}></img>File does not meet standards</div>}
            {inputParcelCount != parcelCount ? <div className="validation--error" style={{marginTop: '1rem'}}><img src={error} alt="Fail" style={{marginRight: '.5rem'}}></img>Inputted parcel count ({inputParcelCount}) does not match detected parcel count ({parcelCount})</div> : null}
            <div className="project__title"><span className="project__title__icon"><Project color={'rgb(87, 110, 239)'}/></span><p>Details</p></div>
            <div>
                <div className="info__row">
                    <div className="info__block">
                        <p>{parcelCount}</p>
                        <p className="info__title">Parcels</p>
                    </div>
                    <div className="info__block">
                        <p>{lines + curves}</p>
                        <p className="info__title">Total Segments</p>
                    </div>
                </div>
                <div className="info__row">
                    <div className="info__block">
                        <p>{lines}</p>
                        <p className="info__title">Line Segments</p>
                    </div>
                    <div className="info__block">
                        <p>{curves}</p>
                        <p className="info__title">Curve Segments</p>
                    </div>
                </div>
                <div className="info__row">
                    <div className="info__block">
                        <p>{lineErrors}</p>
                        <p className="info__title">Line Segment Errors</p>
                    </div>
                    <div className="info__block">
                        <p>{curveErrors}</p>
                        <p className="info__title">Curve Segment Errors</p>
                    </div>
                </div>
                {/* <div className="info__row">
                    <div className="info__block">
                        <p>{lineMissing}</p>
                        <p className="info__title">Line Segment Warnings</p>
                    </div>
                    <div className="info__block">
                        <p>{curveMissing}</p>
                        <p className="info__title">Curve Segment Warnings</p>
                    </div>
                </div> */}
                <div className="info__row">
                    <div className="info__block">
                        <p>{(lines + curves) - (lineErrors + curveErrors)}</p>
                        <p className="info__title">Total Passing</p>
                    </div>
                    <div className="info__block">
                        <p>{lineErrors + curveErrors}</p>
                        <p className="info__title">Total Failing</p>
                    </div>
                </div>
                <div className="info__row">
                    <div className="info__block">
                        <p>{Number.isNaN(linePercent) ? "0" : linePercent}%</p>
                        <p className="info__title">Line Segment Passing %</p>
                    </div>
                    <div className="info__block">
                        <p>{Number.isNaN(curvePercent) ? "0" : curvePercent}%</p>
                        <p className="info__title">Curve Segment Passing %</p>
                    </div>
                </div>
                <div className="info__row">
                    <div className="info__block">
                        <p>{Number.isNaN(totalPercent) ? "0" : totalPercent}%</p>
                        <p className="info__title">Total Passing %</p>
                    </div>
                    <div className="info__block">
                        <p></p>
                        <p className="info__title"></p>
                    </div>
                </div>
                {/* <div className="info__row">
                    <div className="info__block">
                        <p>{lines + curves}</p>
                        <p className="info__title">Total Segments</p>
                    </div>
                    <div className="info__block">
                        <p>37</p>
                        <p className="info__title">Monuments</p>
                    </div>
                </div>
                <div className="info__row">
                    <div className="info__block">
                        <p>25</p>
                        <p className="info__title">References</p>
                    </div>
                    <div className="info__block">
                        <p>18</p>
                        <p className="info__title">Record Dimensions</p>
                    </div>
                </div>
                <div className="info__row">
                    <div className="info__block">
                        <p>0</p>
                        <p className="info__title">Geodetic Ties</p>
                    </div>
                    <div></div>
                </div> */}
            </div>
        </div>
    )
}

export default ProjectDrawer