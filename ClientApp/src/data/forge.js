let viewer;
let viewerDbIds;
let da_jsonData;
const Autodesk = window.Autodesk;

export const launchViewer = (urn) => {
    let options = {
        env: 'AutodeskProduction',
        api: 'derivativeV2',
        getAccessToken: getForgeToken,
        "da_jsonData": da_jsonData
    }

    Autodesk.Viewing.Initializer(options, () => {

        // Creatre Viewer instance
        viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), {extensions: ['Autodesk.DocumentBrowser']}); // 'TransExplorerExtension' , { extensions: ['ModelSummaryExtensionClass', 'Autodesk.DocumentBrowser', 'OverLayGeometry'] }
        let startedCode = viewer.start(null, null, null, null, {
            webglInitParams: {
                useWebGL2: false
            }
        });

        if (startedCode > 0) {
            console.error('Failed to create a Viewer: WebGL not supported.');
            return;
        }

        console.log('Initialization complete, loading a model next...');

        // The documentId is a string value of the URN of the model that was translated.
        // The value assigned to documentId must be prefixed with the string urn:
        console.log("urn", urn)
        let documentId = 'urn:' + urn;
        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess2, onDocumentLoadFailure);
        console.log("initialization complete, creating the viewer...");
    });
}

export const onDocumentLoadSuccess2 = (viewerDocument) => {
    // viewerDocument is an instance of Autodesk.Viewing.Document
    console.log("Executing onDocumentLoadSuccess2 function.")
    let defaultModel = viewerDocument.getRoot().getDefaultGeometry();
    viewer.loadDocumentNode(viewerDocument, defaultModel).then(async function (model) {
        await afterViewerEvents(
            viewer,
            [
                Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
                Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT
            ]
        );

        // Run other functionalities after model is done loading.
        console.log("Viewer GEOMETRY_LOADED_EVENT and OBJECT_TREE_CREATED_EVENT is completely loaded.")

        // Get all dbIds and hIds from the forge viewer model for dynimc connections
        // for button labels, segments from esri map and data table.
        viewerDbIds = forgeViewerModelDbIds()

    });
    console.log("Check if Viewer is completely loaded.")
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
// Get all dbIds from the viewer model 
export const forgeViewerModelDbIds = () => {
    viewer.model.getExternalIdMapping(data => {
        console.log("dbIdsDict: ", data)
        viewerDbIds = data
    })
}

export default {
    launchViewer,
    onDocumentLoadSuccess2,
    onDocumentLoadFailure,
    onDocumentLoadFailure2,
    getForgeToken,
    afterViewerEvents,
    forgeViewerModelDbIds
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