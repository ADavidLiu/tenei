class Login {
    constructor() {
        this.$controlsItem = $(".login__controls-item");
        this.$controlsItem.click(this.changeHighlight);

        this.$trigger = $("[data-login-trigger]");
        this.$trigger.click(this.changeContent);
    }

    changeContent = e => {
        const $this = $(e.currentTarget);
        const target = $this.attr("data-login-content");
        const $target = $(`[data-login-content=${target}]`);
        $target.siblings(".login__form-content--active");
    }

    changeHighlight = e => {
        const $this = $(e.currentTarget);
        $this.siblings().removeClass("login__controls-item--active");
        $this.addClass("login__controls-item--active");
    }
}