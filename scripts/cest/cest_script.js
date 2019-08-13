$(document).on('click', '.adicionar_use', function () {
    let use = $(this).siblings('.use');
    let useHTML = `
<li class="row col-4">
    <input class="form-control col-9" name="cest[use][${use.children().length}]">
    <button class="remover btn btn-danger col-2 remover_use"><i class="fas fa-times"></i></button>
</li>`;
    use.append(useHTML); 
});

$(document).on('click', '.remover_use', function () {
    $(this).parent().remove();
});