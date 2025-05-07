$( document ).ready(function() {
  $("a[href*='/1-a-3']").parent().remove();
  $("a[href*='/13-3-2']").parent().remove();
  $("a[href*='/17-6-2']").parent().remove();
});

$( document ).ready(function() {
  opensdg.chartConfigAlter(function(config, info) {
    var overrides = {
      options: {
        tooltips: {
          callbacks: {
            title: function(tooltipItem, data) {
              var label = (Array.isArray(tooltipItem)) ? tooltipItem[0].label : tooltipItem.label;
              return convertXAxisLabel(label);
            }
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              callback: function(value, index, values) {
                return convertXAxisLabel(value);
              }
            },
          }]
        },
      }
    }

    // Add these overrides onto the normal config.
    $.extend(true, config, overrides);
  });

  opensdg.chartConfigAlter(function(config, info) {
    // Force the "bar" type if there are less than 2 years of data.
    if (config.type === 'line' && info.labels.length < 2) {
      var overrides = {type: 'bar'}
      $.extend(true, config, overrides);
    }
  });

  opensdg.tableConfigAlter(function(config, info) {
    config.columnDefs = [
      {
        targets: 0,
        render: function(data, type, row) {
          return (type === 'display') ? convertXAxisLabel(data) : data;
        }
      }
    ]
  });

  function convertXAxisLabel(label) {
    let strVal = label.toString();
    let newLabel = strVal;
    if (strVal.length > 3 && strVal.charAt(1) == ")") {
      newLabel = strVal.substring(2);
    }

    return newLabel;
  }
});


//remove link from dates
// $(document).ready(function () {
//    const $rows = $("#national tr");

//    if ($rows.length >= 2) {
//       const $link1 = $rows.eq(-1).find("a");
//       const $link2 = $rows.eq(-2).find("a");

//       [$link1, $link2].forEach(($link) => {
//          if ($link.length) {
//             const text = $link.text().trim();
//             const match = text.match(/\d{4}-\d{2}-\d{2}/);
//             if (match) {
//                $link.text(match[0]).removeAttr("href");
//             }
//          }
//       });
//    }
// });
