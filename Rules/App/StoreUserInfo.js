/**
 * Almacena informacion relevante del usuario en las App Settings del dispositivo.
 */
export default function StoreUserInfo(clientAPI) {
    let platform = clientAPI.nativescript.platformModule;
    
    if (platform.isIOS || platform.isAndroid) {
        let appSettings = clientAPI.nativescript.appSettingsModule;
        let appId = clientAPI.evaluateTargetPath('#Application/#ClientData/#Property:MobileServiceAppId');
        let userInfoUrl = `/mobileservices/application/${appId}/roleservice/application/${appId}/v2/Me`;
        let params = { 'method': 'GET' };
        const userInfo = JSON.parse(r.content.toString());
        if (appSettings.hasKey(`${appId}-UserName`)) {
            // Si ya existe la informacion del usuario, no la recupera nuevamente.
            return Promise.resolve();   
        } else if (clientAPI.isDemoMode()) {
            appSettings.setString(`${appId}-UserId`,'DemoUser');
            appSettings.setString(`${appId}-UserName`,'DemoUser');
            appSettings.setString(`${appId}-UserGivenName`,'Demo');
            appSettings.setString(`${appId}-UserFamilyName`,'User');
            appSettings.setString(`${appId}-UserEmail`,'mobileservicesclient@sap.com');
            appSettings.setString(`${appId}-UserFullName`,`Demo User`);
            return Promise.resolve();                 
        } else {
            let userInfoUrl = `/mobileservices/application/${appId}/roleservice/application/${appId}/v2/Me`;
            let params = { 'method': 'GET' };
            clientAPI.sendRequest(userInfoUrl, params).then(r => {
                if (r && r.statusCode === 200 && r.content) {
                    const userInfo = JSON.parse(r.content.toString());
                    alert(userInfo)
                    appSettings.setString(`${appId}-UserId`,userInfo.id);
                    appSettings.setString(`${appId}-UserName`,userInfo.userName);
                    appSettings.setString(`${appId}-UserGivenName`,userInfo.name.givenName);
                    appSettings.setString(`${appId}-UserFamilyName`,userInfo.name.familyName);
                    appSettings.setString(`${appId}-UserEmail`,userInfo.emails[0].value);
                    appSettings.setString(`${appId}-UserFullName`,`${userInfo.name.givenName} ${userInfo.name.familyName}`);
                    return Promise.resolve();
                } })
            return clientAPI.sendRequest(userInfoUrl, params).then(r => {
                if (r && r.statusCode === 200 && r.content) {
                    const userInfo = JSON.parse(r.content.toString());
                    alert(userInfo)
                    appSettings.setString(`${appId}-UserId`,userInfo.id);
                    appSettings.setString(`${appId}-UserName`,userInfo.userName);
                    appSettings.setString(`${appId}-UserGivenName`,userInfo.name.givenName);
                    appSettings.setString(`${appId}-UserFamilyName`,userInfo.name.familyName);
                    appSettings.setString(`${appId}-UserEmail`,userInfo.emails[0].value);
                    appSettings.setString(`${appId}-UserFullName`,`${userInfo.name.givenName} ${userInfo.name.familyName}`);
                    return Promise.resolve();
                }
            },
            (error) => {
                console.log(error.toString());
            });                
        }
    } else { 
        return Promise.resolve();
    }
}
