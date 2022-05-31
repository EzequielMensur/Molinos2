/**
* Describe this function... CAmbiar SalesOrdersTable por SectionObjectTable0
* @param {IClientAPI} context
*/
export default function SetSelectionMode(context) {
	var sectionedTable = context.getControl("SectionedTable");
	var section = sectionedTable.getSection("SectionObjectTable0");
	section.setSelectionMode("Multiple");
}