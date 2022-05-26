/**
 * Invoca funcion StoreUserInfo y luego inicializa el store de la aplicacion.
 */
import StoreUserInfo from './StoreUserInfo';

export default function InitializeApplication(clientAPI) {

	//let clientData = clientAPI.evaluateTargetPathForAPI('#Page:Welcome').getClientData();
	//clientData.pendingAudits = [];

	return StoreUserInfo(clientAPI).then(result => {
		return clientAPI.executeAction('/Molinos2/Actions/Service/InitializeOffline.action');
	});
}