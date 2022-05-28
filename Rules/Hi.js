/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function Hi(clientAPI) {
    let sideDrawerAPI = clientAPI.getGlobalSideDrawerControlProxy();

    let appId = clientAPI.evaluateTargetPath('#Application/#ClientData/#Property:MobileServiceAppId');
    let userInfoUrl = `/mobileservices/application/${appId}/roleservice/application/${appId}/v2/Me`;
    let params = { 'method': 'GET' };

    return await clientAPI.sendRequest(userInfoUrl, params).then(r => {
        if (r && r.statusCode === 200 && r.content) {
            const userInfo = JSON.parse(r.content.toString());
            let userRoles = userInfo.roles;
            if (userRoles.find(role => role === "openid") !== undefined) {
                sideDrawerAPI.setSectionVisibilityAtIndex(0,false) 
            } 
        }
    })

}
