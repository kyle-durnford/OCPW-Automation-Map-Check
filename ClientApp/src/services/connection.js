
import axios from "axios"
import * as signalR from "@microsoft/signalr";

export const startConnection = async => {

    let connection = new signalR.HubConnectionBuilder().withUrl("/api/signalr/designautomation").withAutomaticReconnect().build();

    connection.start().then(() => {
        connection.invoke('getConnectionId').then((id) => {
            console.log("getConnectionId result: " , id)
            return id
        })

    });


}

export const startWorkItem = async item => {

  console.log('Item', item)

  return new Promise(function(resolve, reject) {
    axios({
        method : 'POST',
        url : 'api/forge/designautomation/workitems',
        data: item,
        processData: false,
        contentType: false,        
    }).then(
      response => {
        console.log("startWorkItem created successfully", response)
        resolve(response)
      },
      error => {
        console.log("startWorkItem error:", error)
        reject(error)
      }
    )
  })
}

export const clearAccount = async => {
  return new Promise(function(resolve, reject) {
    axios.delete("api/forge/designautomation/account").then(
      response => {
        console.log("Account cleared: ", response)
        resolve(response)
      },
      error => {
        console.log("Account cleared error:", error)
        reject(error)
      }
    )
  })
}

export const translateObject = async (objectKeys, connectionId) => {

  const data = {
    data: JSON.stringify(
      { 'bucketKey': objectKeys[0], 
        'objectName': objectKeys[1], 
        'connectionId': connectionId 
      })
  }

  return new Promise(function(resolve, reject) {
    axios.post("/api/forge/modelderivative/jobs", data).then(
      response => {
        console.log("Response: ", response)
        resolve(response.data)
      },
      error => {
        console.log("translateObject error:", error)
        reject(error)
      }
    )
  })
}

export const getTableInfo = async url => {
  return new Promise(function(resolve, reject) {
    axios.get(url).then(
      response => {
        console.log("Table data retrived", response)
        resolve(response.data)
      },
      error => {
        console.log("getTableInfo ERROR: ", error)
        reject(error)
      }
    )
  })
}

export default {
  startConnection,
  startWorkItem,
  clearAccount,
  getTableInfo,
}