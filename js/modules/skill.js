class Skill {
	constructor(data) {
        this._template = `
            <div class="row add__inputs-line ${data.extraClasses ? data.extraClasses : ""}">
                <div class="col-10">
                    <div class="row">
                        <div class="col-4">
                            <input type="text" disabled data-inputs-target-skill value="${data.skill}">
                        </div>
                        <div class="col-4">
                            <input type="text" disabled data-inputs-target-detail value="${data.detail}">
                        </div>
                        <div class="col-4">
                            <input type="text" disabled data-inputs-target-years value="${data.years}">
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <div class="add__inputs-actions">
                        <div class="add__inputs-actions-item add__inputs-actions-item--active add__inputs-actions-item--edit">
                            <img src="images/i-edit.svg" alt="Edit" class="add__inputs-actions-item-icon">
                        </div>
                        <div class="add__inputs-actions-item add__inputs-actions-item--active add__inputs-actions-item--close">
                            <img src="images/i-close.svg" alt="Delete" class="add__inputs-actions-item-icon">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    getTemplate = () => {
        return this._template;
    }
}
