registerButtonType("radar", {
  label: "Radar",
  allowInSubpage: false,
  labelPlaceholder: "e.g. Local Radar",
  onSelect: function (b) {
    b.entity = ""; b.sensor = ""; b.unit = "";
    b.icon = "Radar"; b.icon_on = "Auto";
  },
  renderSettings: function (panel, b, slot, helpers) {
    var hint = document.createElement("div");
    hint.className = "sp-field-hint";
    hint.textContent = "Uses the location from Settings \u203A Weather.";
    panel.appendChild(hint);

    var zf = document.createElement("div");
    zf.className = "sp-field";
    zf.appendChild(helpers.fieldLabel("Zoom (1\u20137)", helpers.idPrefix + "zoom"));
    var zoomInp = helpers.textInput(helpers.idPrefix + "zoom", b.zoom || "6", "6");
    zoomInp.className = "sp-input sp-input--narrow";
    zf.appendChild(zoomInp);
    panel.appendChild(zf);
    helpers.bindField(zoomInp, "zoom", true);
  },
  renderPreview: function (b, helpers) {
    var label = b.label || "Radar";
    var zoom = b.zoom || "6";
    return {
      iconHtml:
        '<div class="sp-radar-tile" data-zoom="' + helpers.escHtml(zoom) + '">' +
          '<span class="sp-radar-placeholder mdi mdi-radar"></span>' +
        '</div>',
      labelHtml:
        '<span class="sp-btn-label">' + helpers.escHtml(label) + '</span>',
    };
  },
});
