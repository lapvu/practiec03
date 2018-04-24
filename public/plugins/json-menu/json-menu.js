$(function () {

    //load JSON file
    $.getJSON('/json', function(data) {
    //build menu
    var builddata = function () {
        var source = [];
        var items = [];
        for (i = 0; i < data.length; i++) {
            var item = data[i];
            var label = item["name"];
            var parentid = item["parent_id"];
            var id = item["id"];
            var url = item["url"];
            var css_class = item["css_class"];

            if (items[parentid]) {
                var item = { parentid: parentid, label: label, url: url, css_class: css_class ,item: item };
                if (!items[parentid].items) {
                    items[parentid].items = [];
                }
                items[parentid].items[items[parentid].items.length] = item;
                items[id] = item;
            }
            else {
                items[id] = { parentid: parentid, label: label, url: url, css_class: css_class, item: item };
                source[id] = items[id];
            }
        }
        return source;
    }

    var buildSubUL = function (parent, items) {
        $.each(items, function () {
            if (this.label) {
                var li = $("<li>" + "<a  class='fa fa-area-chart' href='"+ this.url +"'>" + this.label + "</a></li>");
                var li = $("<li><a href='hdbh-thuongmai.html'><i class='fa fa-circle-o'></i> JOSN Menu</a></li>");
                li.appendTo(parent);
            }
        });
    }

    var buildUL = function (parent, items) {
        $.each(items, function () {
            if (this.label) {

                str =   '<li> ' +
                        '<a href="'+ this.url +'"> ' +
                    '   <i class="' + this.css_class +'"></i> <span>' + this.label + '</span>' +
                    '</a>' +
                    '</li>';
                var li = $(str);
                
                if (this.items && this.items.length > 0) {
                    str = '<li class="treeview">' +
                    '<a href="#">' + 
                            '<i class="fa fa-copy"></i>' + 
                            '<span>Hóa Đơn Bán Hàng</span>' + 
                            '<span class="pull-right-container">' + 
                            '  <i class="fa fa-angle-left pull-right"></i>' + 
                            '</span>' + 
                          '</a>' +
                          '</li>';
                    li = $(str);
                }
                li.appendTo(parent);
                if (this.items && this.items.length > 0) {
                    var ul = $("<ul class='treeview-menu'></ul>");
                    ul.appendTo(li);
                    buildSubUL(ul, this.items);
                }
            }
        });
    }
    var source = builddata();
    var ul = $(".sidebar-menu");
    ul.appendTo(".sidebar-menu");
    buildUL(ul, source);
    });

    
});



