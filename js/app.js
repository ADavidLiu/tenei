//@prepros-prepend "modules/header.js";
//@prepros-prepend "modules/dropdown.js";
//@prepros-prepend "modules/add-skills.js";
//@prepros-prepend "modules/add-reference.js";
//@prepros-prepend "modules/add-police-check.js";
//@prepros-prepend "modules/tabs.js";
//@prepros-prepend "modules/selectArea.js";
//@prepros-prepend "modules/login.js";

$(document).ready(function () {
    
    const header = new Header();

    if ($(".dropdown").length > 0) {
        const dropdown = new Dropdown();
    }

    if ($(".add--skills").length > 0) {
        const addSkills = new AddSkills();
    }
    
    if ($(".add--references").length > 0) {
        const addReferences = new AddReferences();
    }
    
    if ($(".add--police-check").length > 0) {
        const addPoliceCheck = new AddPoliceCheck();
    }

    if ($(".tabs").length > 0) {
        const tabs = new Tabs();
    }

    if ($(".select-area").length > 0) {
        const selectArea = new SelectArea();
    }

    if ($(".login").length > 0) {
        const login = new Login();
    }
    
});