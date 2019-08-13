$(document).on('click', '.adicionar_value', function () {
    let value = $(this).siblings('.data');
    let valueHTML = `
<li class="row col-5">
    <input class="form-control col-4" name="cest[data][${value.children().length}][key]" placeholder="Chave">
    <div class="col-2 separador"><i class="fas fa-angle-double-right"></i></div>
    <input class="form-control col-4" name="cest[data][${value.children().length}][value]" placeholder="Valor">
    <button class="remover btn btn-danger col-2 remover_value"><i class="fas fa-times"></i></button>
</li>`;
    value.append(valueHTML); 
});

$(document).on('click', '.remover_value', function () {
    $(this).parent().remove();
});