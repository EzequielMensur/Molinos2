export default function GetUserFullName(clientAPI) {

    let appSettings = clientAPI.nativescript.appSettingsModule;
	let appId = clientAPI.evaluateTargetPath('#Application/#ClientData/#Property:MobileServiceAppId');
	if (appSettings.hasKey(`${appId}-UserFullName`)) {
		
		return appSettings.getString(`${appId}-UserFullName`);
	} else {
		return 'No aparecio el nombre';
	}
}