class DataSource {


    constructor(settings) {
        let defaults = {
            primaryKey: "ID",
            onReadFinish: function () {

            },
            readUrl: "",
            dtaConclusao:"",
            strike: false
        };

        this.settings = $.extend(true, {}, defaults, settings);
        this._data = [];

        this.currentPK = 0;
    }

    read() {

        var _this = this;

        //promise
        let requisicao = $.ajax({
            url: "http://wms.consinco.com.br/agendamento/Lista/Read",
            data: { "USUARIO": "MELO" },
            method: "POST"
        });

        $.when(requisicao).then(function (r) {
            _this._data = r.data;
            _this.settings.onReadFinish.apply(_this, [r]);
        });
    }

    add(item) {
        item[this.settings.primaryKey] = ++this.currentPK;
        item[this.settings.dtaConclusao] = "";
        item[this.settings.strike] = false;
        this._data.push(item);
    }

    edit(item) {
        let pk = this.settings.primaryKey,
            itemExistente = this.findById(item[pk]);

        for (var n in item) {
            itemExistente[n] = item[n];
        }
    }

    delete(item) {
        let pk = this.settings.primaryKey,
            index;


        index = this.indexOf(item[pk]);

        //remove 1 item da lista
        this._data.splice(index, 1);
    }

    //busca o indice no _data
    indexOf(id) {
        let index = -1,
            data = this._data,
            pk = this.settings.primaryKey,
            item;

        for (var i = 0, length = data.length; i < length; i++) {
            item = data[i];
            if (item[pk] == id) {
                index = i;
                break;
            }
        }

        return index;
    }

    getData() {
        return this._data;
    }

    findById(id) {
        let pk = this.settings.primaryKey;

        return this._data.filter(function (item) {
            return item[pk] == id;
        })[0];//FirstOrDefault
    }

    getNaoRealizadas(){
        debugger;
        return this._data.filter(function(item){
            return item.STRIKE == false;
        });

    }

    setDataConclusao(item) {
      
        item.DTACONCLUSAO = new Date().toLocaleString();
        item.STRIKE = true;
        this.edit(item);       

    }

}