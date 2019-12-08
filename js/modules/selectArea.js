class SelectArea {
    constructor() {
        this._$wrapper = $(".select-area__map-wrapper");
        this._$base = $(".select-area__map--base");
        this._$input = $(".select-area input");
        this._$labels = $(".select-area__labels p");
        this._$maps = $(".select-area__map");
        this._$hotspot = $(".select-area__hotspot");

        this._$labels.hover(this.changeSelection);
        this._$hotspot.hover(this.changeSelection);
    }

    changeSelection = e => {
        const _$this = $(e.currentTarget);
        const _area = _$this.attr("data-area");
        this._$labels.removeClass("active");
        const _$selectedLabel = $(`.select-area__labels p[data-area="${_area}"]`);
        _$selectedLabel.addClass("active");
        this._$input.val(_$selectedLabel.text());
        this.highlightMap(_area);
    }

    highlightMap = _area => {
        const _$map = $(`.select-area__map[data-area="${_area}"]`);
        this._$maps.removeClass("select-area__map--active");
        _$map.addClass("select-area__map--active");
    }
}