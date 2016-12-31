$(function () {
  var $shipmentItems = $('#shipmentItems');
  var $leirasSubmit = $('#leirasSubmit');

  function ujSor(shipmentItem) {
    var html = `<div class="form-group smart-ingredient"><label class="col-lg-2 control-label"></label>
    <div class="col-md-3">
        <input class="form-control smart-ingredient-amount" value="${shipmentItem.mennyiseg}" type="text">
    </div>
    <div class="col-md-3">
        <input class="form-control smart-ingredient-name" value="${shipmentItem.hozzavalo}" type="text">
    </div>
    <div class="col-md-2">
        <button type="button" class="btn btn-danger btn-block">
            <span aria-hidden="true">Elem törlése</span>
        </button>
    </div>
  </div>`;

    var sor = $(html)
    sor.on('click', '.btn-danger', function () {
      $(this).closest('.smart-ingredient').remove();
    });
    $shipmentItems.append(sor);
  }

  $('#add').on('click', function () {
    ujSor({
      mennyiseg: '1db',
      hozzavalo: 'Megnevezés'
    });
  });


  var $summary = $('#inputSummary');

  $leirasSubmit.on('click', function () {
    var str = '';
    $('.smart-ingredient').each(function () {
      var mennyiseg = $(this).find('.smart-ingredient-amount').val();
      var hozzavalo = $(this).find('.smart-ingredient-name').val();
      str += mennyiseg + ' ' + hozzavalo + ';\n';
    });
    //str+='\n';

    //$summary.val(str + $summary.val());
    $summary.val(str);

  });

  var description = $summary.val();
  var reszek = description.split('\n\n');
  var hozzavalok;
  if (reszek.length > 1) {
    hozzavalok = reszek[0];
    $summary.val(reszek.slice(1).join('\n\n'));
  } else {
    hozzavalok = '';
  }

  var hozzavaloSorok = hozzavalok.split('\n');
  for (var i = 0; i < hozzavaloSorok.length; i++) {
    var sor = hozzavaloSorok[i];
    if (sor === '') {
      continue;
    }
    var reszek = sor.split(' ');
    ujSor({
      mennyiseg: reszek[0],
      hozzavalo: reszek.slice(1).join(' ')
    });
  }
});