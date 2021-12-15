import React from 'react';
import good from '../assets/check.svg'
import Project from "../assets/Project.js"

const ProjectDrawer = ({parcelCount, lines, curves}) => {
    return (
        <div className="project">
            <div className="validation--success"><img src={good} alt="Pass" style={{marginRight: '.5rem'}}></img>Validation Completed</div>
            <div className="project__title"><span className="project__title__icon"><Project color={'rgb(87, 110, 239)'}/></span><p>Details</p></div>
            <div>
                <div className="info__row">
                    <div className="info__block">
                        <p>#6531</p>
                        <p className="info__title">Review</p>
                    </div>
                    <div className="info__block">
                        <p>{parcelCount}</p>
                        <p className="info__title">Parcels</p>
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
                </div>
            </div>
        </div>
    )
}

export default ProjectDrawer