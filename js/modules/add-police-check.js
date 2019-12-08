//@prepros-prepend "./policeCheck.js";

class AddPoliceCheck {
    constructor() {
        /* Inicital message */
        this._$initialMessage = $(".add__message");

        /* Total message */
        this._$totalMessage = $(".add__inputs-total");
        this._$totalMessageCurrent = $(".add__inputs-total .current");
        this._$totalMessageTotal = $(".add__inputs-total .total");

        /* Labels */
        this._$labels = $("[data-add-labels]");

        /* Initial controls */
        this._$initialControls = $("[data-add-initial-controls]");
        this._$fileInput = $("[data-add-initial-controls] input[type='file']");
        this._$fileLabel = $("[data-add-initial-controls] h4 span");
        this._$fileLabelIcon = $("[data-add-initial-controls] h4 img");
        this._$btnAddInitial = $("[data-add-initial-controls] .btn");

        /* 'Update' controls */
        this._$itemToFinishEditing;

        /* 'Upload' controls */
        this._$btnUpload = $("[data-add-upload-btn]");
        this._$btnUploadCancel = $("[data-add-upload-cancel]");

        /* 'Question' elements */
        this._$infoWrapper = $(".add__file-controls");

        /* Main list */
        this._$list = $(".add__inputs-main-list");
        this._$btnDeleteCheck = $(".add__inputs-main-list .add__inputs-actions-item--close");
        this._$btnEditReference = $(".add__inputs-main-list .add__inputs-actions-item--edit");

        /* Inputs */
        this._$errorLabel = $("[data-error-message]");
        this._acceptedTypes = ["image/png", "image/jpg", "image/jpeg", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        this._maxSize = 100000000;

        /* Information */
        this._$info = $("[data-info]");
        this._$descriptionInput = $("[data-info-description]");
        this._$infoCheckbox = $("[data-info] input");

        /* Popup */
        this._$popup = $(".popup");
        this._$btnPopupDelete = this._$popup.find("[data-delete]");
        this._$btnPopupCancel = this._$popup.find("[data-cancel]");
        this._$checkToRemove;

        this.hideElements();
        this.bindEvents();
    }

    hideElements = () => {
        this._$labels.hide();
        this._$info.hide();
        this._$totalMessage.hide();
        this._$errorLabel.hide();
    }

    bindEvents = () => {
        this._$fileInput.on("change", this.upload);
        this._$btnPopupCancel.click(this.closePopup);
        this._$btnPopupDelete.click(this.removeCheckFromList);
        this._$btnUpload.click(this.addCheck);
    }

    closePopup = () => {
        this._$popup.removeClass("popup--active");
    }

    getValues = () => {
        let values = {
            name: this._$fileLabel.text(),
            description: this._$descriptionInput.val()
        };
        return values;
    }

    clearValues = () => {
        this._$descriptionInput.val("");
        this._$fileLabel.text("No file selected");
        this._$btnAddInitial.text("CHOOSE FILE");
    }

    deleteCheck = e => {
        this._$popup.addClass("popup--active");
        const $this = $(e.currentTarget);
        const $listItem = $this.parents(".row.add__inputs-line");
        this._$checkToRemove = $listItem;
    }

    removeCheckFromList = () => {
        this._$checkToRemove.slideUp("fast", () => {
            this._$checkToRemove.remove();
            this.updateTotalMessage();
            this.closeInputs();
            this.closePopup();
        });
    }

    addCheckToList = (values) => {
        const check = new PoliceCheck(values);
        const checkTemplate = check.getTemplate();
        const $checkItem = $(checkTemplate);
        const $infoClone = this._$info.clone();
        $infoClone.addClass("col-12").appendTo($checkItem).hide().children(".row").css({
            "padding": "1rem 0",
            "margin": "0"
        });
        $infoClone.find("[data-add-upload-btn]").text("SAVE UPDATE");
        this._$list.append($checkItem);
        this._$labels.fadeIn("fast");
        this._$initialMessage.fadeOut("fast");
        this.updateList($checkItem);
        this.updateTotalMessage();
        this.clearValues();
    }

    resetInputs = () => {
        this._$btnAddInitial.text("CHOOSE FILE");
        this._$fileLabel.text("No file selected");
        this._$fileLabelIcon.fadeOut("fast");
        this._$fileInput.val("");
        this._$info.fadeOut("fast");
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
        const _$btnDeleteCheck = $item.find(".add__inputs-actions-item--close");
        const _$btnEditReference = $item.find(".add__inputs-actions-item--edit");
        _$btnDeleteCheck.click(this.deleteCheck);
        _$btnEditReference.click(this.editReference);

        const _$btnInnerUpload = $item.find("[data-add-upload-btn]");
        const _$btnInnerCancel = $item.find("[data-add-upload-cancel]");
        _$btnInnerUpload.click(this.saveEdit);
        _$btnInnerCancel.click(this.cancelEdit);
    }

    saveEdit = () => {
        const _newDescription = this._$itemToFinishEditing.find("[data-info-description]").val();
        this._$itemToFinishEditing.find("[data-inputs-target-description]").val(_newDescription);
        this._$itemToFinishEditing.find(".add__inputs-group--alt-2").fadeOut("fast");
    }

    cancelEdit = () => {
        this._$itemToFinishEditing.find("[data-info]").fadeOut("fast");
    }

    editReference = e => {
        const $this = $(e.currentTarget);
        const $listItem = $this.parents(".row.add__inputs-line");
        $listItem.find(".add__inputs-group--alt-2").fadeIn("fast");
        this._$itemToFinishEditing = $listItem;
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

    addCheck = () => {
        const values = this.getValues();
        this.addCheckToList(values);
        this.closeInputs();
    }

    closeInputs = () => {
        this.resetInputs();
        const hasChildren = this.checkListLength();
        this._$info.fadeOut("fast");
        if (!hasChildren) {
            this._$labels.fadeOut("fast");
            this._$info.fadeOut("fast", () => {
                this._$initialMessage.fadeIn("fast");
                this._$initialControls.fadeIn("fast");
            });
        } else {
            this._$info.fadeOut("fast");
        }
    }

    upload = e => {
        const _file = e.target.files[0];
        const _filename = _file.name;
        const _filetype = _file.type;
        const _filesize = _file.size;
        let _isAcceptedFileType = false;
        this._acceptedTypes.forEach(type => {
            if (type === _filetype) {
                _isAcceptedFileType = true;
                return;
            }
        });
        let _isWithinLimit = false;
        this._$list.children().length < 12 ? _isWithinLimit = true : _isWithinLimit = false;

        if (_filesize <= this._maxSize && _isAcceptedFileType && _isWithinLimit) {
            this._$fileLabel.text(_filename);
            this._$fileLabelIcon.fadeIn("fast").css("display", "inline-block");
            this._$btnAddInitial.text("CHANGE FILE");
            this._$info.fadeIn("fast");
            this._$errorLabel.fadeOut("fast");
        } else {
            this._$errorLabel.fadeIn("fast");
        }
    }
}