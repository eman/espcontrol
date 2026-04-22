// Read-only timezone card: displays local time for a selected timezone.
function timezoneCardLocationLabel(tz) {
  var tzId = getTzId(tz || "UTC");
  var idx = tzId.lastIndexOf("/");
  var label = idx >= 0 ? tzId.substring(idx + 1) : tzId;
  return label.replace(/_/g, " ");
}

function timezoneCardOptions(current) {
  var opts = state.timezoneOptions.length ? state.timezoneOptions.slice() : [state.timezone || "UTC (GMT+0)"];
  if (current && opts.indexOf(current) === -1) opts.unshift(current);
  return opts;
}

function timezoneCardPreviewTime(tz) {
  var now = new Date();
  var tzId = getTzId(tz || "UTC");
  try {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tzId,
      hour: "numeric",
      minute: "2-digit",
      hour12: state.clockFormat === "12h",
    }).formatToParts(now);
    var h = "";
    var m = "";
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].type === "hour") h = parts[i].value;
      else if (parts[i].type === "minute") m = parts[i].value;
    }
    return (state.clockFormat === "24h" ? h.padStart(2, "0") : h) + ":" + m;
  } catch (_) {
    return "--:--";
  }
}

registerButtonType("timezone", {
  label: "Timezone",
  allowInSubpage: true,
  hideLabel: true,
  onSelect: function (b) {
    b.entity = state.timezone || "UTC (GMT+0)";
    b.label = "";
    b.icon = "Auto";
    b.icon_on = "Auto";
    b.sensor = "";
    b.unit = "";
    b.precision = "";
  },
  renderSettings: function (panel, b, slot, helpers) {
    if (!b.entity) b.entity = state.timezone || "UTC (GMT+0)";

    var lf = document.createElement("div");
    lf.className = "sp-field";
    lf.appendChild(helpers.fieldLabel("Location", helpers.idPrefix + "timezone"));
    var select = document.createElement("select");
    select.className = "sp-select";
    select.id = helpers.idPrefix + "timezone";
    timezoneCardOptions(b.entity).forEach(function (opt) {
      var o = document.createElement("option");
      o.value = opt;
      o.textContent = formatTimezoneOption(opt);
      if (opt === b.entity) o.selected = true;
      select.appendChild(o);
    });
    select.addEventListener("change", function () {
      b.entity = this.value;
      helpers.saveField("entity", b.entity);
    });
    lf.appendChild(select);
    panel.appendChild(lf);
  },
  renderPreview: function (b, helpers) {
    var tz = b.entity || state.timezone || "UTC (GMT+0)";
    var label = timezoneCardLocationLabel(tz);
    return {
      iconHtml:
        '<span class="sp-sensor-preview">' +
          '<span class="sp-sensor-value sp-timezone-preview" data-tz="' + helpers.escAttr(tz) + '">' +
            timezoneCardPreviewTime(tz) +
          '</span>' +
        '</span>',
      labelHtml:
        '<span class="sp-btn-label-row"><span class="sp-btn-label">' + helpers.escHtml(label) + '</span>' +
        '<span class="sp-type-badge mdi mdi-map-clock"></span></span>',
    };
  },
});
