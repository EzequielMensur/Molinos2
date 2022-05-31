/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function CancelSelectionMode(context) {
    var sectionedTable = context.getControl("SectionedTable");
	var section = sectionedTable.getSection("SectionObjectTable0");
	section.setSelectionMode("None");
}