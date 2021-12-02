import React from 'react';
import good from '../assets/check.svg'
import Project from "../assets/Project.js"

const projectDrawerCont = {
    style: {
        backgroundColor: '#fff',
        borderRadius: '1rem',
        width: '100%',
        padding: '1rem',
    }
}

const validationCont = {
    style: {
        backgroundColor: '#ebfaf0',
        color: '#5bd381',
        padding: '.5rem',
        width: '100%',
        borderRadius: '.5rem',
        fontSize: '1rem'
    }
}

const infoRow = {
    style: {
        display: 'flex',
        justifyContent: 'flex-start',
    }
}

const infoBlock = {
    style: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '1.5rem',
        width: '50%',
        padding: '.75rem 0',
        lineHeight: '1.2'
    }   
}

const infoCont = {
    style: {

    }
}

const infoBlockTitle = {
    style: {
        fontSize: '.75rem',
        color: '#aaa'
    }
}

const drawerTitle = {
    style: {
        color: 'rgb(87, 110, 239)',
        margin: '1rem 0 .5rem 0',
        display: 'flex',
        alignItems: 'center'
    }
}

const drawerTitleIcon = {
    style: {
        color: 'rgb(87, 110, 239)',
        backgroundColor: '#F0F2FF',
        width: '3rem',
        height: '3rem',
        borderRadius: '100%',
        marginRight: '.5rem',
        padding: '0 .2rem .2rem 0'
    }
}

const ProjectDrawer = ({parcelCount, lines, curves}) => {
    return (
        <div {...projectDrawerCont}>
            <div {...validationCont}><img src={good} alt="Pass" style={{marginRight: '.5rem'}}></img>Validation Completed</div>
            <div {...drawerTitle}><span {...drawerTitleIcon}><Project color={'rgb(87, 110, 239)'}/></span><p>Details</p></div>
            <div {...infoCont}>
                <div {...infoRow}>
                    <div {...infoBlock}>
                        <p>#6531</p>
                        <p {...infoBlockTitle}>Review</p>
                    </div>
                    <div {...infoBlock}>
                        <p>{parcelCount}</p>
                        <p {...infoBlockTitle}>Parcels</p>
                    </div>
                </div>
                <div {...infoRow}>
                    <div {...infoBlock}>
                        <p>{lines}</p>
                        <p {...infoBlockTitle}>Line Segments</p>
                    </div>
                    <div {...infoBlock}>
                        <p>{curves}</p>
                        <p {...infoBlockTitle}>Curve Segments</p>
                    </div>
                </div>
                <div {...infoRow}>
                    <div {...infoBlock}>
                        <p>{lines + curves}</p>
                        <p {...infoBlockTitle}>Total Segments</p>
                    </div>
                    <div {...infoBlock}>
                        <p>37</p>
                        <p {...infoBlockTitle}>Monuments</p>
                    </div>
                </div>
                <div {...infoRow}>
                    <div {...infoBlock}>
                        <p>25</p>
                        <p {...infoBlockTitle}>References</p>
                    </div>
                    <div {...infoBlock}>
                        <p>18</p>
                        <p {...infoBlockTitle}>Record Dimensions</p>
                    </div>
                </div>
                <div {...infoRow}>
                    <div {...infoBlock}>
                        <p>0</p>
                        <p {...infoBlockTitle}>Geodetic Ties</p>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDrawer