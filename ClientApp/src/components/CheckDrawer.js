import React, {useEffect} from 'react';

const reportDrawerCont = {
    style: {
        backgroundColor: '#fff',
        borderRadius: '1rem',
        width: '100%',
        padding: '1rem',
    }
}

const categoryLink = {
    style: {
        padding: '1rem',
        borderLeft: '3px solid #6E7998',
        color: '#6E7998',
        cursor: 'pointer',
        fontSize: '1rem'
    }
}

const selectedCategoryLink = {
    style: {
        padding: '1rem',
        borderLeft: '3px solid #576eef',
        color: '#576eef',
        cursor: 'pointer',
        fontSize: '1rem'
    }
}

const CheckDrawer = ({setSection, section}) => {

    useEffect(() => {
        console.log(section)
    }, [section])

    return (
        <div {...reportDrawerCont}>
            <ul>
                <li {...(section === 1 ? {...selectedCategoryLink} : {...categoryLink})} onClick={() => setSection(1)}>Top of all sheets</li>
                <li {...(section === 2 ? {...selectedCategoryLink} : {...categoryLink})} onClick={() => setSection(2)}>Title Sheet</li>
                <li {...(section === 3 ? {...selectedCategoryLink} : {...categoryLink})} onClick={() => setSection(3)}>All Map Sheets</li>
                <li {...(section === 4 ? {...selectedCategoryLink} : {...categoryLink})} onClick={() => setSection(4)}>Monumentation</li>
                <li {...(section === 5 ? {...selectedCategoryLink} : {...categoryLink})} onClick={() => setSection(5)}>Mapping Standards</li>
                <li {...(section === 6 ? {...selectedCategoryLink} : {...categoryLink})} onClick={() => setSection(6)}>Surveying Procedures</li>
                <li {...(section === 7 ? {...selectedCategoryLink} : {...categoryLink})} onClick={() => setSection(7)}>County Recorders Certificate</li>
                <li {...(section === 8 ? {...selectedCategoryLink} : {...categoryLink})} onClick={() => setSection(8)}>Surveyor’s Statement</li>
                <li {...(section === 9 ? {...selectedCategoryLink} : {...categoryLink})} onClick={() => setSection(9)}>County Surveyor’s Statement</li>
            </ul>
        </div>
    )
}

export default CheckDrawer