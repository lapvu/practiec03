function addGroupItem( _csrf) {
    var item_group_name = $('#item_group_name').val();
    var item_group_des = $('#item_group_des').val();

    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "/admin/listitem/auto");

    var hiddenFieldGroupName = document.createElement("input");
    hiddenFieldGroupName.setAttribute("type", "hidden");
    hiddenFieldGroupName.setAttribute("name", "item_group_name");
    hiddenFieldGroupName.setAttribute("value", item_group_name);
    form.appendChild(hiddenFieldGroupName);

    var hiddenFieldGroupDes = document.createElement("input");
    hiddenFieldGroupDes.setAttribute("type", "hidden");
    hiddenFieldGroupDes.setAttribute("name", "item_group_des");
    hiddenFieldGroupDes.setAttribute("value", item_group_des);
    form.appendChild(hiddenFieldGroupDes);

    var hiddenFieldCsrf = document.createElement("input");
    hiddenFieldCsrf.setAttribute("type", "hidden");
    hiddenFieldCsrf.setAttribute("name", "_csrf");
    hiddenFieldCsrf.setAttribute("value", _csrf);
    form.appendChild(hiddenFieldCsrf);

    

    document.body.appendChild(form);
    form.submit();

    return false;
}