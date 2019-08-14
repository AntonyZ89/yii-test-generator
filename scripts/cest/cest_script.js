$(document).on('click', '.adicionar_use', function () {
    let use = $(this).siblings('.use');
    let useHTML = `
<li class="row col-4">
    <input class="form-control col-9" name="cest[fixture][${use.children().length}]">
    <button class="remover btn btn-danger col-2 remover_use"><i class="fas fa-times"></i></button>
</li>`;
    use.append(useHTML);
});

$(document).on('click', '.remover_use, .remover_action', function () {
    $(this).parent().remove();
});

$(document).on('click', '.adicionar_action', function () {
    let actions = $(this).siblings('.actions');

    let actionHTML = `
<li class="form-group row col-md-12">
    <label class="col-md-12" for="cest[methods][{index}][{nome}][{index2}]">{nome}</label>
    <input class="form-control col-md-11" name="cest[methods][{index}][{nome}][{index2}]">
    <button class="btn btn-danger btn-lg col-md-1 remover_action p-0" type="button"><i class="fas fa-times"></i></button>
</li>`;

    let _ac = actions.siblings('._ac');

    _ac.append(
        actionHTML
        .replace(/\{index\}/g, actions.parent().index())
        .replace(/\{nome\}/g, actions.val())
        .replace(/\{index2\}/g, _ac.children().length)
        );
});

$(document).on('click', '.adicionar_method', function() {
    let newMethod = $($('.action > li:nth-child(1)')[0].outerHTML.replace(/\[\d+\]/g, `[${$('.action > li').length}]`));
    newMethod.find('._ac').empty();
    $('.action').append(newMethod);
});