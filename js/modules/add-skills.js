//@prepros-prepend "./skill.js";

class AddSkills {
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
        this._$labelSkill = this._$labels.find(".label-skill");

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
        this._$clonedInputs;

        /* 'Question' elements */
        this._$questionWrapper = $("[data-add-question]");

        /* Main list */
        this._$list = $(".add__inputs-main-list");
        this._$btnDeleteSkill = $(".add__inputs-main-list .add__inputs-actions-item--close");
        this._$btnEditSkill = $(".add__inputs-main-list .add__inputs-actions-item--edit");

        /* Inputs */
        this._$skillInput = $("[data-add-trigger-value='skill']");
        this._$DetailInput = $("[data-add-trigger-value='detail']");
        this._$YearsInput = $("[data-add-trigger-value='years']");

        /* Question */
        this._$question = $("[data-add-question]");
        this._$questionMessage = $("[data-question-message]");
        this._$questionInput = $("[data-question-answer]");
        this._$shouldWaitForRequirements = true;

        /* Popup */
        this._$popup = $(".popup");
        this._$btnPopupDelete = this._$popup.find("[data-delete]");
        this._$btnPopupCancel = this._$popup.find("[data-cancel]");
        this._$skillToRemove;

        this.hideElements();
        this.bindEvents();
    }

    hideElements = () => {
        this._$inputs.hide();
        this._$labels.hide();
        this._$addNewControls.hide();
        this._$updateControls.hide();
        this._$questionWrapper.hide();
        this._$addNewNoEditControls.hide();
        this._$totalMessage.hide();
    }

    bindEvents = () => {
        this._$btnAddInitial.click(this.openInputs);
        this._$closeInputs.click(this.closeInputs);
        this._$btnCancelNew.click(this.closeInputs);
        this._$btnAddNew.click(this.addSkill);
        this._$btnAddNewNoEdit.click(this.openInputs);
        this._$btnPopupCancel.click(this.closePopup);
        this._$btnPopupDelete.click(this.removeSkillFromList);
        this._$btnCancelUpdate.click(this.closeEditing);
        this._$btnUpdate.click(this.closeEditing);
    }

    closePopup = () => {
        this._$popup.removeClass("popup--active");
    }

    getValues = () => {
        let values = {
            skill: this._$skillInput.text(),
            detail: this._$DetailInput.val(),
            years: this._$YearsInput.text()
        };
        return values;
    }

    clearValues = () => {
        this._$skillInput.text("Select a skill");
        this._$DetailInput.val("");
        this._$YearsInput.text("");
        this._$questionInput.val("");
    }

    deleteSkill = e => {
        this._$popup.addClass("popup--active");
        const $this = $(e.currentTarget);
        const $listItem = $this.parents(".row.add__inputs-line");
        this._$skillToRemove = $listItem;
    }

    removeSkillFromList = () => {
        this._$skillToRemove.slideUp("fast", () => {
            this._$skillToRemove.remove();
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

    addSkillToList = (values) => {
        if (!this._$shouldWaitForRequirements) {
            let classes = "";
            if (this._$skillInput.attr("data-requires-question") === "true") {
                classes = "requires-question";
            }
            const skill = new Skill({
                ...values,
                extraClasses: classes
            });
            const skillTemplate = skill.getTemplate();
            const $skillItem = $(skillTemplate);
            this._$list.append($skillItem);
            this.updateList($skillItem);
            this.updateTotalMessage();
            this.closeInputs();
            this.clearValues();
        }
    }

    checkListLength = () => {
        const currentLength = this._$list.children().length;
        if (currentLength <= 0) {
            this._$labelSkill.text("Select a skill to add");
            return false;
        } else {
            this._$labelSkill.text("Skills");
            return true;
        }
    }

    updateList = ($item) => {
        const _$btnDeleteSkill = $item.find(".add__inputs-actions-item--close");
        const _$btnEditSkill = $item.find(".add__inputs-actions-item--edit");
        _$btnDeleteSkill.click(this.deleteSkill);
        _$btnEditSkill.click(this.editSkill);
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
        const newVals = [this._$clonedInputs.find("[data-add-trigger-value='skill']").text(), 
        this._$clonedInputs.find("[data-add-trigger-value='detail']").val(), 
        this._$clonedInputs.find("[data-add-trigger-value='years']").text()];
        this._$itemToFinishEditing.find("input").prop("disabled", true);
        this._$itemToFinishEditing.find("input").each(function(index) {
            const $this = $(this);
            $this.val(newVals[index]);
        });
        this._$clonedInputs.remove();
        this._$itemToFinishEditing.show();
        this._$questionWrapper.fadeOut("fast");
        this._$updateControls.fadeOut("fast", () => {
            this._$addNewNoEditControls.fadeIn("fast");
        });
    }

    editSkill = e => {
        const $this = $(e.currentTarget);
        const $listItem = $this.parents(".row.add__inputs-line");
        this._$itemToFinishEditing = $listItem;
        $listItem.find("input").prop("disabled", false);
        console.log($listItem);
        this.replaceEditInputs($listItem);
        if ($listItem.hasClass("requires-question")) {
            this._$questionWrapper.fadeIn("fast");
        }
        this._$addNewNoEditControls.fadeOut("fast", () => {
            this._$updateControls.fadeIn("fast");
        });
    }

    replaceEditInputs = $listItem => {
        let vals = [];
        const $inputs = $listItem.find("input");
        $inputs.each(function(index) {
            const $this = $(this);
            vals.push($this.val());
        });
        $listItem.hide();
        const $clone = this._$inputs.clone(true, true);
        $clone.find(".add__inputs-actions-item--close").click(() => {
            const e = {
                currentTarget: $inputs[0]
            }
            this.closeEditing();
            this.deleteSkill(e);
        });
        this._$clonedInputs = $clone;
        $clone.insertAfter($listItem).show();
        $clone.find(".add__inputs-actions-item").addClass("add__inputs-actions-item--active");
        $clone.find("[data-add-trigger-value='skill']").text(vals[0]);
        $clone.find("[data-add-trigger-value='detail']").val(vals[1]);
        $clone.find("[data-add-trigger-value='years']").text(vals[2]);
    }

    checkRequirements = () => {
        let requiresQuestion = this._$skillInput.attr("data-requires-question");
        requiresQuestion = (requiresQuestion === "true");
        if (requiresQuestion) {
            this._$questionMessage.show();
            this._$question.fadeIn("fast");
            const answer = this._$questionInput.val();
            if (answer === "" || answer === undefined) {
                this._$shouldWaitForRequirements = true;
            } else {
                this._$question.fadeOut("fast");
                this._$shouldWaitForRequirements = false;
            }
        } else {
            this._$question.fadeOut("fast");
            this._$shouldWaitForRequirements = false;
        }
    }

    addSkill = () => {
        const values = this.getValues();
        this.checkRequirements();
        this.addSkillToList(values);
    }

    closeInputs = () => {
        const hasChildren = this.checkListLength();
        this._$question.fadeOut("fast");
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
        });
    }
}