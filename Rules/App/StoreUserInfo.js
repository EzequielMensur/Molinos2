export default function StoreUserInfo(clientAPI) {
    let platform = clientAPI.nativescript.platformModule;
    let appSettings = clientAPI.nativescript.appSettingsModule;
            let appId = clientAPI.evaluateTargetPath('#Application/#ClientData/#Property:MobileServiceAppId');
            let userInfoUrl = `/mobileservices/application/${appId}/`;
            let params = { 'method': 'GET' };
            return clientAPI.sendRequest(userInfoUrl, params).then(r => {
                if (r && r.statusCode === 200 && r.content) {
                    const userInfo = JSON.parse(r.content.toString());
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
