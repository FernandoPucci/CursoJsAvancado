class TaskForm {

    constructor(paramSettings) {

        let defaults = {
            //callbacks para envio de metodo externos para gravação
            onSave: function () {
                console.log("onSave Default");
            },
            onCancel: function () {
                console.log("onCancel Default");
            },
            onDelete: function () {
                console.log("onDelete Default");
            },
            showNaoRealizadas:function(){
            
            }
        };

        //this.settings = paramSettings;
        //$.extend -> faz merge de diversos objetos 
        //$.extend(bool propagar, {}, defaults, paramSettings, true);
        this.settings = $.extend(true, {}, defaults, paramSettings);

        this.buildForm();

        this._data = {};

    }

    buildForm() {

        this.$form = $(this.html());

        this.$save = this.$form.find("[name='save']");
        this.$cancel = this.$form.find("[name='cancel']");
        this.$delete = this.$form.find("[name='delete']");

        this.$titulo = this.$form.find("[name='TITULO']");
        this.$descricao = this.$form.find("[name='DESCRICAO']");

        this.$exibirNaoRealizadas = this.$form.find("[name='naoRealizada']");

        this.applyEvents();

    }

    html() {

        let html = "";

        html += "<div><label name='lblTitulo'>Título</label></div>";
        html += "<div><input type='text' name='TITULO' /></div>";

        html += "<div><label name='lblDescricao'>Descrição</label></div>";
        html += "<div><textarea type='text' name='DESCRICAO'></textarea></div>";

        html += "<input type='submit' name='save' value='Salvar'></input>";
        html += "<input type='button' name='cancel' value='Cancelar'></input>";
        html += "<input type='button' name='delete' value='Excluir'></input>";
        html += "<label><input type='checkbox' name='naoRealizada'></input>Exibir somente não realizadas</label>";


        return "<form>" + html + "</form>";

    }
    fill(data) {
        //variavel 'private' para criar um 'cash' dos dados nesta variavel
        this._data = data;

        this.$titulo.val(this._data.TITULO);
        this.$descricao.val(this._data.DESCRICAO);

    }

    removeBotoesRealizados(id) {

        this.$form = $(this.html());
        let btnDone = this.$form.find("[name='btnDone" + id + "']");
        let btnEdit = this.$form.find("[name='btnEdit" + id + "']");

        btnDone.hide();
        btnEdit.hide();

    }

    clear() {

        //variavel 'private' para criar um 'cash' dos dados nesta variavel
        this._data = {};
        this.$titulo.val("");
        this.$descricao.val("");
        this.enableButton(false, false, false);

    }

    applyEvents() {
        let _this = this;

        //CLICKS
        this.$save.click(function (e) {
            //quando se tem um submit, é feito o POST para uma URL. 
            //O preventDefault retira o comportamento padrão do submit.
            e.preventDefault();
            _this.save();
        });

        this.$cancel.click(function (e) {
            e.preventDefault();
            _this.cancel();
        });

        this.$delete.click(function (e) {
            e.preventDefault();
            _this.delete();
        });

        this.$exibirNaoRealizadas.click(function (e) {
           // e.preventDefault();
            _this.listarNaoRealizadas();
        });

        //keyup
        this.$titulo.keyup(function () {

            if (_this.checkIsFill(_this.$titulo.val()) && _this.checkIsFill(_this.$descricao.val())) {
                _this.enableButton(true, true, true);
            }
        });

        this.$descricao.keyup(function () {
            if (_this.checkIsFill(_this.$titulo.val()) && _this.checkIsFill(_this.$descricao.val())) {
                _this.enableButton(true, true, true);
            }
        });

        //CHANGE
        this.$titulo.change(function () {
            _this._data.TITULO = $(this).val();
        });

        this.$descricao.change(function () {
            _this._data.DESCRICAO = $(this).val();
        });
    }

    checkIsFill(field) {
        return (field != '');
    }

    enableButton(stSave, stCancel, stDelete) {
        this.$save.attr("disabled", !stSave);
        this.$cancel.attr("disabled", !stCancel);
        this.$delete.attr("disabled", !stDelete);
    }

    save(e) {
        //apply garante que o 'this' ao contexto que originou a chamada
        //passando como contexto o objeto atual (this), e um array de parametros
        this.settings.onSave.apply(this, [e]);
        this.clear();
        console.log("Salvo!");

    }

    cancel(e) {
        this.settings.onCancel.apply(this, [e]);
        console.log("Cancelado!");
        this.clear();
    }

    delete(e) {
        this.settings.onDelete.apply(this, [e]);
        console.log("Apagado!");
        this.clear();
    }

    listarNaoRealizadas(e) {
       
        this.settings.showNaoRealizadas.apply(this, [e]);
        console.log("Exibindo somente não realizadas");

        this.clear();

    }

    //metodo para retornar os dados para o TaskList
    getData() {
        return this._data;
    }


}