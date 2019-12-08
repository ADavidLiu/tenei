class PoliceCheck {
	constructor(data) {
        this._template = `
            <div class="row add__inputs-line">
                <div class="col-10 col-10 col-md-9 col-lg-10">
                    <div class="row">
                        <div class="col-6 col-lg-4">
                            <input type="text" disabled data-inputs-target-name value="${data.name}">
                        </div>
                        <div class="col-6 col-lg-4">
                            <input type="text" disabled data-inputs-target-description value="${data.description}">
                        </div>
                        <div class="d-none d-lg-block col-4">&nbsp;</div>
                    </div>
                </div>
                <div class="col-2 col-md-3 col-lg-2">
                    <div class="add__inputs-actions">
                        <div class="add__inputs-actions-item add__inputs-actions-item--active add__inputs-actions-item--download">
                            <img src="images/i-download.svg" alt="Download" class="add__inputs-actions-item-icon">
                        </div>
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
