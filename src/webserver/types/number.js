// Number input card: controls numeric values (brightness, timeout, etc).
registerButtonType("number", {
  label: "Number",
  allowInSubpage: true,
  onSelect: function (b) {
    b.entity = "";
    if (!b.label) b.label = "Value";
    if (!b.min) b.min = "0";
    if (!b.max) b.max = "100";
    if (!b.step) b.step = "1";
  },
  renderSettings: function (panel, b, slot, helpers) {
    var ef = document.createElement("div");
    ef.className = "sp-field";
    ef.appendChild(helpers.fieldLabel("Number Entity", helpers.idPrefix + "entity"));
    var entityInp = helpers.textInput(helpers.idPrefix + "entity", b.entity, "e.g. number.screensaver_timeout");
    ef.appendChild(entityInp);
    panel.appendChild(ef);
    helpers.bindField(entityInp, "entity", true);

    var lf = document.createElement("div");
    lf.className = "sp-field";
    lf.appendChild(helpers.fieldLabel("Label", helpers.idPrefix + "label"));
    var labelInp = helpers.textInput(helpers.idPrefix + "label", b.label, "e.g. Timeout");
    lf.appendChild(labelInp);
    panel.appendChild(lf);
    helpers.bindField(labelInp, "label", true);

    var minf = document.createElement("div");
    minf.className = "sp-field";
    minf.appendChild(helpers.fieldLabel("Min Value", helpers.idPrefix + "min"));
    var minInp = helpers.textInput(helpers.idPrefix + "min", b.min, "0");
    minInp.type = "number";
    minf.appendChild(minInp);
    panel.appendChild(minf);
    helpers.bindField(minInp, "min", true);

    var maxf = document.createElement("div");
    maxf.className = "sp-field";
    maxf.appendChild(helpers.fieldLabel("Max Value", helpers.idPrefix + "max"));
    var maxInp = helpers.textInput(helpers.idPrefix + "max", b.max, "100");
    maxInp.type = "number";
    maxf.appendChild(maxInp);
    panel.appendChild(maxf);
    helpers.bindField(maxInp, "max", true);

    var stepf = document.createElement("div");
    stepf.className = "sp-field";
    stepf.appendChild(helpers.fieldLabel("Step", helpers.idPrefix + "step"));
    var stepInp = helpers.textInput(helpers.idPrefix + "step", b.step, "1");
    stepInp.type = "number";
    stepf.appendChild(stepInp);
    panel.appendChild(stepf);
    helpers.bindField(stepInp, "step", true);

    var unitf = document.createElement("div");
    unitf.className = "sp-field";
    unitf.appendChild(helpers.fieldLabel("Unit (optional)", helpers.idPrefix + "unit"));
    var unitInp = helpers.textInput(helpers.idPrefix + "unit", b.unit, "e.g. s");
    unitf.appendChild(unitInp);
    panel.appendChild(unitf);
    helpers.bindField(unitInp, "unit", true);
  },
  renderPreview: function (b, helpers) {
    var label = b.label || "Number";
    var unit = b.unit ? " " + helpers.escHtml(b.unit) : "";
    return {
      iconHtml:
        '<span class="sp-sensor-preview">' +
          '<span class="sp-sensor-value">50</span>' +
          '<span class="sp-sensor-unit">' + unit + '</span>' +
        '</span>',
      labelHtml:
        '<span class="sp-btn-label-row"><span class="sp-btn-label">' + helpers.escHtml(label) + '</span>' +
        '<span class="sp-type-badge mdi mdi-numeric"></span></span>',
    };
  },
});
