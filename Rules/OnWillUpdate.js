/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/Molinos2/Actions/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/Molinos2/Actions/Service/CloseOffline.action').then(
                (success) => Promise.resolve(success),
                Console.log(success, "Gatoooooooooooooooooooooooooooooooooooooooooooooooo"),
                (failure) => Promise.reject('Offline Odata Close Failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}