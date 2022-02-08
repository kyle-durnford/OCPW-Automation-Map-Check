export let viewer;
export let viewerDbIds;
let da_jsonData;
const Autodesk = window.Autodesk;

export const launchViewer = (urn, setMapInfo) => {
    
    let options = {
        env: 'AutodeskProduction',
        api: 'derivativeV2',
        getAccessToken: getForgeToken,
        "da_jsonData": da_jsonData,
        reverseMouseZoomDir: true
    }

    Autodesk.Viewing.Initializer(options, () => {
         // The documentId is a string value of the URN of the model that was translated.
        // The value assigned to documentId must be prefixed with the string urn:
        let documentId = 'urn:' + urn;
        //let documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6djFmenN4bWh2ZmhpeHJ2Y3NrNHZzZGdrNGN0bzRmN2ctZGVzaWduYXV0b21hdGlvbi8yMDIxMTIwODEwNTgyMV9PQy1Nb2RpZnlfQWxpc29DcmVla0Rvd25TdHJlYW1Cb3VuZGFyeTIwMjAtVjMuZHdn';

        viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), {extensions: ['Autodesk.DocumentBrowser']}); // 'TransExplorerExtension' , { extensions: ['ModelSummaryExtensionClass', 'Autodesk.DocumentBrowser', 'OverLayGeometry' ] }
        let startedCode = viewer.start(null, null, null, null, {
            webglInitParams: {
                useWebGL2: false
            }
        });

    if (startedCode > 0) {
        console.error('Failed to create a Viewer: WebGL not supported.');
        return;
    }

        // Creatre Viewer instance
        console.log('Initialization complete, loading a model next...');

        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
        console.log("initialization complete, creating the viewer...");
    });
    setMapInfo("loaded")
}

export const onDocumentLoadSuccess = (viewerDocument) => {
    // viewerDocument is an instance of Autodesk.Viewing.Document

    console.log("Executing onDocumentLoadSuccess function.")
    let defaultModel = viewerDocument.getRoot().getDefaultGeometry();
    viewer.loadDocumentNode(viewerDocument, defaultModel).then(async function (model) {
        await afterViewerEvents(
            viewer,
            [
                Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
                Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT
            ]
        );
            // if (hid) {
            //     // Call Function to zoom in to object on viewer.
            //     executeFitToViewHandleId(hid);

            //     overLayGeometryExtension.searchSelectedObj(hid, viewerDbIds)
            // }

        // Run other functionalities after model is done loading.
        console.log("Viewer GEOMETRY_LOADED_EVENT and OBJECT_TREE_CREATED_EVENT is completely loaded.")

        // Get all dbIds and hIds from the forge viewer model for dynimc connections
        // for button labels, segments from esri map and data table.
        getForgeViewerModelDbIds()

    });
    console.log("Check if Viewer is completely loaded.")
    return ""
}

export const onDocumentLoadFailure = (viewerErrorCode) => {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}
export const onDocumentLoadFailure2 = () => {
    console.error('Failed fetching Forge manifest');
}

export const getForgeToken = (callback) => {
    fetch('/api/forge/oauth/token').then(res => {
        res.json().then(data => {
            callback(data.access_token, data.expires_in);
        });
    });
}


export const afterViewerEvents = (viewer, events) => {
    let promises = [];
    events.forEach(function (event) {
        promises.push(new Promise(function (resolve, reject) {
            let handler = function () {
                viewer.removeEventListener(event, handler);
                console.log(`Removed event listener for ${event}`)
                resolve();
            }
            viewer.addEventListener(event, handler);
            console.log(`Added event listener for ${event}`)
        }));
    });

    return Promise.all(promises)
}

// Zoom into dbId object in the viewer model.
export const fitToViewerHandleId = (hId) => {
    let dbId = viewerDbIds[hId.toUpperCase()]
    if (dbId !== "undefined") {
        viewer.select(dbId)
        viewer.utilities.fitToView()
    }
}

// Get all hIds:dbIds from the viewer model 
export const getForgeViewerModelDbIds = () => {
    viewer.model.getExternalIdMapping(data => {
        viewerDbIds = data
    })
}

export default {
    launchViewer,
    onDocumentLoadSuccess,
    onDocumentLoadFailure,
    onDocumentLoadFailure2,
    getForgeToken,
    afterViewerEvents,
    getForgeViewerModelDbIds,
    fitToViewerHandleId,
    viewer,
    viewerDbIds
}

// let viewer;
// let Autodesk = window.Autodesk

// const launchViewer = urn => {
//     let options = {
//         env: 'AutodeskProduction',
//         api: 'derivativeV2',
//         accessToken: getForgeToken
//     }

//     let documentId = 'urn:' + urn;

//     Autodesk.Viewing.Initializer(options, function onInitialized() {
//         Autodesk.Viewing.Document.load(documentId, onLoadSuccess, onLoadFailure)
//     })
// }

// const onLoadSuccess = doc => {
//     let viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type':'geometry'}, true)
//     if (viewables.length === 0) {
//         console.error('Document contains no viewables.');
//         return;
//     }

//     let initialViewable = viewables[0];
//     let svfUrl = doc.getViewablePath(initialViewable);
//     let modelOptions = {
//         sharedPropertyDbPath: doc.getPropertyDbPath()
//     };

//     let viewerDiv = document.getElementById('forgeViewer');
//     viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
//     viewer.start(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
// }

// const onLoadFailure = viewerErrorCode => {
//     console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
// }

// const onLoadModelSuccess = model => {
//     console.log('onLoadModelSuccess()!');
//     console.log('Validate model loaded: ' + (viewer.model === model));
//     console.log(model);
// }

// const onLoadModelError = viewerErrorCode => {
//     console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
// }

// const getForgeToken = callback => {
//     fetch('/api/forge/oauth/token').then(res => {
//         res.json().then(data => {
//             callback(data.access_token, data.expires_in);
//         });
//     });
// }

// export default launchViewer