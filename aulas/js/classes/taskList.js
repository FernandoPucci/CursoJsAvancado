class TaskList {


    constructor(selector) {

        this.$element = $(selector);

        this.dataSource = new DataSource({ primaryKey: "SEQLISTA" });

        let self = this;

        let settingsTaskForm = {

            onSave: function () {
                self.save();
                console.log(this);
                console.log("save");
            },
            onCancel: function () {
                console.log("cancel");

            },
            onDelete: function () {
                self.delete();
                console.log("delete");
            }


        };
        //adiciona o formulario
        this.form = new TaskForm(settingsTaskForm);
        this.form.$form.appendTo(this.$element);

        //adiciona a lista
        this.buildList();
        this.$list.appendTo(this.$element);

        this.form.enableButton(false, false, false);

    }

    html() {
        return "";
    }

    //constroi a lista
    buildList() {
        let form = this.form,
            _dataSource = this.dataSource;

        this.$list = $("<ui></ui>");

        //quando houver um clique na lista e vier de um button
        this.$list.on("click", "input[type='button']", function (e) {
            var $input = $(this),
                $li = $input.closest("li"),
                id = $li.data("id"),
                item = _dataSource.findById(id);
            
                form.enableButton(false, true, true);
            console.log(">>>> ID: " + id);

            e.preventDefault();
            form.fill(item);

        });
    }

    //template de lista
    itemTemplate(item) {
        return "<li data-id='" + item.SEQLISTA + "'><b>" + item.TITULO
            + "</b> | <small>&nbsp;"
            + item.DESCRICAO
            + "</small>"
            + "&nbsp;|&nbsp;<input type='button' value='Editar' />&nbsp;"
            + "</li>";
    }

    save() {
        let item = this.form.getData();

        if (item.TITULO != null && item.DESCRICAO != null) {
            if (item.hasOwnProperty("SEQLISTA") && item.SEQLISTA > 0) {
                this.dataSource.edit(item);                
            } else {
                this.dataSource.add(item);
            }
        }
        this.refresh();
    }

    delete() {

        let item = this.form.getData();

        this.dataSource.delete(item);
        this.refresh();
    }

    refresh() {
        let html
            , template = this.itemTemplate
            , data = this.dataSource.getData()
            , form  = this.form;

        //reduce funciona como um 'acumulador'  
        html = data.reduce(function (ant, obj) {
            return ant + template(obj);
        }, '');

        this.$list.html(html);
        form.enableButton(false, false, false);
    }

}