export default function ClearFilters(context) {
    let appSettings = context.nativescript.appSettingsModule;
    if (appSettings.hasKey('ProductFilter')) {
        appSettings.remove('ProductFilter');
    }
    context.getPageProxy().executeAction('/Molinos2/Actions/FiltersClearedMessage.action');
}
