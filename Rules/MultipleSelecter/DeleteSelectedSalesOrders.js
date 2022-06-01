import CalculateSelection from './CalculateSelection';
/**
* Describe this function...
* @param {IClientAPI} context
*/
export default async function DeleteSelectedProducts(context) {
    var sectionedTable = context.getControl("SectionedTable");
	var section = sectionedTable.getSection("SectionObjectTable0");
	var selectedItems = section.getSelectedItems();	
	if (!selectedItems  || selectedItems.length === 0) {
		context.executeAction({
			"Name": "/Molinos2/Actions/MultipleSelecter/BasicToast.action",
			"Properties": {
				"Message": "Seleccione al menos un item"
			}
		});
	}
	let result = null;
	if (selectedItems.length == 1) {
		result = await context.executeAction({
			"Name": "/Molinos2/Actions/MultipleSelecter/ConfirmAction.action",
			"Properties":{
				"Message": "$(L, ConfirmDeleteSingleMessage)"
			}
		});
	} else {
		result = await context.executeAction({
			"Name": "/Molinos2/Actions/MultipleSelecter/ConfirmAction.action",
			"Properties":{
				"Message": "$(L, ConfirmDeleteMultipleMessage)"
			}
		});
	}
	if (result && result.data) {
		for (var i = 0; selectedItems && i < selectedItems.length; i++ ) {
			var selectedItem = selectedItems[i];
			await context.executeAction({
				"Name": "/Molinos2/Actions/Products/Products_DeleteEntity.action",
				"Properties":{
					"Target": {
						"ReadLink" : selectedItem.binding["@odata.readLink"]
					}
				}
			});
		}
		section.setSelectionMode("None");
	}
	CalculateSelection(context);
}