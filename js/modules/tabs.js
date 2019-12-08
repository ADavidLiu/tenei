class Tabs {
    constructor() {
        this._$window = $(window);
        this._$navTrack = $(".nav__track");
        this._$navItem = $(".nav__item");
        this._$tabItem = $(".tabs__content-item");
        this._$navItem.click(this.toggleTabs);
        this._$window.resize(this.resizeHandler);
        this.resizeTrack(this._$window.width());

        $(".datepicker").datepicker({
            inline: true,
            firstDay: 1
        });
    }

    resizeTrack = (_currentWindowWidth) => {
        const _newWidth = this._$window.width() - $(".sidebar").width();
        let _offsetPadding = 80;
        if (_currentWindowWidth > 992) {
            _offsetPadding = 120;
        }
        this._$navTrack.css({
            "maxWidth": _newWidth - _offsetPadding + "px"
        });
    }

    resizeHandler = () => {
        const _currentWindowWidth = this._$window.width();

        if (_currentWindowWidth > 768) {
            this.resizeTrack(_currentWindowWidth);
        }
    }

    toggleTabs = e => {
        const _$this = $(e.currentTarget);
        this._$navItem.removeClass("nav__item--active");
        _$this.addClass("nav__item--active");
        const _target = _$this.attr("data-tab-trigger");
        const _$target = $(`[data-tabs-target="${_target}"]`);
        this._$tabItem.removeClass("tabs__content-item--active");
        _$target.addClass("tabs__content-item--active");
    }
}