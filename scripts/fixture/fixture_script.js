$(document).on('click', '.adicionar_dependence', function () {
    let dependence = $(this).siblings('.dependence');
    let dependenceHTML = `
<li class="row col-4">
    <input class="form-control col-10" name="fixture[dependence][${dependence.children().length}]" placeholder="Classe dependente">
    <button class="remover btn btn-danger col-2 remover_dependence"><i class="fas fa-times"></i></button>
</li>`;
    dependence.append(dependenceHTML); 
});

$(document).on('click', '.remover_dependence', function () {
    $(this).parent().remove();
});