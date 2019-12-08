//@prepros-prepend "./reference.js";

class AddReferences {
    constructor() {
        /* Inicital message */
        this._$initialMessage = $(".add__message");

        /* Total message */
        this._$totalMessage = $(".add__inputs-total");
        this._$totalMessageCurrent = $(".add__inputs-total .current");
        this._$totalMessageTotal = $(".add__inputs-total .total");

        /* Inputs */
        this._$inputs = $("[data-add-inputs]");
        this._$closeInputs = this._$inputs.find(".add__inputs-actions-item--close");

        /* Labels */
        this._$labels = $("[data-add-labels]");

        /* Initial controls */
        this._$initialControls = $("[data-add-initial-controls]");
        this._$btnAddInitial = $("[data-add-initial-controls] .btn");

        /* 'Add New' controls */
        this._$addNewControls = $("[data-add-inputs-controls]");
        this._$btnAddNew = $("[data-add-inputs-controls] [data-add-new]");
        this._$btnCancelNew = $("[data-add-inputs-controls] [data-add-cancel]");

        /* 'Add New No Edit' controls */
        this._$addNewNoEditControls = $("[data-add-inputs-new]");
        this._$btnAddNewNoEdit = $("[data-add-inputs-new] [data-add-new]");

        /* 'Update' controls */
        this._$updateControls = $("[data-add-inputs-update]");
        this._$btnUpdate = $("[data-add-inputs-update] [data-update-save]");
        this._$btnCancelUpdate = $("[data-add-inputs-update] [data-update-cancel]");
        this._$itemToFinishEditing;

        /* 'Question' elements */
        this._$infoWrapper = $("[data-info]");

        /* Main list */
        this._$list = $(".add__inputs-main-list");
        this._$btnDeleteReference = $(".add__inputs-main-list .add__inputs-actions-item--close");
        this._$btnEditReference = $(".add__inputs-main-list .add__inputs-actions-item--edit");

        /* Inputs */
        this._$nameInput = $("[data-add-trigger-value='name']");
        this._$emailInput = $("[data-add-trigger-value='email']");
        this._$phoneInput = $("[data-add-trigger-value='phone']");

        /* Information */
        this._$info = $("[data-info]");
        this._$infoInput = $("[data-info-description]");
        this._$infoCheckbox = $("[data-info] input");

        /* Popup */
        this._$popup = $(".popup");
        this._$btnPopupDelete = this._$popup.find("[data-delete]");
        this._$btnPopupCancel = this._$popup.find("[data-cancel]");
        this._$referenceToRemove;

        this.hideElements();
        this.bindEvents();
    }

    hideElements = () => {
        this._$inputs.hide();
        this._$labels.hide();
        this._$addNewControls.hide();
        this._$updateControls.hide();
        this._$infoWrapper.hide();
        this._$addNewNoEditControls.hide();
        this._$totalMessage.hide();
    }

    bindEvents = () => {
        this._$btnAddInitial.click(this.openInputs);
        this._$closeInputs.click(this.closeInputs);
        this._$btnCancelNew.click(this.closeInputs);
        this._$btnAddNew.click(this.addReference);
        this._$btnAddNewNoEdit.click(this.openInputs);
        this._$btnPopupCancel.click(this.closePopup);
        this._$btnPopupDelete.click(this.removeReferenceFromList);
        this._$btnCancelUpdate.click(this.closeEditing);
        this._$btnUpdate.click(this.closeEditing);
    }

    closePopup = () => {
        this._$popup.removeClass("popup--active");
    }

    getValues = () => {
        let values = {
            name: this._$nameInput.val(),
            email: this._$emailInput.val(),
            phone: this._$phoneInput.val()
        };
        return values;
    }

    clearValues = () => {
        this._$nameInput.val("");
        this._$emailInput.val("");
        this._$phoneInput.val("");
        this._$infoInput.val("");
        this._$infoCheckbox.removeAttr("checked");
        this._$infoCheckbox.prop("checked", false);
    }

    deleteReference = e => {
        this._$popup.addClass("popup--active");
        const $this = $(e.currentTarget);
        const $listItem = $this.parents(".row.add__inputs-line");
        this._$referenceToRemove = $listItem;
    }

    removeReferenceFromList = () => {
        this._$referenceToRemove.slideUp("fast", () => {
            this._$referenceToRemove.remove();
            this.updateTotalMessage();
            const hasChildren = this.checkListLength();
            this.closePopup();
            if (!hasChildren) {
                this._$labels.fadeOut("fast");
                this._$addNewControls.fadeOut("fast");
                this._$addNewNoEditControls.fadeOut("fast");
                this._$updateControls.fadeOut("fast");
                this._$inputs.fadeOut("fast", () => {
                    this._$initialMessage.fadeIn("fast");
                    this._$initialControls.fadeIn("fast");
                });
            }
        });
    }

    addReferenceToList = (values) => {
        const reference = new Reference(values);
        const referenceTemplate = reference.getTemplate();
        const $referenceItem = $(referenceTemplate);
        const $infoClone = this._$info.clone(true, true);
        $infoClone.addClass("col-12").appendTo($referenceItem).hide();
        this._$list.append($referenceItem);
        this.updateList($referenceItem);
        this.updateTotalMessage();
        this.closeInputs();
        this.clearValues();
    }

    checkListLength = () => {
        const currentLength = this._$list.children().length;
        if (currentLength <= 0) {
            return false;
        } else {
            return true;
        }
    }

    updateList = ($item) => {
        const _$btnDeleteReference = $item.find(".add__inputs-actions-item--close");
        const _$btnEditReference = $item.find(".add__inputs-actions-item--edit");
        _$btnDeleteReference.click(this.deleteReference);
        _$btnEditReference.click(this.editReference);
    }

    updateTotalMessage = () => {
        const currentLength = this._$list.children().length;
        if (currentLength > 0) {
            this._$totalMessage.fadeIn("fast");
            this._$totalMessageCurrent.text(currentLength);
            this._$totalMessageTotal.text(currentLength);
        } else {
            this._$totalMessage.fadeOut("fast");
        }
    }

    closeEditing = () => {
        this._$itemToFinishEditing.find("input").prop("disabled", true);
        this._$infoWrapper.fadeOut("fast");
        this._$itemToFinishEditing.find(".add__inputs-group--alt").fadeOut("fast");
        this._$updateControls.fadeOut("fast", () => {
            this._$addNewNoEditControls.fadeIn("fast");
        });
    }

    editReference = e => {
        const $this = $(e.currentTarget);
        const $listItem = $this.parents(".row.add__inputs-line");
        $listItem.find(".add__inputs-group--alt").fadeIn("fast");
        this._$itemToFinishEditing = $listItem;
        $listItem.find("input").prop("disabled", false);
        this._$addNewNoEditControls.fadeOut("fast", () => {
            this._$updateControls.fadeIn("fast");
        });
    }

    addReference = () => {
        const values = this.getValues();
        this.addReferenceToList(values);
    }

    closeInputs = () => {
        const hasChildren = this.checkListLength();
        this._$info.fadeOut("fast");
        this._$updateControls.fadeOut("fast");
        if (!hasChildren) {
            this._$labels.fadeOut("fast");
            this._$addNewControls.fadeOut("fast");
            this._$inputs.fadeOut("fast", () => {
                this._$initialMessage.fadeIn("fast");
                this._$initialControls.fadeIn("fast");
            });
        } else {
            this._$inputs.fadeOut("fast");
            this._$addNewControls.fadeOut("fast", () => {
                this._$addNewNoEditControls.fadeIn("fast");
            });
        }
    }

    openInputs = () => {
        this._$initialMessage.fadeOut("fast");
        this._$addNewNoEditControls.fadeOut("fast");
        this._$initialControls.fadeOut("fast", () => {
            this._$labels.fadeIn("fast");
            this._$inputs.fadeIn("fast");
            this._$addNewControls.fadeIn("fast");
            this._$infoWrapper.fadeIn("fast");
        });
    }
}