# OCPW-Automation-Map-Check
## Description
Webapp that uses Forge Design Automation Autodesk technology to automatically identify dimension erros on civil 3D parcels. The dimension errors are reported back to the Land Surveyor or Civil Engineer who created the CAD file.

## Application Structure
Visual Studio ASP.NET Core and React app template was used to create this project.

## Data flow diagram
![](https://github.com/e-hermoso/OCPW-Automation-Map-Check/blob/main/media/aboutapp/img/Data%20Flow%20Forge%20Checker.jpg)

# Setup

## Prerequisites

1. **Forge Account**: Learn how to create a Forge Account, activate subscription and create an app at [this tutorial](http://learnforge.autodesk.io/#/account/). 
2. **Visual Studio**: [Either Community (Windows)](https://visualstudio.microsoft.com/downloads/) or **Visual Studio Code**:[Code (Windows, MacOS).](https://code.visualstudio.com/download)
3. **.NET Core** basic knowledge with C#
4. **ngrok**: Routing tool, [download here](https://ngrok.com/). 
## Running locally

Clone this project or download it. It's recommended to install [Git for Windows](https://git-scm.com/download/win) if you are using windows. To clone it via command line, use the following (**Terminal** on MacOSX/Linux, **Git Shell** on Windows):

    git clone https://github.com/e-hermoso/OCPW-Automation-Map-Check.git
    
**ngrok**

When a CAD file is uploaded and done processing, **Design Automation API** and **Model Derivative API** can notify our application when it is complete. As the app is running locally (i.e. `localhost`), it's not reacheable from the internet. `ngrok` tool creates a temporary address that channels notifications to our `localhost` address.

After [download ngrok](https://ngrok.com/), run `ngrok http 3000 -host-header="localhost:3000"`, then copy the `http` address into the `FORGE_WEBHOOK_URL` environment variable (see next). For this sample, do not use the `https` address.

![](https://github.com/e-hermoso/OCPW-Automation-Map-Check/blob/main/media/aboutapp/img/ngrok-setup.gif)

**Visual Studio** (Windows):

Right-click on the project, then go to **Debug**. Adjust the settings as shown below.
![](https://github.com/e-hermoso/OCPW-Automation-Map-Check/blob/main/media/aboutapp/img/env-setup.gif)
Under Debug tab see the Environment Variables section and add:
- `ASPNETCORE_ENVIRONMENT` : use `DEVELOPMENT`
- `ASPNETCORE_URLS` : use `http://localhost:3000`
- `FORGE_CLIENT_ID` : use your id here
- `FORGE_CLIENT_SECRET` : use your secret here
- `FORGE_WEBHOOK_URL` : use the ngrok forwarding URL from previous step

**Visual Studio Code** (Windows, MacOS):

Open the `webapp` folder (only), at the bottom-right, select **Yes** and **Restore**. This restores the packages (e.g. Autodesk.Forge) and creates the launch.json file. See *Tips & Tricks* for .NET Core on MacOS.

![](https://github.com/e-hermoso/OCPW-Automation-Map-Check/blob/main/media/aboutapp/img/visual_code_restore.png)

At the `.vscode\launch.json`, find the env vars and add your Forge Client ID, Secret and callback URL. Also define the `ASPNETCORE_URLS` variable. The end result should be as shown below:

```json
"env": {
    "ASPNETCORE_ENVIRONMENT": "Development",
    "ASPNETCORE_URLS" : "http://localhost:3000",
    "FORGE_CLIENT_ID": "your id here",
    "FORGE_CLIENT_SECRET": "your secret here",
    "FORGE_WEBHOOK_URL": "http://1234.ngrok.io",
},
```

**How to use this sample**

Before you start the app, run `npm run sassy` to compile the sass files into main.css.

Open `http://localhost:3000` to start the app, if first time, click on `Define Activity`, upload a dwg file that contais civil 3d parcel objects, select the `Activity` and, finally, `Start workitem`. 

# Further Reading

Documentation:

- [Design Automation v3](https://forge.autodesk.com/en/docs/design-automation/v3/developers_guide/overview/)
- [Data Management](https://forge.autodesk.com/en/docs/data/v2/reference/http/) used to store input and output files.

Other APIs:

- [.NET Core SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-3.1)

### Tips & Tricks

This sample uses .NET Core and works fine on both Windows and MacOS, see [this tutorial for MacOS](https://github.com/augustogoncalves/dotnetcoreheroku). You still need Windows debug the AppBundle plugins.

### Troubleshooting

1. **error setting certificate verify locations** error: may happen on Windows, use the following: `git config --global http.sslverify "false"`

## License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.
