class Header {
    constructor() {
        this._$btn = $(".header__btn");
        this._$header = $(".header");
        this._$headerNav = $(".header__nav");
        this._$navItemActive = $(".sidebar__nav-item--active");
        this._$navMenu = $(".sidebar__menu");

        this._$navItemActive.click(this.toggleMenu);
        this._$btn.click(this.toggleHeadernMenu);
    }

    toggleHeadernMenu = () => {
        this._$header.toggleClass("header--open");
        this._$headerNav.stop().slideToggle("fast");
    }

    toggleMenu = e => {
        e.preventDefault();
        this._$navItemActive.toggleClass("sidebar__nav-item--open");
        this._$header.toggleClass("header--active");
        if (this._$navItemActive.hasClass("sidebar__nav-item--open")) {
            this._$navItemActive.css("transform", `translateY(${-this._$navMenu.innerHeight()}px)`);  
        } else {
            this._$navItemActive.css("transform", "none");
        } 
        this._$navMenu.toggleClass("sidebar__menu--hidden");
    }
}