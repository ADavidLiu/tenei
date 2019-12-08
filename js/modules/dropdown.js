class Dropdown {
    constructor() {
        this._$input = $(".dropdown__input");
        this._$listItem = $(".dropdown__list-item");
        
        this._$input.click(this.toggleList);
        this._$listItem.click(this.changeValue);
    }

    toggleList = e => {
        const $this = $(e.currentTarget);
        $this.toggleClass("dropdown__input--active");
        $this.parents(".dropdown-group").find(".dropdown__list").stop().slideUp("fast");
        $this.siblings().stop().slideToggle("fast");
    }

    changeValue = e => {
        const $this = $(e.currentTarget);
        const newVal = $this.text();
        const requiresQuestion = $this.attr("data-requires-question");
        const $parentDropdown = $this.parents(".dropdown");
        const $inputValue = $parentDropdown.find(".dropdown__input-value");
        if (typeof requiresQuestion !== typeof undefined && requiresQuestion !== false) {
            $inputValue.attr("data-requires-question", true);
        } else {
            $inputValue.attr("data-requires-question", false);
        }
        if ($parentDropdown.hasClass("dropdown--multi")) {
            $this.toggleClass("dropdown__list-item--active");
            let newVals = "";
            $parentDropdown.find(".dropdown__list-item--active").each(function(index) {
                const $this = $(this);
                newVals += $this.text() + ", ";
            });
            const formattedVals = newVals.slice(0, -2);
            $inputValue.text(formattedVals);
            if ($parentDropdown.find(".dropdown__list-item--active").length <= 0) {
                $inputValue.text($inputValue.attr("data-placeholder"));
            }
        } else {
            $this.addClass("dropdown__list-item--active");
            $this.siblings().removeClass("dropdown__list-item--active");
            $inputValue.text(newVal);
            const timeout = setTimeout(() => {
                $this.parent().stop().slideToggle("fast");
                $this.parents(".dropdown").find(".dropdown__input").removeClass("dropdown__input--active");
                clearTimeout(timeout);
            }, 250);
        }
    }
}