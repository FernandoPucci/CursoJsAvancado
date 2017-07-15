class TaskFormAlt extends TaskForm {



    html() {
        let html = "";
        html += "<div><label name='lblDescricao'>Descrição</label></div>";
        html += "<div><textarea type='text' name='DESCRICAO'></textarea></div>";
        html += "<div><label name='lblTitulo'>Título</label></div>";
        html += "<div><input type='text' name='TITULO' /></div>";


        return "<form>" + html + "</form>";

    }
}