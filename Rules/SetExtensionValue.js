export default function SetExtensionValue(context) {
    console.log("In SetExtensionValue");
    let srcValue = context.getValue();
    let targetCtrl = context.evaluateTargetPath("#Page:SalesOrderHeaders_Create/#Control:MyExtensionControlName");
    console.log(targetCtrl)
    targetCtrl.setValue(srcValue);
}