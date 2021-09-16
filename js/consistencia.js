//*******************************************\\
//** FUN«√O PARA DETECTAR O BROWSER/VERS√O **\\
//*******************************************\\
//*******************************************\\
//********* EXEMPLO DE UTILIZA«√O ***********\\
//var navegador = detectBrowser();
//if (navegador.ie && navegador.version < 9) {
//  Faz coisas quando for IE e vers„o menor que 9
//}
//
// OU
//
//if (navegador.name == 'chrome') {
// Se for Chrome faz isso
//}
//
//**************************************************\\
//*** FUTURAMENTE INTEGRAR ESTAS INFORMA«’ES     ***\\
//*** COM AS QUE PODEM SER OBTIDAS DA FUN«√O PHP ***\\
//**************************************************\\
function detectBrowser() {
    var _browser = {},
        uagent = navigator.userAgent.toLowerCase(),
        match = '';

    _browser.chrome = /webkit/.test(uagent) && /chrome/.test(uagent) && !/edge/.test(uagent);
    _browser.firefox = /mozilla/.test(uagent) && /firefox/.test(uagent);
    _browser.ie = /msie/.test(uagent) || /trident/.test(uagent) || /edge/.test(uagent);
    _browser.safari = /safari/.test(uagent) && /applewebkit/.test(uagent) && !/chrome/.test(uagent);
    _browser.opr = /mozilla/.test(uagent) && /applewebkit/.test(uagent) && /chrome/.test(uagent) && /safari/.test(uagent) && /opr/.test(uagent);
    _browser.origin_version = '';
    _browser.version = '';
    _browser.name = '';
    _browser.mode = 'normal';

    //_browser.origin_version = recebe versao do navegador obtida pelo php

    for (x in _browser) {
        if (_browser[x]) {

            // microsoft is "special"
            match = uagent.match(new RegExp("(" + (x === "msie" ? "msie|edge" : x) + ")( |\/)([0-9]+)"));

            if (match) {
                _browser.version = match[3];
            } else {
                match = uagent.match(new RegExp("rv:([0-9]+)"));
                _browser.version = match ? match[1] : "";
            }

            _browser.name = (x === "opr" ? "Opera" : x);

            if (uagent.match(new RegExp("(compatible)"))) {
                _browser.mode = 'compatibility';
            }

            break;
        }
    }

    _browser.opera = _browser.opr;
    delete _browser.opr;

    return _browser;
}

//se essa vari·vel (NAO_USA_GERENCIADOR_TECLAS) estiver definida quer dizer que n„o queremos usar o gerenciador de teclas
//estamos usando isso no chat da zurich para contornar um problema de seguranÁa (cross-origin)
if (typeof NAO_USA_GERENCIADOR_TECLAS == 'undefined') {

    try {
      if (typeof parent.atualAbaV8 == 'function') {
        objParent = parent;
      } else if (typeof atualAbaV8 == 'function') {
        objParent = window;
      }
    } catch (e) {
      if (typeof atualAbaV8 == 'function') {
        objParent = window;
      }
    }


    //if para ativar o ouvidor da V8 todo programa que executa a v8 vai trabalhar para receber as teclas e demais cliques
    if ((typeof objParent != 'undefined') && objParent.atualAbaV8) {
        if (typeof objParent.atualAbaV8 == 'function') { //soh funciona na v8
            objParent.$(document).bind("mousedown", function(e) {
                objParent.gerenciadorTeclas(e);
            });
            objParent.$(document).bind("keypress", function(e) {
                objParent.gerenciadorTeclas(e);
            });
            objParent.$(document).bind("keydown", function(e) {
                objParent.gerenciadorTeclas(e);
            });
        }
    }

}

function BDDate(data) {
    arr_data = data.split("/");
    var nova_data = arr_data[2] + "-" + arr_data[1] + "-" + arr_data[0];
    return nova_data;
}

function verificaRotinaCep(obj, nl, alvo, array_campos) {
    if (obj.value.length >= nl) {
        ConsultaRotinaCep(obj, array_campos, '1');
        if (alvo.type != 'hidden') {
            alvo.focus();
        }
    }
}

function removeEnter() {
    var tecla = window.event.keyCode;
    if (tecla == 13) {
        event.keyCode = 0;
        event.returnValue = false;
    }
}

function url_encode(str) {
    str = escape(str);
    str = str.replace('+', '%2B');
    str = str.replace('%20', '+');
    str = str.replace('*', '%2A');
    str = str.replace('/', '%2F');
    str = str.replace('@', '%40');
    return str;
}

function urldecode(str) {

    var histogram = {};
    var ret = str.toString();

    var replacer = function(search, replace, str) {
        var tmp_arr = [];
        tmp_arr = str.split(search);
        return tmp_arr.join(replace);
    };

    // The histogram is identical to the one in urlencode.
    histogram["'"] = '%27';
    histogram['('] = '%28';
    histogram[')'] = '%29';
    histogram['*'] = '%2A';
    histogram['~'] = '%7E';
    histogram['!'] = '%21';
    histogram['%20'] = '+';
    histogram['\u20AC'] = '%80';
    histogram['\u0081'] = '%81';
    histogram['\u201A'] = '%82';
    histogram['\u0192'] = '%83';
    histogram['\u201E'] = '%84';
    histogram['\u2026'] = '%85';
    histogram['\u2020'] = '%86';
    histogram['\u2021'] = '%87';
    histogram['\u02C6'] = '%88';
    histogram['\u2030'] = '%89';
    histogram['\u0160'] = '%8A';
    histogram['\u2039'] = '%8B';
    histogram['\u0152'] = '%8C';
    histogram['\u008D'] = '%8D';
    histogram['\u017D'] = '%8E';
    histogram['\u008F'] = '%8F';
    histogram['\u0090'] = '%90';
    histogram['\u2018'] = '%91';
    histogram['\u2019'] = '%92';
    histogram['\u201C'] = '%93';
    histogram['\u201D'] = '%94';
    histogram['\u2022'] = '%95';
    histogram['\u2013'] = '%96';
    histogram['\u2014'] = '%97';
    histogram['\u02DC'] = '%98';
    histogram['\u2122'] = '%99';
    histogram['\u0161'] = '%9A';
    histogram['\u203A'] = '%9B';
    histogram['\u0153'] = '%9C';
    histogram['\u009D'] = '%9D';
    histogram['\u017E'] = '%9E';
    histogram['\u0178'] = '%9F';

    for (replace in histogram) {
        search = histogram[replace]; // Switch order when decoding
        ret = replacer(search, replace, ret) // Custom replace. No regexing
    }

    // End with decodeURIComponent, which most resembles PHP's encoding functions
    ret = decodeURIComponent(ret);

    return ret;
}

function ConsultaRotinaCep(obj, array_campos, tipo) {
    cep = obj.value;
    if (cep.length > 0 && cep.length != 8) {
        alert('Preencha corretamente o numero do CEP.');
        obj.focus();
    } else {
        if (cep.length == 8) {
            strHelpOptions = "location=no";
            strHelpOptions += ",toolbar=no";
            strHelpOptions += ",titlebar=no";
            strHelpOptions += ",menubar=no";
            strHelpOptions += ",status=yes";
            strHelpOptions += ",scrollbars=yes";
            strHelpOptions += ",top=";
            strHelpOptions += 1;
            strHelpOptions += ",left=";
            strHelpOptions += 1;
            strHelpOptions += ",width=300";
            strHelpOptions += ",height=150";
            InfoProdutoCEP = window.open('rotina_cep.php?tipo=' + tipo + '&cep=' + cep + '&array_campos=' + array_campos, 'InfoProdutoCEP', strHelpOptions);
            //InfoProdutoCEP.focus();
        }
    }
}

function JanelaAlert(tp_msg, msg, redir_atras) {
    //OpÁıes para o tp_msg: erro, sucesso e alert
    AbreJanela('alert.php?msg=' + msg + '&tp_msg=' + tp_msg, 'janAlerta', '400', '150');
    if (redir_atras)
        window.location = redir_atras;
}

//tem como parametro HH:MM:SS e retorna os segundos equivalentes
function calculaSegundos(time) {
    arrtime = time.split(":");
    hora = arrtime[0];
    min = arrtime[1];
    seg = arrtime[2];
    hora = hora * 3600;
    min = min * 60;
    hora = new Number(hora);
    min = new Number(min);
    seg = new Number(seg);
    return (hora + min + seg)
}

//formata os segundos em formtato HH:MM:SS
function calctime(nro) {
    hora = (nro / 3600); //pega o horario
    hora = new String(hora); //transforma em string
    arr_hora = hora.split(".") //splita em ponto
    hora = arr_hora[0]; //pega a primeira posicao
    if (hora < 10) { hora = "0" + hora } //se <10 concatena 0

    resto_hora = nro % 3600;

    min = resto_hora / 60;
    min = new String(min); //transforma em string
    arr_min = min.split(".") //splita em ponto
    min = arr_min[0]; //pega a primeira posicao
    if (min < 10) { min = "0" + min } //se <10 concatena 0

    seg = resto_hora % 60;
    if (seg < 10) { seg = "0" + seg } //se <10 concatena 0
    return hora + ":" + min + ":" + seg;
}

//FUNCAO PARA QUE O BOTAO F5 S” ATUALIZE O FRAME PRINCIPAL
function cancelaLogoff() {
    parent.rodape.form_logoff.faz_logoff.value = 'nao';
}

function liberaFechar() {
    if (parent.forms_hidden) {
        if (parent.forms_hidden.document.form_logoff.faz_logoff) {
            parent.forms_hidden.document.form_logoff.faz_logoff.value = 'nao';
        }
    }
}

function expiraSessao() {
    if (window.frames.length > 0 || parent.window.frames.length > 0) {
        var uri = window.location.href;
        liberaFechar();

        window.name = '';

        if (uri.indexOf("msg_erro=Sess„o expirada.") == -1) {
            parent.location = uri + ((uri.indexOf("?") == -1) ? "?" : "&") + "msg_erro=Sess„o expirada.";
        } else {
            parent.location = uri;
        }
        return;
    } else {
        if (window.name.toString().length > 0) {
            window.name = '';
        }
        //    if (typeof(window.opener) == 'object') {
        //      if (window.opener.closed == false) {
        //        if (typeof(window.opener.expiraSessao) == 'object') {
        //          window.opener.expiraSessao();
        //        }
        //        window.close();
        //        return;
        //      }
        //    }
    }
}

function disablekeyboardnavigation(event) {
    isNetscape = (document.layers);
    eventChooser = (isNetscape) ? keyStroke.which : event.keyCode;
    if (event.shiftKey) {
        if (eventChooser == 16) {
            eventChooser = 0;
            return false;
        }
    }
    if (event.ctrlKey) {
        if (eventChooser == 78) {
            eventChooser = 0;
            return false;
        }
    }
    prevKey = event.keyCode;
    if (event.keyCode == 116) {
        if (parent.frame_principal) {
            parent.frame_principal.location.reload();
            event.keyCode = 0;
            return false;
        } else {
            event.keyCode = 0;
            return false;
        }
    }
    prevKey = event.keyCode;
    return true;
}

//document.onkeydown   = disablekeyboardnavigation;
//window.onkeydown     = disablekeyboardnavigation;

function abreFax(url) {
    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=yes";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=yes";
    strHelpOptions += ",top=1";
    strHelpOptions += ",left=1";
    Janela = window.open(url, 'Janela', strHelpOptions);
    Janela.focus();
    document.simula.submit();
}

//window.document.onkeyup   = handKeyup;
//window.document.onkeydown = handKeydown;

function InfoScript(ancora, repre, tipo_programa) {
    if (!ancora) { ancora = ""; }
    tipo_programa = tipo_programa || '';
    var titulo = "";

    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";

    if (tipo_programa != 'M') {
        strHelpOptions += ",scrollbars=no";
        strHelpOptions += ",resize=yes";
        programa = "scri_principal.php";
    } else {
        strHelpOptions += ",scrollbars=yes";
        strHelpOptions += ",resizable=1";
        programa = "busca_script_geral.php";
        titulo = "&titulo=IntergrALL - Contact Center - InformaÁıes / Ajuda";
    }

    strHelpOptions += ",top=";
    strHelpOptions += 1;
    strHelpOptions += ",left=";
    strHelpOptions += 1;
    strHelpOptions += ",width=760";
    strHelpOptions += ",height=500";

    Janela = window.open(programa + '?repre=' + repre + '&script_nivel=' + ancora + titulo, ancora, strHelpOptions);
    Janela.focus();
}

function InfoScriptCampanha(ancora, repre, campanha, sistema, tipo_programa) {
    if (!ancora) { ancora = ""; }
    tipo_programa = tipo_programa || '';
    var titulo = "";

    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";

    if (tipo_programa != 'M') {
        strHelpOptions += ",scrollbars=no";
        strHelpOptions += ",resize=yes";
        programa = "scri_principal.php";
    } else {
        strHelpOptions += ",scrollbars=yes";
        strHelpOptions += ",resizable=1";
        programa = "busca_script_geral.php";
        titulo = "&titulo=IntergrALL - Contact Center - InformaÁıes / Ajuda";
    }

    strHelpOptions += ",top=";
    strHelpOptions += 1;
    strHelpOptions += ",left=";
    strHelpOptions += 1;
    strHelpOptions += ",width=760";
    strHelpOptions += ",height=500";

    Janela = window.open(programa + '?sistema=' + sistema + '&campanha=' + campanha + '&repre=' + repre + '&script_nivel=' + ancora + titulo, ancora, strHelpOptions);
    Janela.focus();
}

//Menu de Ajuda
function InfoScriptButton(repre, nivel_escolha, subnivel_escolha) {
    if (!nivel_escolha) { nivel_escolha = ""; }
    if (!subnivel_escolha) { subnivel_escolha = ""; }
    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=no";
    strHelpOptions += ",resize=yes";
    strHelpOptions += ",top=";
    strHelpOptions += 1;
    strHelpOptions += ",left=";
    strHelpOptions += 1;
    strHelpOptions += ",width=760";
    strHelpOptions += ",height=500";

    Janela = window.open('scri_principal.php?repre=' + repre + '&nivel_escolha=' + nivel_escolha + '&subnivel_escolha=' + subnivel_escolha, nivel_escolha, strHelpOptions);
    Janela.focus();
}

function substr_count(str, substr) {
    cont = 0;
    while (str.indexOf(substr) >= 0) {
        cont++;
        str = str.substring(str.indexOf(substr) + substr.length, str.length);
    }
    return cont;
}

function cc_logout(strlocation) {
    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=no";
    strHelpOptions += ",top=";
    strHelpOptions += (0);
    strHelpOptions += ",left=";
    strHelpOptions += (0);
    strHelpOptions += ",width=1";
    strHelpOptions += ",height=1";
    JanelaLogout = window.open('cc_logout.php', 'JanelaLogout', strHelpOptions);
    JanelaLogout.focus();
    JanelaLogout.close();
    window.location = strlocation;
}

function handKeydown(e) {
    var campo;
    if (document.all)
        campo = window.event.srcElement;
    else
        campo = e.target;
    if (campo.name) {
        prevlength = campo.value.length;
        prevname = campo.name;
    }
}

function handKeyup(e) {
    var campo;
    if (document.all)
        campo = window.event.srcElement;
    else
        campo = e.target;
}

function abreJanelaCale(url, name, width, height) {
    splashWin = window.open(url, name, "fullscreen=1,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,width=1,resizable=0");
    splashWin.moveTo(width, height - 12);
    splashWin.focus();
}

function VisualizarTabela(num_seq, tabela, nome_campo, bd, servidor_deonde, ip_deonde, diretorio_deonde) {
    endereco = 'cc_mostra_tabela.php?num_seq=' + num_seq + '&tabela=' + tabela + '&nome_campo=' + nome_campo + '&bd=' + bd + '&servidor_deonde=' + servidor_deonde + '&ip_deonde=' + ip_deonde + '&diretorio_deonde=' + diretorio_deonde;
    AbreJanela(endereco, 'VERTABELA', '700', '500');
}

function retornaRegiao(uf) {
    if (uf == "ES" || uf == "MG" || uf == "RJ" || uf == "SP") {
        //SUDESTE
        regiao = "SE";
    } else if (uf == "DF" || uf == "GO" || uf == "MS" || uf == "MT") {
        //CENTRO-OESTE
        regiao = "CO";
    } else if (uf == "AL" || uf == "BA" || uf == "CE" || uf == "MA" || uf == "PB" || uf == "PE" || uf == "PI" || uf == "RN" || uf == "SE") {
        //NORDESTE
        regiao = "NE";
    } else if (uf == "AC" || uf == "AM" || uf == "AP" || uf == "PA" || uf == "RO" || uf == "RR" || uf == "TO") {
        //NORTE
        regiao = "NO";
    } else if (uf == "PR" || uf == "RS" || uf == "SC") {
        //SUL
        regiao = "SU";
    } else {
        //ERRO
        regiao = "ZZ";
    }
    return regiao;
}

function ContaStr(Str, buscar) {
    pos = 0;
    cont = 0;
    while ((Str.indexOf(buscar, pos) >= 0)) {
        cont++;
        pos = Str.indexOf(',', pos) + 1;
    }
    return cont;
}

function ParaLiga(tipo) {
    if (tipo == 'parar') {
        if (!confirm('Deseja parar de receber ligaÁ„o?')) {
            return false;
        }
    }

    if (tipo == 'parar_pa') {
        tipo = 'parar';
    }
    strHelpOptions = 'top=1,left=1,width=2,height=2';
    wDacSuspende = window.open('cc_cabecalho_dac.php?tipo=' + tipo, 'wSuspende', strHelpOptions);
}

//vers„o mais nova da ParaligaDiscador
function ParaLigaDisc(tipo) {
    passou = false;
    if (tipo == 'parar') {
        passou = true;
    } else {
        if (tipo == 'parar') {
            if (confirm('Deseja Sair do atendimento?')) {
                passou = true;
            }
        } else {
            passou = true;
        }
    }
    if (passou) {
        strHelpOptions = 'top=1,left=1,width=2,height=2, status=yes';
        wDacSuspende = window.open('dk_msg_dac.php?tipo=' + tipo, 'wSuspende', strHelpOptions);
    }
}

function ParaLigaDiscador(tipo, grupo) {
    passou = false;
    if (tipo == 'parar') {
        passou = true;
    } else {
        if (tipo == 'parar') {
            if (confirm('Deseja Sair do atendimento?')) {
                passou = true;
            }
        } else {
            passou = true;
        }
    }
    if (passou) {
        strHelpOptions = 'top=1,left=1,width=2,height=2, status=yes';
        wDacSuspende = window.open('cc_msg_dac_discador.php?grupo=' + grupo + '&tipo=' + tipo, 'wSuspende', strHelpOptions);
    }
}

function ParaLiga_CSU_TVA(tipo) {
    passou = false;
    if (tipo == 'parar') {
        //if (confirm('Deseja parar de receber ligaÁ„o?')) {
        passou = true;
        //}
    } else {
        if (tipo == 'parar') {
            if (confirm('Deseja Sair do atendimento?')) {
                passou = true;
            }
        } else {
            passou = true;
        }
    }
    if (passou) {
        strHelpOptions = 'top=1,left=1,width=2,height=2, status=yes';
        wDacSuspende = window.open('tele_tva_adim_discador.php?tipo=' + tipo, 'wSuspende', strHelpOptions);
    }
}

function ParaLiga_CSU_STD(tipo) {
    passou = false;
    if (tipo == 'parar') {
        //if (confirm('Deseja parar de receber ligaÁ„o?')) {
        passou = true;
        //}
    } else {
        if (tipo == 'parar') {
            if (confirm('Deseja Sair do atendimento?')) {
                passou = true;
            }
        } else {
            passou = true;
        }
    }
    if (passou) {
        strHelpOptions = 'top=1,left=1,width=2,height=2, status=yes';
        wDacSuspende = window.open('mkt_std_adim_discador.php?tipo=' + tipo, 'wSuspende', strHelpOptions);
    }
}

function MostraGrafico(form) {
    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=yes";
    strHelpOptions += ",top=";
    strHelpOptions += (0);
    strHelpOptions += ",left=";
    strHelpOptions += (0);
    strHelpOptions += ",width=700";
    strHelpOptions += ",height=500";
    JanelaGrafico = window.open('cc_graficos.php', 'JanelaGrafico', strHelpOptions);
    JanelaGrafico.focus();
    form.submit();
}

function isnumber(num) {
    var num = new String(num);
    numeros = "0123456789";
    for (x = 0; x <= num.length - 1; x++) {
        if (numeros.indexOf(num.charAt(x)) == -1) {
            return false;
        }
    }
    return true;
}

function AchaCepCep(obj, tipo) {
    cep = obj.value;
    if (cep == '' || cep.length != 8) {
        alert('Preencha corretamente o numero do CEP.');
        obj.focus();
    } else {
        strHelpOptions = "location=no";
        strHelpOptions += ",toolbar=no";
        strHelpOptions += ",titlebar=no";
        strHelpOptions += ",menubar=no";
        strHelpOptions += ",status=yes";
        strHelpOptions += ",scrollbars=yes";
        strHelpOptions += ",top=";
        strHelpOptions += 1;
        strHelpOptions += ",left=";
        strHelpOptions += 1;
        strHelpOptions += ",width=300";
        strHelpOptions += ",height=150";
        InfoProdutoCEP = window.open('cc_consulta_cep_cep.php?tipo=' + tipo + '&cep=' + cep, 'InfoProdutoCEP', strHelpOptions);
        //InfoProdutoCEP.focus();
    }
}

function lib_completa_string(strings, qtd, valor, lado) {
    while (strings.length < qtd) {
        if (lado == "D") {
            strings = strings + "" + valor;
        } else {
            strings = valor + "" + strings;
        }
    }
    return strings;
}

function maiusculo(texto) {
    texto = texto.toUpperCase();
}

function AgenciaPan(nro, tipo) {

    var cod_banco;
    var cod_agencia;
    var dig_agencia;

    if (tipo == '1') { // Programa: cc_cad_prop_cp_rec_2.php  ------------------
        cod_banco = document.propostacons["out_conta_banco_" + nro].value;
        cod_agencia = document.propostacons["out_conta_agencia_" + nro].value;
        dig_agencia = document.propostacons["out_conta_dig_agencia_" + nro].value;
    }

    if (tipo == '2') { // Programa: cc_cad_prop_cp_rec_4.php  ---------------
        cod_banco = document.cp.nrobanco.value;
        cod_agencia = document.cp.agencia.value;
        dig_agencia = document.cp.agencia_dv.value;
    }

    if (tipo == '3') { // Programa: cc_cad_prop_cp_rec_simulacao.php  ---------------
        cod_banco = document.simulacao["gv_banco_" + nro].value;
        cod_agencia = document.simulacao["gv_agencia_" + nro].value;
        dig_agencia = document.simulacao["gv_dig_agencia_" + nro].value;
    }

    if (tipo == '5') { // Programa: dk_cad_prop_2_dados_vda_padrao.php (ACE)  ---------------
        cod_banco = document.getElementById("id_banco").value;
        cod_agencia = document.getElementById("id_agencia").value;
        dig_agencia = document.getElementById("id_dvagencia").value;
    }


    if (cod_banco == '') {
        alert('VocÍ deve selecionar um banco!!!');
    } else {
        strHelpOptions = "location=no";
        strHelpOptions += ",toolbar=no";
        strHelpOptions += ",titlebar=no";
        strHelpOptions += ",menubar=no";
        strHelpOptions += ",status=no";
        strHelpOptions += ",scrollbars=yes";
        strHelpOptions += ",top=";
        strHelpOptions += 1;
        strHelpOptions += ",left=";
        strHelpOptions += 1;
        strHelpOptions += ",width=720";
        strHelpOptions += ",height=450";
        AgenciaPanamericano = window.open('cp_cad_prop_agencia.php?nro=' + nro + '&tipo=' + tipo + '&cod_banco=' + cod_banco + '&cod_agencia=' + cod_agencia + '&dig_agencia=' + dig_agencia, 'AgenciaPanamericano', strHelpOptions);
        AgenciaPanamericano.focus();
    }
}

function consist_uf_ddd(ddd, uf) {
    //consistindo a UF
    if (uf.length != 2) {
        alert("Preencha uma UF v·lida.");
        return false;
    }
    //consistindo o DDD
    if (ddd.length < 2) {
        alert("Preencha um DDD v·lido.");
        return false;
    }
    if (ddd.length == 2) { ddd = "0" + ddd; }
    if (ddd.length != 3) {
        alert("Preencha um DDD v·lido.");
        return false;
    }
    // inicia a comparaÁ„o
    if (uf == "AC") {
        if (ddd == "068") { return true; } else { return false; }
    }
    if (uf == "AL") {
        if (ddd == "082") { return true; } else { return false; }
    }
    if (uf == "AP") {
        if (ddd == "096") { return true; } else { return false; }
    }
    if (uf == "AM") {
        if (ddd == "092" || ddd == "097") { return true; } else { return false; }
    }
    if (uf == "BA") {
        if (ddd == "071" || ddd == "073" || ddd == "074" || ddd == "075" || ddd == "077") { return true; } else { return false; }
    }
    if (uf == "CE") {
        if (ddd == "085" || ddd == "088") { return true; } else { return false; }
    }
    if (uf == "DF") {
        if (ddd == "061") { return true; } else { return false; }
    }
    if (uf == "ES") {
        if (ddd == "027" || ddd == "028") { return true; } else { return false; }
    }
    if (uf == "GO") {
        if (ddd == "061" || ddd == "062" || ddd == "064") { return true; } else { return false; }
    }
    if (uf == "MA") {
        if (ddd == "098" || ddd == "099") { return true; } else { return false; }
    }
    if (uf == "MT") {
        if (ddd == "064" || ddd == "065" || ddd == "066") { return true; } else { return false; }
    }
    if (uf == "MS") {
        if (ddd == "067") { return true; } else { return false; }
    }
    if (uf == "MG") {
        if (ddd == "031" || ddd == "032" || ddd == "033" || ddd == "034" || ddd == "035" || ddd == "037" || ddd == "038") { return true; } else { return false; }
    }
    if (uf == "PA") {
        if (ddd == "091" || ddd == "093" || ddd == "094") { return true; } else { return false; }
    }
    if (uf == "PB") {
        if (ddd == "083") { return true; } else { return false; }
    }
    if (uf == "PR") {
        if (ddd == "041" || ddd == "042" || ddd == "043" || ddd == "044" || ddd == "045" || ddd == "046") { return true; } else { return false; }
    }
    if (uf == "PE") {
        if (ddd == "081" || ddd == "087") { return true; } else { return false; }
    }
    if (uf == "PI") {
        if (ddd == "086" || ddd == "089") { return true; } else { return false; }
    }
    if (uf == "RJ") {
        if (ddd == "021" || ddd == "022" || ddd == "024") { return true; } else { return false; }
    }
    if (uf == "RN") {
        if (ddd == "084") { return true; } else { return false; }
    }
    if (uf == "RS") {
        if (ddd == "051" || ddd == "053" || ddd == "054" || ddd == "055") { return true; } else { return false; }
    }
    if (uf == "RO") {
        if (ddd == "069") { return true; } else { return false; }
    }
    if (uf == "RR") {
        if (ddd == "095") { return true; } else { return false; }
    }
    if (uf == "SC") {
        if (ddd == "042" || ddd == "043" || ddd == "047" || ddd == "048" || ddd == "049") { return true; } else { return false; }
    }
    if (uf == "SP") {
        if (ddd == "011" || ddd == "012" || ddd == "013" || ddd == "014" || ddd == "015" || ddd == "016" || ddd == "017" || ddd == "018" || ddd == "019") { return true; } else { return false; }
    }
    if (uf == "SE") {
        if (ddd == "079") { return true; } else { return false; }
    }
    if (uf == "TO") {
        if (ddd == "063") { return true; } else { return false; }
    }
}

var now = new Date();
var mName = now.getMonth() + 1;
if (mName == 1) mName = "Janeiro";
if (mName == 2) mName = "Fevereiro";
if (mName == 3) mName = "MarÁo";
if (mName == 4) mName = "Abril";
if (mName == 5) mName = "Maio";
if (mName == 6) mName = "Junho";
if (mName == 7) mName = "Julho";
if (mName == 8) mName = "Agosto";
if (mName == 9) mName = "Setembro";
if (mName == 10) mName = "Outubro";
if (mName == 11) mName = "Novembro";
if (mName == 12) mName = "Dezembro";
var dName = now.getDay() + 1;
var dayNr = now.getDate();
var yearNr = now.getYear();
if (dName == 1) Day = "Domingo";
if (dName == 2) Day = "Segunda";
if (dName == 3) Day = "TerÁa";
if (dName == 4) Day = "Quarta";
if (dName == 5) Day = "Quinta";
if (dName == 6) Day = "Sexta";
if (dName == 7) Day = "S·bado";
if (yearNr < 2000) Year = 1900 + yearNr;
else Year = yearNr;
// String to display current date.
var todaysDate = (" " + Day + ", " + dayNr + " de " + mName + " de " + Year);
self.status = todaysDate;

// Acerta a consistencia no cadastro de produtos para os campos especiais do Ba˙
function AcertaConsistenciaProdutoBau(form_passa) {
    if (form_passa.empresa.value == 'BAU') {
        form_passa.cod_prod_cliente.consistencia = 'sempre';
        form_passa.cod_prod_cliente.consistencia1 = 'pre';
        form_passa.cod_prod_cliente.consistencia2 = 9;
        form_passa.cod_prod_cliente.consistencia3 = 'numeros';
        form_passa.cod_prod_cliente.msg = 'Digite corretamente o CÛdigo do Produto no Cliente. Somente n˙meros s„o permitidos';
        if (maiusculo(form_passa.nome.value) == 'CARN  DO BA⁄') {
            form_passa.cor_carne.consistencia = 'sempre';
            form_passa.cor_carne.consistencia1 = 'pre';
            form_passa.cor_carne.msg = 'Selecione uma Cor para o CarnÍ';
        }
        form_passa.prod_volume.consistencia = 'sempre';
        form_passa.prod_volume.consistencia1 = 'pre';
        form_passa.prod_volume.msg = 'Selecione o Volume do Produto';
        form_passa.prod_peso.consistencia = 'sopreenchido';
        form_passa.prod_peso.consistencia1 = 'numeros';
        form_passa.prod_peso.msg = 'Digite corretamente o Peso do Produto (somente o valor numÈrico)';
        form_passa.prod_qtde_parc.consistencia = 'sempre';
        form_passa.prod_qtde_parc.consistencia1 = 'pre';
        form_passa.prod_qtde_parc.consistencia2 = 'numeros';
        form_passa.prod_qtde_parc.msg = 'Digite corretamente a quantidade de parcelas (somente n˙meros)';
        form_passa.prod_cod_parc.consistencia = 'sempre';
        form_passa.prod_cod_parc.consistencia1 = 'pre';
        form_passa.prod_cod_parc.msg = 'Selecione uma forma de Pagamento';
        form_passa.frete_rg1.consistencia = 'sempre';
        form_passa.frete_rg1.consistencia1 = 'pre';
        form_passa.frete_rg1.consistencia2 = 'preco';
        form_passa.frete_rg1.msg = 'Digite corretamento o valor do Frete para a regi„o 1. Use o Formato 999.99';
        form_passa.frete_rg2.consistencia = 'sempre';
        form_passa.frete_rg2.consistencia1 = 'pre';
        form_passa.frete_rg2.consistencia2 = 'preco';
        form_passa.frete_rg2.msg = 'Digite corretamento o valor do Frete para a regi„o 2. Use o Formato 999.99';
        form_passa.frete_rg3.consistencia = 'sempre';
        form_passa.frete_rg3.consistencia1 = 'pre';
        form_passa.frete_rg3.consistencia2 = 'preco';
        form_passa.frete_rg3.msg = 'Digite corretamento o valor do Frete para a regi„o 3. Use o Formato 999.99';
        form_passa.frete_rg4.consistencia = 'sempre';
        form_passa.frete_rg4.consistencia1 = 'pre';
        form_passa.frete_rg4.consistencia2 = 'preco';
        form_passa.frete_rg4.msg = 'Digite corretamento o valor do Frete para a regi„o 4. Use o Formato 999.99';
        form_passa.frete_rg5.consistencia = 'sempre';
        form_passa.frete_rg5.consistencia1 = 'pre';
        form_passa.frete_rg5.consistencia2 = 'preco';
        form_passa.frete_rg5.msg = 'Digite corretamento o valor do Frete para a regi„o 5. Use o Formato 999.99';
        form_passa.frete_rg6.consistencia = 'sempre';
        form_passa.frete_rg6.consistencia1 = 'pre';
        form_passa.frete_rg6.consistencia2 = 'preco';
        form_passa.frete_rg6.msg = 'Digite corretamento o valor do Frete para a regi„o 6. Use o Formato 999.99';
        form_passa.frete_rg7.consistencia = 'sempre';
        form_passa.frete_rg7.consistencia1 = 'pre';
        form_passa.frete_rg7.consistencia2 = 'preco';
        form_passa.frete_rg7.msg = 'Digite corretamento o valor do Frete para a regi„o 7. Use o Formato 999.99';
        form_passa.frete_rg8.consistencia = 'sempre';
        form_passa.frete_rg8.consistencia1 = 'pre';
        form_passa.frete_rg8.consistencia2 = 'preco';
        form_passa.frete_rg8.msg = 'Digite corretamento o valor do Frete para a regi„o 8. Use o Formato 999.99';
    }
}

function replaceString(oldS, newS, fullS) {
    // Replaces oldS with newS in the string fullS
    for (var i = 0; i < fullS.length; i++) {
        if (fullS.substring(i, i + oldS.length) == oldS) {
            fullS = fullS.substring(0, i) + newS + fullS.substring(i + oldS.length, fullS.length)
        }
    }
    return fullS
}

function formata(form, separador, numero) {
    if (form.value.length == numero) {
        form.value += separador;
    }
}

function formvalores(form) {
    form.value = form.value / 100;
}

function formdinheiro(string) {

    string = string.substring((string.length - 8), 1) + "." + string.substring((string.length - 5), 4) + "," + string.substring((string.length - 2), string.length);

    return string;
}
/**
 * DescriÁ„o: Suprime todos os espaÁos em branco (equivalente ao TRIM do VB)
 */
function Trim(texto) {
    return texto.replace(/\s+/g, "");
}
/**
 * DescriÁ„o: Suprime os espaÁos em branco ‡ esquerda da string
 */
function LTrim(texto) {
    return texto.replace(/^\s+|$/g, "");
}
/**
 * DescriÁ„o: Suprime os espaÁos em branco ‡ direita da string
 */
function RTrim(texto) {
    return texto.replace(/^|\s+$/g, "");
}
/**
 * Suprime os espaÁos em branco ‡ direita e ‡ esquerda da string (equivalente ao TRIM do PHP)
 */
function JTrim(texto) {
    return texto.replace(/^\s+|\s+$/g, "");
}

function AbreJanelaFlex(endereco, nomejanela, width, height) {
    strHelpOptions = "location=no";
    strHelpOptions += ",resizable=1";
    strHelpOptions += ",top=";
    strHelpOptions += 0;
    strHelpOptions += ",left=";
    strHelpOptions += 0;
    strHelpOptions += ",width=" + width;
    strHelpOptions += ",height=" + height;
    Janela = window.open(endereco, nomejanela, strHelpOptions);
    Janela.focus();
}

function AbreJanela() {
    if (AbreJanela.arguments.length == 4) {
        //endereco, nomejanela, width, height
        var endereco = AbreJanela.arguments[0];
        var nomejanela = AbreJanela.arguments[1];
        var width = AbreJanela.arguments[2];
        var height = AbreJanela.arguments[3];
        var posicao = "CC";

    } else if (AbreJanela.arguments.length == 5) {
        //endereco, nomejanela, width, height, posicao
        var endereco = AbreJanela.arguments[0];
        var nomejanela = AbreJanela.arguments[1];
        var width = AbreJanela.arguments[2];
        var height = AbreJanela.arguments[3];
        var posicao = AbreJanela.arguments[4];

    }

    //IDENTIFICANDO SE OS PARAMETROS DE ALTURA OU LARGURA FORAM INSERIDOS COMO PIXEL OU PERCENTUAL
    if ((width.toString()).indexOf("%") > 0) {
        width = Math.round((parseInt(width.substring(0, (parseInt(width.length, 10) - 1))) / 100) * screen.availWidth);

    } else {
        if (width > screen.availWidth) {
            width = screen.availWidth - 10;
        } else if (width < 20) {
            width = 20;
        }
    }

    if ((height.toString()).indexOf("%") > 0) {
        height = Math.round((parseInt(height.substring(0, (parseInt(height.length, 10) - 1))) / 100) * screen.availHeight);

    } else {
        if (height > screen.availHeight) {
            height = screen.availHeight - 50;
        } else if (height < 20) {
            height = 20;
        }
    }

    if (endereco.toLowerCase() != "about:blank") {
        if (endereco.indexOf("tipo_popup=AJ") == -1) {
            if (endereco.indexOf("?") == -1) {
                endereco += "?tipo_popup=AJ";
            } else {
                endereco += "&tipo_popup=AJ";
            }
        }
    }

    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=yes";
    strHelpOptions += ",resizable=1";
    strHelpOptions += ",top=";
    strHelpOptions += getPosY(posicao, height);
    strHelpOptions += ",left=";
    strHelpOptions += getPosX(posicao, width);
    strHelpOptions += ",width=" + width;
    strHelpOptions += ",height=" + height;
    Janela = window.open(endereco, nomejanela, strHelpOptions);
    Janela.focus();
}

function AbreJanela2() {
    if (AbreJanela2.arguments.length == 5) {
        //endereco, nomejanela, width, height, titulo
        var endereco = AbreJanela2.arguments[0];
        var nomejanela = AbreJanela2.arguments[1];
        var width = AbreJanela2.arguments[2];
        var height = AbreJanela2.arguments[3];
        var titulo = AbreJanela2.arguments[4];
        var posicao = "CC";
    } else if (AbreJanela2.arguments.length == 6) {
        //endereco, nomejanela, width, height, titulo, posicao
        var endereco = AbreJanela2.arguments[0];
        var nomejanela = AbreJanela2.arguments[1];
        var width = AbreJanela2.arguments[2];
        var height = AbreJanela2.arguments[3];
        var titulo = AbreJanela2.arguments[4];
        var posicao = AbreJanela2.arguments[5];
    }

    if (width == "max" && height == "max") {

        width = 11;
        height = 11;

    } else {
        //IDENTIFICANDO SE OS PARAMETROS DE ALTURA OU LARGURA FORAM INSERIDOS COMO PIXEL OU PERCENTUAL
        if ((width.toString()).indexOf("%") > 0) {
            width = Math.round((parseInt(width.substring(0, (parseInt(width.length, 10) - 1))) / 100) * screen.availWidth);

        } else {
            if (width > screen.availWidth) {
                width = screen.availWidth - 10;
            } else if (width < 20) {
                width = 20;
            }
        }

        if ((height.toString()).indexOf("%") > 0) {
            height = Math.round((parseInt(height.substring(0, (parseInt(height.length, 10) - 1))) / 100) * screen.availHeight);

        } else {
            if (height > screen.availHeight) {
                height = screen.availHeight - 50;
            } else if (height < 20) {
                height = 20;
            }
        }
    }

    if (endereco.toLowerCase() != "about:blank") {
        if (endereco.indexOf("tipo_popup=AJ2") == -1) {
            if (endereco.indexOf("?") == -1) {
                endereco += "?tipo_popup=AJ2";
            } else {
                endereco += "&tipo_popup=AJ2";
            }
        }
    }

    // var width  = screen.width;
    // var height = screen.availHeight;

    strHelpOptions = "location=no";
    strHelpOptions += ",resizable=1";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=no";
    strHelpOptions += ",top=";
    strHelpOptions += getPosY(posicao, height);
    strHelpOptions += ",left=";
    strHelpOptions += getPosX(posicao, width);
    strHelpOptions += ",width=" + width;
    strHelpOptions += ",height=" + height;

    var len = window.location.host.length;

    if (endereco.substring(0, (8 + len)).toLowerCase() == 'http://' + window.location.host.toLowerCase() + '/') {
        var pgm = 'http://' + window.location.host.toLowerCase() + '/callcenter/popup.php';
    } else {
        var pgm = '/callcenter/popup.php';
    }

    Janela = window.open(pgm + '?programa=' + escape(endereco + '&titulo=' + titulo) + '&titulo=' + titulo, nomejanela, strHelpOptions);

    if (width == 11 && height == 11) {
        Janela.moveTo(0, 0);
        Janela.resizeTo(screen.width, screen.availHeight)
    }

    Janela.focus();
}

function AbreJanelaTelefonica(endereco, nomejanela, width, height) {
    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=yes";
    strHelpOptions += ",resizable=1";
    strHelpOptions += ",top=";
    strHelpOptions += 75;
    strHelpOptions += ",left=";
    strHelpOptions += 0;
    strHelpOptions += ",width=" + width;
    strHelpOptions += ",height=" + height;
    Janela = window.open(endereco, nomejanela, strHelpOptions);
    Janela.focus();
}

/*Teste Octavio*/
function MostraLayer(camada) {
    var sDiv = document.getElementById(camada);
    if (sDiv.style.visibility == 'hidden') {
        sDiv.style.visibility = 'visible';
    } else {
        sDiv.style.visibility = 'hidden';
    }
}
/*Teste Octavio*/

function MostraHistoricoCACCP(cpf, cod_cliente) {
    AbreJanela2('cc_hist_cp.php?cpf_cnpj=' + cpf + '&cod_cliente=' + cod_cliente, 'HistoCliente', 680, 420, 'HistÛrico de Atendimentos');
}

function InfoProd(produto, regra, prazo) {
    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=yes";
    strHelpOptions += ",top=";
    strHelpOptions += (screen.availHeight / 2) - (350 / 2);
    strHelpOptions += ",left=";
    strHelpOptions += ((screen.availWidth / 2) - (600 / 2));
    strHelpOptions += ",width=740";
    strHelpOptions += ",height=450";
    InfoProduto = window.open('cc_infoprod.php?produto=' + produto + '&regra=' + regra + '&empresa=PANAMERICANO', 'InfoProduto', strHelpOptions);
    InfoProduto.focus();
}

function InfoCartaoCred(logo, pct) {
    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=yes";
    strHelpOptions += ",top=1";
    strHelpOptions += ",left=1";
    strHelpOptions += ",width=740";
    strHelpOptions += ",height=450";
    InfoProduto = window.open('cc_infolibcartaocred.php?logo=' + logo + '&pct=' + pct, 'InfoCartaoCred', strHelpOptions);
    InfoProduto.focus();
}

function InfoFreq(localidade) {
    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=yes";
    strHelpOptions += ",top=";
    strHelpOptions += (screen.availHeight / 2) - (350 / 2);
    strHelpOptions += ",left=";
    strHelpOptions += ((screen.availWidth / 2) - (600 / 2));
    strHelpOptions += ",width=600";
    strHelpOptions += ",height=350";
    InfoFrequencia = window.open('cc_manutencao_frequencia_info.php?localidade=' + localidade, 'InfoFrequencia', strHelpOptions);
    InfoFrequencia.focus();
}

function InfoProdBau(produto, regra, prazo, estado, localidade) {
    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=yes";
    strHelpOptions += ",top=";
    strHelpOptions += 1;
    strHelpOptions += ",left=";
    strHelpOptions += 1;
    strHelpOptions += ",width=720";
    strHelpOptions += ",height=450";
    InfoProdutoBau = window.open('cc_infoprodbau.php?codproduto=' + produto + '&regra=' + regra + '&prazo=' + prazo + '&empresa=BAU&estado=' + estado + '&localidade=' + localidade, 'InfoProdutoBau', strHelpOptions);
    InfoProdutoBau.focus();
}

function InfoProdSbt(produto, renda, natocup, cep, retiracheque) {
    if (isNaN(cep) || cep.length < 8) {
        cep = "";
    }
    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=yes";
    strHelpOptions += ",top=";
    strHelpOptions += 1;
    strHelpOptions += ",left=";
    strHelpOptions += 1;
    strHelpOptions += ",width=720";
    strHelpOptions += ",height=450";
    InfoProdutoBau = window.open('cc_infoprod_sbtfin.php?codproduto=' + produto + '&renda=' + renda + '&nat_ocup=' + natocup + '&cep=' + cep + '&retiracheque=' + retiracheque, 'InfoProdutoSbt', strHelpOptions);
    InfoProdutoBau.focus();
}

function InfoProdLag(produto, renda, natocup, cep, retiracheque) {
    if (isNaN(cep) || cep.length < 8) {
        cep = "";
    }
    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=yes";
    strHelpOptions += ",top=";
    strHelpOptions += 1;
    strHelpOptions += ",left=";
    strHelpOptions += 1;
    strHelpOptions += ",width=720";
    strHelpOptions += ",height=450";
    InfoProdutoBau = window.open('cc_infoprod_lag.php?codproduto=' + produto + '&renda=' + renda + '&nat_ocup=' + natocup + '&cep=' + cep + '&retiracheque=' + retiracheque, 'InfoProdutoSbt', strHelpOptions);
    InfoProdutoBau.focus();
}

function InfoVenda(ancora) {
    if (!ancora) { ancora = ""; }
    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=yes";
    strHelpOptions += ",top=";
    strHelpOptions += (screen.availHeight / 2) - (450 / 2);
    strHelpOptions += ",left=";
    strHelpOptions += ((screen.availWidth / 2) - (800 / 2));
    strHelpOptions += ",width=720";
    strHelpOptions += ",height=450";

    Janela = window.open('cc_infovenda.php?script_nivel=' + ancora, ancora, strHelpOptions);
    Janela.focus();
}

function InfoVendaBau() {
    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=yes";
    strHelpOptions += ",top=";
    strHelpOptions += (screen.availHeight / 2) - (450 / 2);
    strHelpOptions += ",left=";
    strHelpOptions += ((screen.availWidth / 2) - (800 / 2));
    strHelpOptions += ",width=720";
    strHelpOptions += ",height=450";
    InfoVendasSbt = window.open('cc_infovenda_bau.php', 'InfoVendasSbt', strHelpOptions);
    InfoVendasSbt.focus();
}

function InfoVendaCons(ancora) {
    if (!ancora) { ancora = ""; }
    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=yes";
    strHelpOptions += ",top=";
    strHelpOptions += (screen.availHeight / 2) - (450 / 2);
    strHelpOptions += ",left=";
    strHelpOptions += ((screen.availWidth / 2) - (800 / 2));
    strHelpOptions += ",width=720";
    strHelpOptions += ",height=450";
    InfoVendasSbt = window.open('cc_infovenda_cons.php' + ancora, 'InfoVendasSbt', strHelpOptions);
    InfoVendasSbt.focus();
}

function InfoVendaFin() {
    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=yes";
    strHelpOptions += ",top=";
    strHelpOptions += (screen.availHeight / 2) - (450 / 2);
    strHelpOptions += ",left=";
    strHelpOptions += ((screen.availWidth / 2) - (800 / 2));
    strHelpOptions += ",width=720";
    strHelpOptions += ",height=450";
    InfoVendasSbt = window.open('cc_infovenda_fin.php', 'InfoVendasSbt', strHelpOptions);
    InfoVendasSbt.focus();
}

function popup(url, name) {
    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=yes";
    strHelpOptions += ",top=";
    strHelpOptions += (screen.availHeight / 2) - (450 / 2);
    strHelpOptions += ",left=";
    strHelpOptions += ((screen.availWidth / 2) - (720 / 2));
    strHelpOptions += ",width=720";
    strHelpOptions += ",height=450";
    popuped = window.open(url, name, strHelpOptions);
    popuped.focus();
}

function popup_script() {
    if (popup_script.arguments.length == 2) {
        //url, name
        var url = popup_script.arguments[0];
        var name = popup_script.arguments[1];
        var posicao = "TL";
        var width = "760";
        var height = "500";
    } else if (popup_script.arguments.length == 5) {
        //url, name, posicao, width, height
        var url = popup_script.arguments[0];
        var name = popup_script.arguments[1];
        var posicao = popup_script.arguments[2];
        var width = popup_script.arguments[3];
        var height = popup_script.arguments[4];
    }

    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=no";
    strHelpOptions += ",resize=yes";
    strHelpOptions += ",top=";
    strHelpOptions += getPosY(posicao, height);
    strHelpOptions += ",left=";
    strHelpOptions += getPosX(posicao, width);
    strHelpOptions += ",width=" + width;
    strHelpOptions += ",height=" + height;
    popuped = window.open(url, name, strHelpOptions);
    popuped.focus();
}

function consulta_cpf_cnpj(pessoa, doc) {
    strHelpOptions = "location=no";
    strHelpOptions += ",toolbar=no";
    strHelpOptions += ",titlebar=no";
    strHelpOptions += ",menubar=no";
    strHelpOptions += ",status=no";
    strHelpOptions += ",scrollbars=yes";
    strHelpOptions += ",top=";
    strHelpOptions += (screen.availHeight / 2) - (420 / 2);
    strHelpOptions += ",left=";
    strHelpOptions += ((screen.availWidth / 2) - (600 / 2));
    strHelpOptions += ",width=600";
    strHelpOptions += ",height=420";
    if (pessoa == "F") {
        cons_cpf_cnpj = window.open('http://www.receita.fazenda.gov.br/Aplicacoes/ATCTA/CPF/ConsultaPublica.asp?CPF=' + doc + '&indAutoatend=0', 'cons_cpf_cnpj', strHelpOptions);
    } else {
        cons_cpf_cnpj = window.open('http://www.receita.fazenda.gov.br/Aplicacoes/ATCTA/CPF/ConsultaPublica.asp?CNPJ=' + doc, 'cons_cpf_cnpj', strHelpOptions);
    }

    cons_cpf_cnpj.focus();
}

function mClk(destino) {
    window.location = destino
}

function enviar(myform) {
    if (checa(myform) == true) {
        myform.submit();
    } else {
        return false;
    }
}

function pula(obj, nl, alvo) {
    //significa que È telefone, foi alterado para 9 digitos mas tem que pular quando tiver 9 se o numero comeÁar com 9
    //david
    if (obj.getAttribute("maxLength") == "9" && nl == 8) {
        if (obj.value.substring(0, 1) == "9") {
            nl = 9;
        }
    }
    if (obj.value.length >= nl) {
        alvo.focus();
    }
}

function tamanho(texto, tamanho, msg) {
    if (texto.length < tamanho) {
        if (!(typeof VESAO_INTERGRALL != 'undefined') || (typeof PASSOU_CHECA != 'undefined' && PASSOU_CHECA == true)) {
            alert(msg);
        }
        return false;
    } else {
        return true;
    }
}

function preenchido(texto, msg) {
    if (texto.value == "") {
        alert(msg);
        return false;
    } else {
        return true;
    }
}

function getExpReg(tipo) {
    if (tipo == null) {
        return false;
    }

    // TIPOS DE DADOS (Cadastrar a classe ADCST caso incluir um tipo novo)
    var regexList = {
        'hora': /^[01][0-9]|2[0-3]$/,
        'minuto': /^[0-5][0-9]$/,
        'segundo': /^[0-5][0-9]$/,
        'horario': /^([01][0-9]|2[0-3])\:[0-5][0-9]\:[0-5][0-9]$/,
        'hora_minuto': /^([01][0-9]|2[0-3])\:[0-5][0-9]$/,
        'ano': /^(1111)|(19[0-9]{2}|20[0-4][0-9]{1})$/,
        'ano_mes': /^(111111|(19[0-9]{2}|20[0-4][0-9]{1})0[1-9]|1[0-2])$/,

        'arquivo': /^[A-Za-z0-9\_]{1,50}(\.){1}(([A-Za-z0-9]){3,4})$/,
        // EXCLUSIVO PARA SOBE (BRUNO 03/09/08)
        'arquivo_sobe': /^([A-Za-z0-9\_\-\.]{1,65}(\.){1}(([A-Za-z0-9]){2,5}))$|^DacNetRamal[\d]{5}\.exe$/,
        'arquivos': /^([A-Za-z0-9\_]{1,50}(\.){1}(([A-Za-z0-9]){3,4})(\;)*)+$/,

        'banco': /^[0-9]{3}$/,
        'dia': /^0[1-9]|[12]\d|[3][01]$/,
        'mes': /^0[1-9]|1[0-2]$/,
        'data': /^(1111-11-11)|((19[0-9]{2}|20[0-4][0-9]{1})\-(((0[1-9]|1[0-2])\-(0[1-9]|[12]\d))|((0[13456789]|1[0-2])\-30)|((0[13578]|1[02])\-31)))$/,
        'data_br': /^((((0[1-9]|[12]\d)\/(0[1-9]|1[0-2]))|(30\/(0[13456789]|1[0-2]))|(31\/(0[13578]|1[02])))\/(19[0-9]{2}|20[0-4][0-9]{1}))$/,

        'cnpj': /^[0-9]{14}$/,
        'cpf': /^[0-9]{11}$/,
        'cep': /^[0-9]{8}$/,

        // SI13307
        'ddd': /^(?:[14689][1-9]|2[12478]|3[1-578]|5[1345]|7[134579])$/,

        'telef_aux': /^1[0-9]{2,4}$/,

        'telefone_s_celular': /^[2-5][0-9]{7}$/,
        'celular': /^(?:9[1-9]|7)[0-9]{7}$/,

        'celular_suhai': /^(((9[1-9]))[0-9]{7})$/,

        'telefone': /^(?:(?:9[1-9])|[2-57])[0-9]{7}$/,
        'ddd_telefone': /^(?:[14689][1-9]|2[12478]|3[1-578]|5[1345]|7[134579])(?:9[1-9]|[2-57])[0-9]{7}$/,
        'ddd_telfixo': /^(?:[14689][1-9]|2[12478]|3[1-578]|5[1345]|7[134579])[2-5][0-9]{7}$/,
        'ddd_celular': /^(?:[14689][1-9]|2[12478]|3[1-578]|5[1345]|7[134579])(?:9[1-9]|7)[0-9]{7}$/,
        'tel_espanha': /^[0-9]{8,9}$/,
        'tel_colombia': /^[0-9]{8}([0-9]{2})?$/,

        // var tmp_date = new Date();
        //  if (tmp_date.getFullYear() == 2015 && (tmp_date.getMonth() > 4 || (tmp_date.getMonth() == 4 && tmp_date.getDate() > 30))) {//SI39082
        //  if (parseInt((tmp_date.getFullYear().toString() + ((tmp_date.getMonth() > 8) ? (tmp_date.getMonth() + 1) : ('0' + (tmp_date.getMonth() + 1).toString())).toString() + ((tmp_date.getDate() > 9) ? tmp_date.getDate() : ('0' + tmp_date.getDate().toString())).toString()), 10) > 20151010) {//SI42280
        //  if (parseInt((tmp_date.getFullYear().toString() + ((tmp_date.getMonth() > 8) ? (tmp_date.getMonth() + 1) : ('0' + (tmp_date.getMonth() + 1).toString())).toString() + ((tmp_date.getDate() > 9) ? tmp_date.getDate() : ('0' + tmp_date.getDate().toString())).toString()), 10) > 20160528) {//SU46682
        //  if (parseInt((tmp_date.getFullYear().toString() + ((tmp_date.getMonth() > 8) ? (tmp_date.getMonth() + 1) : ('0' + (tmp_date.getMonth() + 1).toString())).toString() + ((tmp_date.getDate() > 9) ? tmp_date.getDate() : ('0' + tmp_date.getDate().toString())).toString()), 10) > 20161105) {//SU50118
        //9∫ DÕGITO - TRANSI«√O (OPERADORA COMPLETA A LIGA«√O)
        // 'tra_ddd': /^(4[1-9]|5[1345])$/,//N√O UTILIZAR

        //9∫ DÕGITO - J¡ IMPLANTADO (OPERADORA N√O COMPLETA MAIS A LIGA«√O)
        // 'pos_ddd': /^([1689][1-9]|2[12478]|3[1-578]|7[134579])$/,//N√O UTILIZAR
        //  } else {
        //  //9∫ DÕGITO - TRANSI«√O (OPERADORA COMPLETA A LIGA«√O)
        //  'tra_ddd': /^(6[1-9])$/,//N√O UTILIZAR
        //
        //  //9∫ DÕGITO - J¡ IMPLANTADO (OPERADORA N√O COMPLETA MAIS A LIGA«√O)
        //  'pos_ddd': /^([1689][1-9]|2[12478]|3[1-578]|7[134579])$/,//N√O UTILIZAR
        //  }

        //  'pre_telefone_s_celular': /^((([2-4][0-9])|(5[015689]))[0-9]{6})$/,//NOVA LEI - N√O IMPLANTADO
        //  'pre_celular': /^([6-9][0-9]{7})$/,//NOVA LEI - N√O IMPLANTADO
        //
        //  'pos_telefone_s_celular': /^([2-5][0-9]{7})$/,//NOVA LEI - P”S IMPLANTA«√O
        //  'pos_celular': /^(((9[1-9])|7)[0-9]{7})$/,//NOVA LEI - P”S IMPLANTA«√O

        //SI13307

        // EMAIL - LIVRE
        // 'email': /^[\w!#$%&'*+\/=?^`{|}~-]+(\.[\w!#$%&'*+\/=?^`{|}~-]+)*@(([\w-]+\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/,
        // EMAIL - COMPACTO
        // 'email': /^[\w-]+(\.[\w-]+)*@(([\w-]{2,63}\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/,
        // EMAIL - RESTRITO
        // 'email': /^[\w-]+(\.[\w-]+)*@(([A-Za-z\d][A-Za-z\d-]{0,61}[A-Za-z\d]\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/,
        // EMAIL - RCF2822 / DOMÕNIO RESTRITO
        // 'email': /^[\w!#$%&*+\/=?^`{|}~-]+(\.[\w!#$%&*+\/=?^`{|}~-]+)*@(([A-Za-z\d][A-Za-z\d-]{0,61}[A-Za-z\d]\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/,
        // EMAIL - RCF5822 -
        // 14/08/2017 - removido o espaÁo.
        'email': /^(?:(?:[\w`~!#$%^&*\-=+;:{}|,?\/]+(?:(?:\.(?:(?:\\?[\w`~!#$%^&*\-=+;:{}|,?\/\.()<>\[\]@]|\\|\\\\)*|[\w`~!#$%^&*\-=+;:{}|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}|,?\/]+)?)|(?:(?:\\?[\w`~!#$%^&*\-=+;:{}|,?\/\.()<>\[\]@]|\\|\\\\)+))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/,

        'preco': /^(\d+)(\.\d+)?$/,
        'valor': /^(\d+)(\,\d+)?$/,

        //para definir a quantidade de decimais manualmente na aplicaÁ„o
        'decimal_pt_m': /^(\d+)(\.\d+)$/,

        'decimal_pt': /^(\d+)(\.)([\d]{2,2})$/,
        'decimal_pt_ng': /^-?(\d+)(\.)([\d]{2,2})$/,
        'decimal_pt_3': /^(\d+)(\.)([\d]{2,3})$/,
        'decimal_pt_5': /^(\d+)(\.)([\d]{1,5})$/,
        'decimal_vg_5': /^(\d+)(\,)([\d]{1,5})$/,
        'decimal_vg': /^(\d+)(\,)([\d]{2,2})$/,
        'decimal_vg_ng': /^-?(\d+)(\,)([\d]{2,2})$/,
        'moeda': /^\d{1,3}(\.\d{3})*\,\d{2}$/,
        'moeda_ng': /^-?(\d{1,3})(\.\d{3})*\,\d{2}$/,
        'moeda_1': /^\d{1,3}(\.\d{3})*\,\d{1}$/,
        'moeda_3': /^\d{1,3}(\.\d{3})*\,\d{3}$/,
        'moeda_8': /^\d{1,3}(\.\d{3})*\,\d{2,8}$/,


        'percentual': /^(\d+)(\,)([\d]{1,1})$/,
        'vl_financeiro': /^(\d+)(\,\d+)$/,

        'nome_razao': /^[A-Za-z0-9.]+[ ]+[A-Za-z0-9. ]+$/,
        'nome_razao_acento': /^[A-Za-z0-9. ¿»Ã“Ÿ¡…Õ”⁄√’ƒÀœ÷‹¬ Œ‘€‡ËÏÚ˘·ÈÌÛ˙‰ÎÔˆ¸‚ÍÓÙ˚„ı«Á]+[ ]+[A-Za-z0-9. ¿»Ã“Ÿ¡…Õ”⁄√’ƒÀœ÷‹¬ Œ‘€‡ËÏÚ˘·ÈÌÛ˙‰ÎÔˆ¸‚ÍÓÙ˚„ı«Á ]+$/,
        // 'campo_bd': /^[a-z]+[_a-z]*[a-z]+$/,
        'campo_bd': /^[a-z0-9_]+$/,
        'centro_custo': /^(\d{1})(\.{1})(\d{1})(\.{1})(\d{1})(\.{1})(\d{5})(\.{1})(\d{2})$/,
        'centro_custo_ctr': /^(\d{1})(\.{1})(\d{1})(\.{1})(\d{1})(\.{1})(\d{5})$/,

        'normal': /^[A-Za-z0-9 ¿»Ã“Ÿ¡…Õ”⁄√’ƒÀœ÷‹¬ Œ‘€‡ËÏÚ˘·ÈÌÛ˙‰ÎÔˆ¸‚ÍÓÙ˚„ı«ÁÒ\,\.\™\∫\-]+$/,
        'numeros': /^[0-9]+$/,
        'numeros_ng': /^-?[0-9]+$/,
        // 'numeros_0': /^[0-9]+$/,
        'numeros_ponto': /^[0-9.]+$/,
        'sem_acento': /^[A-Za-z ]+$/,
        'simples': /^[A-Za-z0-9 ]+$/,
        'login': /^[A-Za-z0-9\.\_\-]+$/,
        'login_func': /^r(e|a|s|b|r|i|k){1}0\d{5}$/,
        'login_vivo': /^[A-Za-z0-9\.\_\-\*\!]+$/,
        'simplespt': /^[A-Za-z0-9 .]+$/,
        'soletras': /^[A-Za-z]+$/,
        'letra_num': /^[A-Za-z0-9]+$/,
        'letra_num_u': /^[A-Za-z0-9\_]+$/,
        'todos': /^[ ¿»Ã“Ÿ¡…Õ”⁄√’ƒÀœ÷‹¬ Œ‘€‡ËÏÚ˘·ÈÌÛ˙‰ÎÔˆ¸‚ÍÓÙ˚„ı«Á—Ò\w\r\n\(\)\[\]\{\}\.\,\:\;\@\™\∫\∞\π\≤\≥\?\!\&\¢\ß\`\¥\=\%\^\*\+\-\$\|\/]+$/,
        'todosbarra': /^[ ¿»Ã“Ÿ¡…Õ”⁄√’ƒÀœ÷‹¬ Œ‘€‡ËÏÚ˘·ÈÌÛ˙‰ÎÔˆ¸‚ÍÓÙ˚„ı«Á—Ò\w\r\n\(\)\[\]\{\}\.\,\:\;\@\™\∫\∞\π\≤\≥\?\!\&\¢\ß\`\¥\=\%\^\*\+\-\$\|\/\\]+$/,
        'parametro': /^[\w\!\@\%\®\*\(\)\+\-\=\π\≤\≥\£\¢\¨\&\ß\|\{\^\}\<\>\:\[\~\]\,\.\;\/\™\∫\∞ ¿¡¬√ƒ≈«»… ÀÃÕŒœ“”‘’÷Ÿ⁄€‹«—‡·‚„‰ÂÁËÈÍÎÏÌÓÔÚÛÙıˆ˘˙˚¸ÁÒ]+$/,
        'flw_descricao': /.{2,}/,
        'flw_descricao_1': /.{1,}/,

        'equipe': /^[A-Za-z0-9]{1}[A-Za-z0-9\-\_\.]*[A-Za-z0-9]{1}([\¢]{1}[A-Za-z0-9]{1}(([A-Za-z0-9\-\_]*[A-Za-z0-9]{1})|[A-Za-z0-9]{0,1}))*$/,
        'empresa': /^[A-Z0-9]{1}[A-Z0-9\-\_]{0,28}[A-Z0-9]{1}$/,
        'representante': /(?=^.{2,20}?$)^([A-Z0-9]{2,}?([_-][A-Z0-9]+?){0,2}?(¢[A-Z0-9]+?([_-][A-Z0-9]+?)??)??)$/,

        'servico_nb': /^([ABCEIKLNPRUVWY0-9][0-9]|H[A-Z0-9])[0-9]{2}$/,
        'servico_atd': /^([ABCEHPRTVW0-9][0-9]{3}|[BGIKLNUXY0-9][0-9]{5}|H[A-Z][0-9]{2}[A-Z0-9][0-9]|U[A-Z0-9][0-9]{4})$/,
        'servico_dac': /^(([ABCHPRTVW])[0-9]{3}\2|([BGIKNUXY])[0-9]{5}\3|[0-9]{4}([0-9]{2})?[DSPQ]|E[0-9]{3}[EM]|L[0-9]{5}[DS]|H[A-Z][0-9]{2}[A-Z0-9][0-9]H|U[A-Z0-9][0-9]{4}U)$/,

        // Valida placa tradicional, placa padr„o Mercosul (carro) e placa padr„o Mercosul (moto)
        'placa': /^(([A-Za-z]{3}[\d]{4})|([A-Za-z]{3}[\d]{1}[A-Za-z]{1}[\d]{2})|([A-Za-z]{3}[\d]{2}[A-Za-z]{1}[\d]{1}))$/,

        'bmc_contrato_privado': /^[0-9]{9}[\-]{1}[0-9]{1}$/,

        'texto_cics': /^[A-Za-z0-9 \;\,\.\(\)\[\]\{\}\|\=\+\-\*\/\!\$\@\&\%\#]+$/,

        'link': /^[ ¿»Ã“Ÿ¡…Õ”⁄√’ƒÀœ÷‹¬ Œ‘€‡ËÏÚ˘·ÈÌÛ˙‰ÎÔˆ¸‚ÍÓÙ˚„ı«Á—Ò\w\r\n\(\)\[\]\{\}\.\,\:\;\@\™\∫\π\≤\≥\?\!\&\¢\ß\`\¥\=\#\%\^\*\+\-\$\|\/]+$/

        // /^[A-Za-z0-9 .()[]{}|+&!$*;¨-/,%#@'="~^\]+$/;
        // REMOVER
        // 'texto': /^[0 ]+$/,
    };

    // ALTERA«√O DOS NOMES DOS TIPOS PARA NOMES MAIS COERENTES
    // DEFINI«√O DOS TIPOS DE CARACTERES PARA CASOS ESPECÕFICOS
    switch (tipo) {
        case 'panclub':
        case 'cartao':
        case 'cartao_vs':
        case 'cartao_mb':
        case 'cartao_pc':
        case 'conta_agencia':
        case 'cartao_bandeira':
        case 'ldigitavel':
        case 'gravacao':
        case 'ins_estadual':
        case 'naomesmo_num':
        case 'numeros_0':
        case 'numeros_positivos':
            tipo = 'numeros';
            break;
        case 'CGC':
            tipo = 'cnpj';
            break;
        case 'CPF':
            tipo = 'cpf';
            break;
        case 'end_nom_log':
        case 'logradouro':
        case 'naorepetir3simples':
            tipo = 'simples';
            break;
        case 'dezesseis':
        case 'maioridade16':
        case 'ano_nasc':
        case 'maioridade18':
            tipo = 'ano';
            break;
        case 'simplesptnr':
        case 'repeticao':
        case 'naorepetir3':
            tipo = 'simplespt';
            break;
        case 'd_nome':
        case 'nome_razao_nrepetir3':
            tipo = 'nome_razao';
            break;
        case 'cidade':
        case 'letras':
            tipo = 'sem_acento';
            break;
        case 'float':
        case 'virgula':
            tipo = 'valor';
            break;
        case 'moeda_0':
            tipo = 'moeda';
            break;
        case 'decimal_vg_0':
            tipo = 'decimal_vg';
            break;
        case 'decimal_pt_0':
            tipo = 'decimal_pt';
            break;
        case 'emails':
        case 'email_dns':
            tipo = 'email';
            break;
    }

    // VERIFICA SE O `tipo` … UM TIPO DE DADO DECLARADO NA FUN«√O (POR PADR√O ASSUME TIPO DE DADOS `todos`)
    if (regexList[tipo] instanceof RegExp) {
        return regexList[tipo];
    }

    return regexList['todos'];
}

function checaRepeticao(texto, limite) {
    var tamanho = texto.length;
    var repeticao;
    var texto_origem;
    var texto_comparar;
    var i;
    var j;

    for (i = 0; i <= ((tamanho - limite) + 1); i++) {
        texto_origem = texto.substr(i, 1);

        repeticao = 1;

    for (j = (i + 1); (j <= (tamanho - 1)) && (repeticao < (limite + 1)); j++) {
            texto_comparar = texto.substr(j, 1);

            if (texto_origem != texto_comparar) {
                break;
            } else {
                repeticao++;
            }
        }

        if (repeticao > limite) {
            return false;
        }
    }

    return true;
}

function checkTipoDado(objeto, tipo) {
    var strValue = new String(objeto.value);

    if (tipo == "cpf_formatado") {
        strValue = strValue.replace(/[.-]/g, '');

        tipo = "cpf";
    } else if (tipo == "cnpj_formatado") {
        strValue = strValue.replace(/[./-]/g, '');

        tipo = "cnpj";
    } else if (tipo == "cpfcnpj") {
        if (strValue.length == 11) {
            tipo = "cpf";
        } else if (strValue.length == 14) {
            tipo = "cnpj";
        } else {
            return false;
        }
    } else if (/_mascara$/.test(tipo)) { //ajuste para tratar valores que tenham mascara
        strValue = strValue.replace(/[-\.\/\(\)\{\}]/g, '');
        tipo = tipo.replace(/_mascara/g, '');
    } else if ((tipo == "pre") || (tipo == "preenchido")) {
        if (objeto.value == "") {
            return false;
        } else {
            return true;
        }
    }

    var tipoDado = getExpReg(tipo);

    if (tipoDado == false) {
        return false;
    }

    var max_repeticao_tel = 7;

    //TRATAMENTO DE EXCESS’ES
    switch (tipo) {
        case "ano":
            if (strValue.length == 2) {
                var max = null;

                if (objeto.getAttribute("maxLength")) {
                    max = parseInt(objeto.getAttribute("maxLength"));
                }

                if (max == 2) {
                    tipoDado = getExpReg("numeros");
                }
            }

            return tipoDado.test(strValue);
            break;

        case "cartao":
            //EFETUA TESTE DA EXPRESS√O REGULAR
            if (tipoDado.test(strValue) == true) {
                var NroCartao = strValue;
                var Soma = 0;
                var Mult = 1;
                var Tam = NroCartao.length;

                for (i = 0; i < Tam; i++) {
                    digito = NroCartao.substring(Tam - i - 1, Tam - i);
                    Produto = parseInt(digito, 10) * Mult;

                    if (Produto >= 10) {
                        Soma += (Produto % 10) + 1;
                    } else {
                        Soma += Produto;
                    }

                    if (Mult == 1) {
                        Mult++;
                    } else {
                        Mult--;
                    }
                }

                if ((Soma % 10) == 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            break;

        case "cartao_mb":
            //EFETUA TESTE DA EXPRESS√O REGULAR
            if (tipoDado.test(strValue) == true) {
                if ((parseInt(strValue) >= 6274260000000000 && parseInt(strValue) <= 6274269999999999) || (parseInt(strValue) >= 9700000000000000000000 && parseInt(strValue) <= 9899999999999999999999)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            break;

        case "cartao_vs":
            if (strValue.length != 16) {
                return false;
            }
            //EFETUA TESTE DA EXPRESS√O REGULAR
            if (tipoDado.test(strValue) == true) {
                var Tam = strValue.length;
                var digito = strValue.substring(Tam - 1, Tam);

                var _1pos = parseFloat(strValue.substring(0, 1));
                var _2pos = parseFloat(strValue.substring(1, 2));
                var _3pos = parseFloat(strValue.substring(2, 3));
                var _4pos = parseFloat(strValue.substring(3, 4));
                var _5pos = parseFloat(strValue.substring(4, 5));
                var _6pos = parseFloat(strValue.substring(5, 6));
                var _7pos = parseFloat(strValue.substring(6, 7));
                var _8pos = parseFloat(strValue.substring(7, 8));
                var _9pos = parseFloat(strValue.substring(8, 9));
                var _10pos = parseFloat(strValue.substring(9, 10));
                var _11pos = parseFloat(strValue.substring(10, 11));
                var _12pos = parseFloat(strValue.substring(11, 12));
                var _13pos = parseFloat(strValue.substring(12, 13));
                var _14pos = parseFloat(strValue.substring(13, 14));
                var _15pos = parseFloat(strValue.substring(14, 15));



                var Soma = 0;
                Soma = (_1pos * 4) + (_2pos * 3) + (_3pos * 2) + (_4pos * 7) + (_5pos * 6) + (_6pos * 5) + (_7pos * 4) + (_8pos * 3) + (_9pos * 2) + (_10pos * 7) + (_11pos * 6) + (_12pos * 5) + (_13pos * 4) + (_14pos * 3) + (_15pos * 2);
                Resto = Soma % 11;
                if (Resto <= 1) {
                    dv = 0;
                } else {
                    dv = 11 - Resto;
                }
                if (dv == digito) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            break;

        case "cartao_pc":
            //EFETUA TESTE DA EXPRESS√O REGULAR
            if (tipoDado.test(strValue) == true) {
                var Tam = strValue.length;
                var digito = strValue.substring(Tam - 1, Tam);
                var NroCartao = strValue.substring(0, Tam - 1);
                var Tam = NroCartao.length;
                var Soma = 0;
                var Mult = 2;

                for (i = 0; i < Tam; i++) {
                    Nro = NroCartao.substring(Tam - i - 1, Tam - i);
                    Soma = Soma + Nro * (Mult);

                    if (Mult == 9) {
                        Mult = 2;
                    } else {
                        Mult++;
                    }
                }

                Resto = Soma % 11;

                if (Resto <= 1) {
                    dv = 0;
                } else {
                    dv = 11 - Resto;
                }

                if (dv == digito) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            break;

        case "cnpj":
            if (/NT/i.test(strValue) == true) {
                objeto.value = "99999999999999";
                strValue = "99999999999999";
                return true;
            }

            if (strValue == "00000000000000") {
                return false;
            }

            //EFETUA TESTE DA EXPRESS√O REGULAR
            if (tipoDado.test(strValue) == true) {
                var ncgc = strValue;
                var soma1 = 0;
                var div = "";
                var digito = 0;
                var soma1 = ((ncgc.substring(0, 1)) * 5) + ((ncgc.substring(1, 2)) * 4) + ((ncgc.substring(2, 3)) * 3) + ((ncgc.substring(3, 4)) * 2) + ((ncgc.substring(4, 5)) * 9) + ((ncgc.substring(5, 6)) * 8) + ((ncgc.substring(6, 7)) * 7) + ((ncgc.substring(7, 8)) * 6) + ((ncgc.substring(8, 9)) * 5) + ((ncgc.substring(9, 10)) * 4) + ((ncgc.substring(10, 11)) * 3) + ((ncgc.substring(11, 12)) * 2);
                var divisao1 = soma1 / 11;
                var resto = soma1 - (parseInt(divisao1) * 11);

                //PRIMEIRO DIGITO
                if (resto <= 1) {
                    if (ncgc.substring(12, 13) != 0) {
                        return false;
                    } else {
                        digito = 0;
                    }
                } else {
                    if (ncgc.substring(12, 13) != (11 - resto)) {
                        return false;
                    } else {
                        digito = 11 - resto;
                    }
                }

                //SEGUNDO DIGITO
                soma1 = ((ncgc.substring(0, 1)) * 6) + ((ncgc.substring(1, 2)) * 5) + ((ncgc.substring(2, 3)) * 4) + ((ncgc.substring(3, 4)) * 3) + ((ncgc.substring(4, 5)) * 2) + ((ncgc.substring(5, 6)) * 9) + ((ncgc.substring(6, 7)) * 8) + ((ncgc.substring(7, 8)) * 7) + ((ncgc.substring(8, 9)) * 6) + ((ncgc.substring(9, 10)) * 5) + ((ncgc.substring(10, 11)) * 4) + ((ncgc.substring(11, 12)) * 3) + (digito * 2);
                divisao1 = soma1 / 11;
                resto = soma1 - (parseInt(divisao1) * 11)

                if (resto <= 1) {
                    if (ncgc.substring(13, 14) != 0) {
                        return false;
                    }
                } else {
                    if (ncgc.substring(13, 14) != (11 - resto)) {
                        return false;
                    }
                }

                return true;
            } else {
                return false;
            }
            break;


        case "cpf":
            if ((strValue == "99999999999") || (strValue == "88888888888") || (strValue == "77777777777") || (strValue == "66666666666") || (strValue == "55555555555") || (strValue == "44444444444") || (strValue == "33333333333") || (strValue == "22222222222") || (strValue == "11111111111") || (strValue == "00000000000") || (strValue == "00000000191")) {
                return false;
            }
            //EFETUA TESTE DA EXPRESS√O REGULAR
            if (tipoDado.test(strValue) == true) {
                var dv = strValue.substring(9, 11);
                var ncpf = strValue.substring(0, 9);
                var soma1 = 0;
                var div = 0;

                for (i = 0; i < 9; i++) {
                    Nro = ncpf.substring(i, i + 1);
                    soma1 = soma1 + ((10 - i) * Nro);
                }

                resto = soma1 % 11;

                if (resto <= 1) {
                    digito = 0;
                } else {
                    digito = 11 - resto;
                }

                ncpf = ncpf + digito;
                soma1 = 0;
                div = 0;

                for (i = 0; i < 10; i++) {
                    Nro = ncpf.substring(i, i + 1);
                    soma1 = soma1 + ((11 - i) * Nro);
                }

                resto = soma1 % 11;

                if (resto <= 1) {
                    digito = "0";
                } else {
                    digito = 11 - resto;
                }

                ncpf = "" + ncpf + digito;

                if (ncpf != strValue) {
                    return false;
                }

                return true;
            } else {
                return false;
            }
            break;




        case "cep":
            //EFETUA TESTE DA EXPRESS√O REGULAR
            if (tipoDado.test(strValue) == true) {
                if (strValue < "01000000") {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
            break;

        case "conta_agencia":
            //       if (document.getElementById('cmb_banco_rotina').options[document.getElementById('cmb_banco_rotina').selectedIndex].value != "") {
            //          document.getElementById("agencia_MontaDadosBanco").setAttribute('consistir','sempre');
            //          document.getElementById("contacorrente_MontaDadosBanco").setAttribute('consistir','sempre');
            //         } else {
            //          document.getElementById("agencia_MontaDadosBanco").setAttribute('consistir','sopreenchido');
            //          document.getElementById("contacorrente_MontaDadosBanco").setAttribute('consistir','sopreenchido');
            //         }
            if ((document.getElementById('agencia_MontaDadosBanco').value != "") || (document.getElementById("contacorrente_MontaDadosBanco").value != "")) {
                if (document.getElementById('cmb_banco_rotina').options[document.getElementById('cmb_banco_rotina').selectedIndex].value == "") {
                    alert("Preencha o Banco");
                    document.getElementById("cmb_banco_rotina").focus();
                    return false;
                }
            }
            banco = document.getElementById('cmb_banco_rotina').options[document.getElementById('cmb_banco_rotina').selectedIndex];
            agencia = document.getElementById("agencia_MontaDadosBanco");
            dg_agencia = document.getElementById("dgagencia_MontaDadosBanco");
            contacorrente = document.getElementById("contacorrente_MontaDadosBanco");
            dg_contacorrente = document.getElementById("dgcontacorrente_MontaDadosBanco");
            repre_contacorrente = document.getElementById("repre_MontaDadosBanco");
            if ((banco.value != "") && (agencia.value != "") && (contacorrente.value != "")) {
                if (ValidaBancos(banco, agencia, dg_agencia, contacorrente, dg_contacorrente, repre_contacorrente.value)) {
                    if (document.getElementById("campo_extra_banco")) {
                        document.getElementById("campo_extra_banco").value = agencia.value + '¢' + dg_agencia.value + '¢' + contacorrente.value + '¢' + dg_contacorrente.value;
                    } else {
                        document.getElementById("cpoextra_banco_id").value = agencia.value + '¢' + dg_agencia.value + '¢' + contacorrente.value + '¢' + dg_contacorrente.value;
                    }
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            break;

        case "cartao_bandeira":
            //J¡ FOI VERIFICADO MINLENGTH E MAXLENGTH
            //testa tipo de dado cartao
            if (!tipoDado.test(strValue)) {
                return false;
            }
            //pega o id do campo que contem a bandeira pelo atributi fixo idCartaoBandeira
            var idCartaoBandeira = objeto.getAttribute("idCartaoBandeira");
            if (!idCartaoBandeira) {
                alert('Atributo [idCartaoBandeira] n„o definido para a utilizaÁ„o do tipodado cartao_bandeira');
                objeto.focus();
                return false;
            }
            //consiste a bandeira
            if (document.getElementById(idCartaoBandeira).value == "") {
                alert(document.getElementById(idCartaoBandeira).getAttribute("msg"));
                document.getElementById(idCartaoBandeira).focus();
                return false;
            }
            if (!consisteCampo(document.getElementById(idCartaoBandeira))) {
                return false;
            }
            //verifica se o cart„o pertence a bandeira
            var nroCartao = objeto.value;
            var operadoraCartao = document.getElementById(idCartaoBandeira).value;
            var isValid = false;
            var ccCheckRegExp = /[^\d ]/;
            isValid = !ccCheckRegExp.test(nroCartao);
            var verificaDado = "S";
            if (isValid) {
                var nroCartaosOnly = nroCartao.replace(/ /g, "");
                var nroCartaoLength = nroCartaosOnly.length;
                var lengthIsValid = false;
                var prefixIsValid = false;
                var prefixRegExp;
                switch (operadoraCartao) {
                    case "2": //MASTER
                        lengthIsValid = (nroCartaoLength == 16);
                        prefixRegExp = /^5[1-5]/;
                        break;
                    case "1": //VISA
                        lengthIsValid = (nroCartaoLength == 16 || nroCartaoLength == 13);
                        prefixRegExp = /^4/;
                        break;
                    case "4": //AMERICAM EXPRESS (AMEX)
                        lengthIsValid = (nroCartaoLength == 15);
                        prefixRegExp = /^3(4|7)/;
                        break;
                        //      case "5"://HIPERCARD
                        //      break;
                        //      case "7"://ELO
                        //      break;
                    default:
                        verificaDado = "N";
                        isValid = (nroCartaoLength >= 13);
                        break
                }
                if (verificaDado == "S") {
                    prefixIsValid = prefixRegExp.test(nroCartaosOnly);
                    isValid = prefixIsValid && lengthIsValid;
                }
            }

            if (isValid && operadoraCartao != "5" && operadoraCartao != "7") {
                var numberProduct;
                var numberProductDigitIndex;
                var checkSumTotal = 0;
                for (digitCounter = nroCartaoLength - 1; digitCounter >= 0; digitCounter--) {
                    checkSumTotal += parseInt(nroCartaosOnly.charAt(digitCounter));
                    digitCounter--;
                    numberProduct = String((nroCartaosOnly.charAt(digitCounter) * 2));
                    for (var productDigitCounter = 0; productDigitCounter < numberProduct.length; productDigitCounter++) {
                        checkSumTotal += parseInt(numberProduct.charAt(productDigitCounter));
                    }
                }
                isValid = (checkSumTotal % 10 == 0);
            }
            return isValid;
            break;


        case "data":
            //EFETUA TESTE DA EXPRESS√O REGULAR
            if (tipoDado.test(strValue) == true) {
                if ((parseInt(strValue.substring(5, 7)) == 2) && (parseInt(strValue.substring(8, 10)) == 29)) {
                    if ((((parseInt(strValue.substring(0, 4)) % 4) == 0) && ((parseInt(strValue.substring(0, 4)) % 100) != 0)) || ((parseInt(strValue.substring(0, 4)) % 400) == 0)) {
                        return true;
                    } else {
                        //SE O ANO N√O … BISSEXTO, A DATA GERADA SER¡ INV¡LIDA
                        return false;
                    }
                } else {
                    if ((parseInt(strValue.substring(5, 7)) == 2) && (parseInt(strValue.substring(8, 10)) > 29)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                return false;
            }
            break;

        case "data_br":
            //EFETUA TESTE DA EXPRESS√O REGULAR
            if (tipoDado.test(strValue) == true) {
                if ((parseInt(strValue.substring(3, 5)) == 2) && (parseInt(strValue.substring(0, 2)) == 29)) {
                    if ((((parseInt(strValue.substring(6, 10)) % 4) == 0) && ((parseInt(strValue.substring(6, 10)) % 100) != 0)) || ((parseInt(strValue.substring(6, 10)) % 400) == 0)) {
                        return true;
                    } else {
                        //SE O ANO N√O … BISSEXTO, A DATA GERADA SER¡ INV¡LIDA
                        return false;
                    }
                } else {
                    if ((parseInt(strValue.substring(3, 5)) == 2) && (parseInt(strValue.substring(0, 2)) > 29)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                return false;
            }
            break;

        case "telefone_s_celular":
        case "celular":
        case "telefone":
            if (tipoDado.test(strValue) == false) {
                return false;
            }

            var tmpStrValue = strValue;
            if (tmpStrValue.length == 9) {
                tmpStrValue = tmpStrValue.substr(1);
            }

            if (checaRepeticao(tmpStrValue, max_repeticao_tel) == false) {
                return false;
            }

            return true;
            break;

        case "ddd_telefone":
            if (tipoDado.test(strValue) == false) {
                return false;
            }

            var tmp_ddd = strValue.substr(0, 2);
            var tmp_tel = strValue.substr(2, (strValue.length - 2));

            var tmpStrValue = tmp_tel;
            if (tmpStrValue.length == 9) {
                tmpStrValue = tmpStrValue.substr(1);
            }

            //****************************************************************************************************\\
            //* PRECISAMOS TRATAR AQUI OS CASOS EM QUE ESTAMOS UTILIZANDO N⁄MEROS DE CELULAR                     *\\
            //* E EM QUE O DDD J¡ POSSUI O 9∫ DIGITO MAS O N⁄MERO DE TELEFONE DIGITADO EST¡ APENAS COM 8 N⁄MEROS *\\
            //****************************************************************************************************\\

            if (checaRepeticao(tmpStrValue, max_repeticao_tel) == false) {
                return false;
            }

            //      if (tmp_tel.length == 9) {
            //        //9 DÕGITOS
            //        if (getExpReg("pos_ddd").test(tmp_ddd) == true) {
            //          //9∫ DÕGITO - J¡ IMPLANTADO
            //          return true;
            //        } else if (getExpReg("tra_ddd").test(tmp_ddd) == true) {
            //          //9∫ DÕGITO - TRANSI«√O
            //          return true;
            //        }
            //
            //        //9∫ DÕGITO - N√O IMPLEMENTADO
            //        return false;
            //      }
            //
            return true;
            break;

        case "ddd_telfixo":
            if (tipoDado.test(strValue) == false) {
                return false;
            }

            var tmp_tel = strValue.substr(2, (strValue.length - 2));

            var tmpStrValue = tmp_tel;
            if (tmpStrValue.length == 9) {
                tmpStrValue = tmpStrValue.substr(1);
            }

            if (checaRepeticao(tmpStrValue, max_repeticao_tel) == false) {
                return false;
            }

            return true;
            break;

        case "ddd_celular":
            if (tipoDado.test(strValue) == false) {
                return false;
            }

            var tmp_ddd = strValue.substr(0, 2);
            var tmp_tel = strValue.substr(2, (strValue.length - 2));

            var tmpStrValue = tmp_tel;
            if (tmpStrValue.length == 9) {
                tmpStrValue = tmpStrValue.substr(1);
            }

            if (checaRepeticao(tmpStrValue, max_repeticao_tel) == false) {
                return false;
            }

            //      if (tmp_tel.length == 8) {
            //        //8 DÕGITOS
            //        if (getExpReg("pos_ddd").test(tmp_ddd) == true) {
            //          //9∫ DÕGITO - J¡ IMPLANTADO
            //          if ((/^(11)$/.test(tmp_ddd) == true) && (/^([689][0-9]|5[2347]|7[1-6])[0-9]{6}$/.test(tmp_tel) == true)) {
            //            //SMP (CELULAR)
            //            return false;
            //          } else if ((/^(21)$/.test(tmp_ddd) == true) && (/^([689][0-9]|5[347]|7([1-6]|9))[0-9]{6}$/.test(tmp_tel) == true)) {
            //            //SMP (CELULAR)
            //            return false;
            //          } else if ((/^([12]1)$/.test(tmp_ddd) == false) && (/^([689][0-9]|5[347]|7([0-7]|9))[0-9]{6}$/.test(tmp_tel) == true)) {
            //            //SMP (CELULAR)
            //            return false;
            //          } else {
            //            //SME (R¡DIO NEXTEL)
            //            return true;
            //          }
            //        } else {
            //          //9∫ DÕGITO - N√O IMPLANTADO
            //          return true;
            //        }
            //      } else {
            //        //9 DÕGITOS
            //        if (getExpReg("pos_ddd").test(tmp_ddd) == true) {
            //          //9∫ DÕGITO - J¡ IMPLANTADO
            //          return true;
            //        } else if (getExpReg("tra_ddd").test(tmp_ddd) == true) {
            //          //9∫ DÕGITO - TRANSI«√O
            //          return true;
            //        }
            //        //9∫ DÕGITO - N√O IMPLEMENTADO
            //        return false;
            //      }

            return true;
            break;

        case "decimal_vg_0":
            if (tipoDado.test(strValue) == true) {
                if (parseFloat(strValue.replace(",", ".")) > 0.0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            return tipoDado.test(strValue);
            break;

        case "moeda_0":
            if (tipoDado.test(strValue) == true) {
                var aux = strValue;
                aux = aux.replace(/\./g, "");
                aux = aux.replace(/\,/g, ".");
                if (parseFloat(aux) > 0.0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            return tipoDado.test(strValue);
            break;


        case "moeda_1":
            if (tipoDado.test(strValue) == true) {
                var aux = strValue;
                aux = aux.replace(/\./g, "");
                aux = aux.replace(/\,/g, ".");
                if (parseFloat(aux) > 0.0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            return tipoDado.test(strValue);
            break;

        case "decimal_pt_0":
            if (tipoDado.test(strValue) == true) {
                if (parseFloat(strValue.replace(",", ".")) > 0.0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            return tipoDado.test(strValue);
            break;
            /*
            case "ddd_telefone":
            if (tipoDado.test(strValue) == true) {
            if (parseFloat(strValue.replace(",",".")) > 0.0) {
            return true;
            } else {
            return false;
            }
            } else {
            return false;
            }
            return tipoDado.test(strValue);
            break;
            */

        case "email":
            if (strValue.indexOf(";") == -1) {
                //EFETUA TESTE DA EXPRESS√O REGULAR
                if (tipoDado.test(strValue) == true) {
                    return true;
                } else {
                    return false;
                }
            } else {
                var arrMail = strValue.split(";");

                for (var i = 0; i < arrMail.length; i++) {
                    if (tipoDado.test(arrMail[i]) == false) {
                        return false;
                    }
                }

                if (arrMail.length > 1) {
                    return false;
                }
            }
            break;

        case "emails":
            if (strValue.indexOf(";") == -1) {
                //EFETUA TESTE DA EXPRESS√O REGULAR
                if (tipoDado.test(strValue) == true) {
                    return true;
                } else {
                    return false;
                }
            } else {
                var arrMail = strValue.split(";");

                for (var i = 0; i < arrMail.length; i++) {
                    if (tipoDado.test(arrMail[i]) == false) {
                        return false;
                    }
                }

                return true;
            }
            break;

        case "email_dns":
            ajax = newAjaxObject();

            if (ajax) {
                var_aux = "OK";
                ajax.open("POST", "/ajax/ValidaEmailDNS.php", false);
                ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                ajax.onreadystatechange = function() {
                    if (ajax.readyState == 4) {
                        var_aux = ajax.responseText;
                    }
                }
                ajax.send("email=" + strValue);

                if (var_aux == "OK") {
                    return true;
                } else {
                    return false;
                }
            }
            break;

        case "flw_descricao":
        case "flw_descricao_1":
            strValue = strValue.replace(String.fromCharCode(0), '');
            strValue = strValue.replace(String.fromCharCode(1), '');
            strValue = strValue.replace(String.fromCharCode(2), '');
            strValue = strValue.replace(String.fromCharCode(3), '');
            strValue = strValue.replace(String.fromCharCode(4), '');
            strValue = strValue.replace(String.fromCharCode(5), '');
            strValue = strValue.replace(String.fromCharCode(6), '');
            strValue = strValue.replace(String.fromCharCode(7), '');
            strValue = strValue.replace(String.fromCharCode(8), '');
            strValue = strValue.replace(String.fromCharCode(9), ' ');

            strValue = strValue.replace(String.fromCharCode(11), '');
            strValue = strValue.replace(String.fromCharCode(12), '');

            strValue = strValue.replace(String.fromCharCode(14), '');
            strValue = strValue.replace(String.fromCharCode(15), '');
            strValue = strValue.replace(String.fromCharCode(16), '');
            strValue = strValue.replace(String.fromCharCode(17), '');
            strValue = strValue.replace(String.fromCharCode(18), '');
            strValue = strValue.replace(String.fromCharCode(19), '');
            strValue = strValue.replace(String.fromCharCode(20), '');
            strValue = strValue.replace(String.fromCharCode(21), '');
            strValue = strValue.replace(String.fromCharCode(22), '');
            strValue = strValue.replace(String.fromCharCode(23), '');
            strValue = strValue.replace(String.fromCharCode(24), '');
            strValue = strValue.replace(String.fromCharCode(25), '');
            strValue = strValue.replace(String.fromCharCode(26), '');
            strValue = strValue.replace(String.fromCharCode(27), '');
            strValue = strValue.replace(String.fromCharCode(28), '');
            strValue = strValue.replace(String.fromCharCode(29), '');
            strValue = strValue.replace(String.fromCharCode(30), '');
            strValue = strValue.replace(String.fromCharCode(31), '');

            strValue = strValue.replace(String.fromCharCode(127), '');

            strValue = strValue.replace(String.fromCharCode(160), ' ');

            objeto.value = new String(strValue);

            return tipoDado.test(strValue);
            break;

        case "gravacao":
            //EFETUA TESTE DA EXPRESS√O REGULAR
            if (tipoDado.test(strValue) == true) {
                var tam = strValue.length;
                var NroGrav = strValue.substring(0, tam - 1);
                var Digito = strValue.substring(tam - 1, tam);
                var Soma = 0;
                var Mult = 2;

                tam = NroGrav.length;

                for (i = 0; i < tam; i++) {
                    Nro = NroGrav.substring(tam - i - 1, tam - i);
                    Soma = Soma + Nro * Mult;
                    if (Mult < 9) {
                        Mult++;
                    } else {
                        Mult = 2;
                    }
                }

                Resto = Soma % 11;

                if (Resto > 1) {
                    dv = 11 - Resto;
                } else {
                    dv = Resto;
                }

                if (dv == Digito) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            break;

        case "ins_estadual":
            strValue = strValue.toUpperCase();
            if (strValue.replace(/^\s*/, "").replace(/\s*$/, "") == "ISENTO") {
                return true;
            } else {
                if (tipoDado.test(strValue) == true) {
                    if (parseInt(strValue) > 0) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            break;

        case "logradouro":
            //EFETUA TESTE DA EXPRESS√O REGULAR
            if (tipoDado.test(strValue) == true) {
                //VERIFICA SE O VALOR DIGITADO … VALIDO
                if (/O MESMO/i.test(strValue) == true) {
                    return false;
                }

                return true;
            } else {
                return false;
            }
            break;

        case "maioridade16":
        case "maioridade18":
            //EFETUA TESTE DA EXPRESS√O REGULAR
            if (tipoDado.test(strValue) == true) {
                var now = new Date(); //RETORNAR DATA DO APACHE
                ano_agora = now.getFullYear(); //RETORNAR DATA DO APACHE
                if (tipo == "maioridade16") {
                    ano_maior = ano_agora - 16;
                } else {
                    ano_maior = ano_agora - 18;
                }

                if (parseInt(strValue) > ano_maior) {
                    return false;
                }

                return true;
            } else {
                return false;
            }
            break;

        case "naorepetir3":
        case "naorepetir3simples":
        case "nome_razao_nrepetir3":
            //EFETUA TESTE DA EXPRESS√O REGULAR
            if (tipoDado.test(strValue) == true) {
                for (var j = 0; j < strValue.length; j++) {
                    if ((strValue.charAt(j) == strValue.charAt(j + 1)) && (strValue.charAt(j + 1) == strValue.charAt(j + 2))) {
                        return false;
                    }
                }

                return true;
            } else {
                return false;
            }
            break;

        case "naomesmo_num":
            //EFETUA TESTE DA EXPRESS√O REGULAR
            if (tipoDado.test(strValue) == true) {
                for (var j = 0; j < strValue.length; j++) {
                    if (strValue.charAt(0) != strValue.charAt(j)) {
                        return true;
                    }
                }

                if (j > 1) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
            break;

        case "numeros_0":
            if (tipoDado.test(strValue) == true) {
                if (strValue > 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            return tipoDado.test(strValue);
            break;

        case "numeros_positivos":
            if (tipoDado.test(strValue) == true) {
                if (strValue >= 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            return tipoDado.test(strValue);
            break;

        case "ldigitavel":
            return linhaDigitavel(strValue);
            break;
        default:
            if (tipo) {
                if (tipoDado.test(strValue) == true) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }

            break;
    }
}

function tipodado(objeto, tipo, msg) {
    alertar = "S";
    if (document.getElementById("intergrall_consistencia_bloq_alerta")) {
        if (document.getElementById("intergrall_consistencia_bloq_alerta").value == "S") {
            alertar = "N";
        }

    }
    if (checkTipoDado(objeto, tipo) == false) {
        if (alertar == "S") {
            if (!(typeof VESAO_INTERGRALL != 'undefined') || (typeof PASSOU_CHECA != 'undefined' && PASSOU_CHECA == true) || (typeof PASSOU_CHECA == 'undefined' && objeto.type == "hidden")) {
                if (typeof VESAO_INTERGRALL != 'undefined' && VESAO_INTERGRALL == "BOOTSTRAP") {
                    if (typeof mensagem != 'undefined') {
                        if (objeto.getAttribute("idAlvo")) {
                            mensagem.alerta("AtenÁ„o", msg, objeto.getAttribute("idAlvo"));
                        } else {
                            mensagem.alerta("AtenÁ„o", msg, objeto.id);
                        }
                    } else {
                        alert(msg);
                    }
                } else {
                    alert(msg);
                }
            }
        }
        return false;
    } else {
        return true;
    }
}

function checa(form) {
    PASSOU_CHECA = true;
    if (typeof VESAO_INTERGRALL != 'undefined') {
        var retorno = true;
        $(form).find('input:not([type=button], [type=submit], [disabled]), select:not([disabled]), textarea:not([disabled])').each(function() {
            if ($(this).attr("consistir") != "") {
                if (!ConsistenciaDinamica(this) && PASSOU_CHECA) {

                    //Verifica se existem abas e se a aba ativa È a que possui o elemento com erro.
                    if ($(this).closest(".tab-pane").length > 0) {
                        var tabPai = $(this).closest(".tab-pane");
                        $('.nav-tabs a[href*=' + tabPai.closest(".tab-pane").attr('id') + ']:first').tab('show');
                        while (tabPai.parent().closest(".tab-pane").length > 0) {
                            tabPai = tabPai.parent().closest(".tab-pane");
                            $('.nav-tabs a[href*=' + tabPai.closest(".tab-pane").attr('id') + ']:first').tab('show');
                        }
                    }
                    $(this).focus();
                    PASSOU_CHECA = false;
                    retorno = false;
                }
            }

        });
        PASSOU_CHECA = false;
        return retorno;
    } else {
        for (var j = 0; j < form.length; j++) {
            if (consisteCampo(form[j]) == false) {
                PASSOU_CHECA = false;
                return false;
            }
        }
    }
    PASSOU_CHECA = false;
    return true;
}



//ABRE POPUP DE IMPRESSAO PARA RELATORIO
function Relatorio(tipo, form) {
    form.tipo.value = tipo;
    Janela = window.open("", "Janela", "location = no, toolbar = no, titlebar = no, menubar = no, status = no, scrollbars = yes, top = " + ((window.screen.availHeight - 520) / 2) + ", left = " + ((window.screen.availWidth - 720) / 2) + ", width = 720, height = 520");
    Janela.focus();
    form.submit();
}

function getInfoGravacao(nome_gravacao) {
    var tipo_gravacao = nome_gravacao.match(/^([A-Za-z]+[0-9]?[A-Za-z]+)/);


    if (tipo_gravacao != undefined) {
        tipo_gravacao = tipo_gravacao[0].toUpperCase();
    }

    if (/^([A-Z]{6}_)?[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(nome_gravacao)) {
        tipo_gravacao = 'METLIFE';
    }

    if (/^(RECANEXOW|RECCHATH|RECWHATH|RECMSMSH|RECFACEH|RECMAILE|RECVIDEOV|FSMCALLL|NEXCALLL|FPNCALLL|FS1CALLL|FSTCALLL|FS2CALLL|FS3CALLL|FSBCALLL|FS4CALLL|FS5CALLL|FS6CALLL|FS7CALLL|FS8CALLL|FS9CALLL|F10CALLL|F11CALLL|F12CALLL|GO2CALL|PROCALLB|TLFCALLB)$/.test(tipo_gravacao)) {
        tipo_gravacao = tipo_gravacao.substr(0, (tipo_gravacao.length - 1));
    }

    base = tipo_gravacao.length;

    if (/^(RECCALL|RECCALB|REVELET|RECCHAT|RECWHAT|RECMSMS|RECFACE|NRECDAC)$/.test(tipo_gravacao)) {
        //LIGA«√O
        //CHAT
        pad = ((nome_gravacao.length == 52) ? 2 : 0);
    } else if (/^(FSMCALL|NEXCALL|FPNCALL|FS1CALL|FSTCALL|FS2CALL|FS3CALL|FSBCALL|FS4CALL|FS5CALL|FS6CALL|FS7CALL|FS8CALL|FS9CALL|F10CALL|F11CALL|F12CALL|GO2CALL)$/.test(tipo_gravacao)) {
        //FALE SEMPRE MAIS (FSM)
        pad = 2;
    } else if (/^(PROCALL|TLFCALL)$/.test(tipo_gravacao)) {
        //EMPRESAS EXTERNAS
        pad = 0;
    } else if (/^(RECVIDEO)$/.test(tipo_gravacao)) {
        //VIDEO
        pad = ((nome_gravacao.length == 55) ? 2 : 0);
    } else if (/^(RECMAIL)$/.test(tipo_gravacao)) {
        //E-MAIL
        pad = ((nome_gravacao.length == 60) ? 2 : ((strlen($nome_gravacao) == 43) ? 2 : 0));
    } else if (/^(RECANEXO)$/.test(tipo_gravacao)) {
        //ANEXO
        pad = ((nome_gravacao.length == 50) ? 2 : 0);
    } else if (/^(RECFAX|RECSMS)$/.test(tipo_gravacao)) {
        //FAX
        //SMS
        pad = ((nome_gravacao.length == 42) ? 2 : 0);
    } else if (/^(MSG)$/.test(tipo_gravacao)) {
        tipo_gravacao = 'BLOQUEIO';
        pad = 0;
    } else if (/^(METLIFE)$/.test(tipo_gravacao)) {
        //AUDITORIA METLIFE
        base = 0;
        pad = ((/^([A-Z]{6}_)/.test(nome_gravacao)) ? 7 : 0);

        return {
            gravacao: nome_gravacao,
            tipo: tipo_gravacao,
            grupo: '',
            ano: nome_gravacao.substr((base + (2 + pad)), 2),
            mes: nome_gravacao.substr((base + (5 + pad)), 2),
            dia: nome_gravacao.substr((base + (8 + pad)), 2)
                //    hora: nome_gravacao.substr((base + (10 + pad)), 2),
                //    minuto: nome_gravacao.substr((base + (12 + pad)), 2),
                //    segundos: nome_gravacao.substr((base + (14 + pad)), 2),
                //    milisegundos: nome_gravacao.substr((base + (16 + pad)), 3),
        };
    } else {
        return "N„o foi possÌvel identificar o tipo da gravaÁ„o ¥" + nome_gravacao + "¥.";
    }

    return {
        gravacao: nome_gravacao,
        tipo: tipo_gravacao,
        grupo: nome_gravacao.substr(base, (4 + pad)),
        ano: nome_gravacao.substr((base + (4 + pad)), 2),
        mes: nome_gravacao.substr((base + (6 + pad)), 2),
        dia: nome_gravacao.substr((base + (8 + pad)), 2)
            //    hora: nome_gravacao.substr((base + (10 + pad)), 2),
            //    minuto: nome_gravacao.substr((base + (12 + pad)), 2),
            //    segundos: nome_gravacao.substr((base + (14 + pad)), 2),
            //    milisegundos: nome_gravacao.substr((base + (16 + pad)), 3),
    };
}

function IntergrALLPlayer(str_tipo, gravacao, mensagem, servidor, tipo_include, empresa, nb, grupo, bina_cliente) {
    /*
      04/09/2017 - Alan F·gner
      AlteraÁ„o de par‚metro - De: tipo Para: str_tipo
      str_tipo = tipo (default) OU tipo|ondeAbreBootstrap (AlteraÁ„o realizada)
      ondeAbreBootstrap = "" (Usa o default: abrePopUpModal) OU "JANELA" (Usa o AbreJanela2)
    */

    var tipo = str_tipo;
    var ondeAbreBootstrap = "";
    var acao_player = '';

    if (str_tipo.indexOf("|") > 0) {
        var arr_tipo = str_tipo.split("|");

        if (arr_tipo[0]) {
            tipo = arr_tipo[0];
        }

        if (arr_tipo[1]) {
            ondeAbreBootstrap = arr_tipo[1];
        }

        if (arr_tipo[2]) {
            acao_player = arr_tipo[2];
        }
    }

    if ((tipo == "P") || (tipo == "D")) {
        if (servidor) {
            info_gravacao = getInfoGravacao(gravacao);

            var tipo_gravacao = info_gravacao.tipo;

            if ((tipo_gravacao == "RECCALL") || (tipo_gravacao == "RECCALB") || (tipo_gravacao == "REVELET") || (tipo_gravacao == "BLOQUEIO") || (tipo_gravacao == 'METLIFE') || (tipo_gravacao == "FSMCALL") || (tipo_gravacao == "NEXCALL") || (tipo_gravacao == "FPNCALL") || (tipo_gravacao == "FS1CALL") || (tipo_gravacao == "FSTCALL") || (tipo_gravacao == "FS2CALL") || (tipo_gravacao == "FS3CALL") || (tipo_gravacao == "FSBCALL") || (tipo_gravacao == "FS4CALL") || (tipo_gravacao == "FS5CALL") || (tipo_gravacao == "FS6CALL") || (tipo_gravacao == "FS7CALL") || (tipo_gravacao == "FS8CALL") || (tipo_gravacao == "FS9CALL") || (tipo_gravacao == "F10CALL") || (tipo_gravacao == "F11CALL") || (tipo_gravacao == "F12CALL") || (tipo_gravacao == "GO2CALL") || (tipo_gravacao == "PROCALL") || (tipo_gravacao == "TLFCALL")) {
                if ((tipo_gravacao == "RECCALL") || (tipo_gravacao == "RECCALB") || (tipo_gravacao == "FSMCALL") || (tipo_gravacao == "NEXCALL") || (tipo_gravacao == "FPNCALL") || (tipo_gravacao == "FS1CALL") || (tipo_gravacao == "FSTCALL") || (tipo_gravacao == "FS2CALL") || (tipo_gravacao == "FS3CALL") || (tipo_gravacao == "FSBCALL") || (tipo_gravacao == "FS4CALL") || (tipo_gravacao == "FS5CALL") || (tipo_gravacao == "FS6CALL") || (tipo_gravacao == "FS7CALL") || (tipo_gravacao == "FS8CALL") || (tipo_gravacao == "FS9CALL") || (tipo_gravacao == "F10CALL") || (tipo_gravacao == "F11CALL") || (tipo_gravacao == "F12CALL") || (tipo_gravacao == "GO2CALL") || (tipo_gravacao == "PROCALL") || (tipo_gravacao == "TLFCALL")) {
                    diretorio = 'Record/' + info_gravacao.grupo + '/' + info_gravacao.ano + '/' + info_gravacao.mes + '/' + info_gravacao.dia;
                } else if (tipo_gravacao == "BLOQUEIO") {
                    diretorio = empresa + '/';
                } else if (tipo_gravacao == 'METLIFE') {
                    diretorio = '';
                } else {
                    diretorio = '0900/' + gravacao.substring(7, 11) + '/' + gravacao.substring(11, 13) + '/' + gravacao.substring(13, 15) + '/' + gravacao.substring(15, 17);
                }

                ajax = newAjaxObject();

                if (ajax) {
                    ajax.open('POST', '/ajax/FTPFileExists.php', false);
                    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    ajax.onreadystatechange = function() {
                        if (ajax.readyState == 4) {
                            if (ajax.status == 200) {
                                if (ajax.responseText == 'OK') {
                                    if (tipo == "P") {
                                        if (acao_player == 'SPEECH') {
                                            var widthPlayer = 800;
                                            var heightPlayer = 600;
                                        } else {
                                            var widthPlayer = 450;
                                            var heightPlayer = 450;
                                        }
                                        if (typeof(abrePopUpModal) == 'function') {
                                            if (ondeAbreBootstrap == "JANELA") {
                                                AbreJanela2('/callcenter/iap_player.php?tipo=P&mp3=' + gravacao + '&msg=' + mensagem + '&nas=' + servidor + '&tipo_gravacao=L&tipo_acao=' + tipo + '&tipo_include=' + tipo_include + '&empresa=' + empresa + '&nb=' + nb + '&grupo=' + grupo + '&bina_cliente=' + bina_cliente + '&acao_player=' + acao_player, 'Gravacao', widthPlayer, heightPlayer, 'IntergrALL Player');
                                            } else {
                                                abrePopUpModal('IntergrALL Player', '/callcenter/iap_player.php?tipo=P&mp3=' + gravacao + '&msg=' + mensagem + '&nas=' + servidor + '&tipo_gravacao=L&tipo_acao=' + tipo + '&tipo_include=' + tipo_include + '&empresa=' + empresa + '&nb=' + nb + '&grupo=' + grupo + '&bina_cliente=' + bina_cliente + '&acao_player=' + acao_player, 'Gravacao', widthPlayer, heightPlayer, 'pai');
                                            }
                                        } else {
                                            AbreJanela2('/callcenter/iap_player.php?tipo=P&mp3=' + gravacao + '&msg=' + mensagem + '&nas=' + servidor + '&tipo_gravacao=L&tipo_acao=' + tipo + '&tipo_include=' + tipo_include + '&empresa=' + empresa + '&nb=' + nb + '&grupo=' + grupo + '&bina_cliente=' + bina_cliente + '&acao_player=' + acao_player, 'Gravacao', widthPlayer, heightPlayer, 'IntergrALL Player');
                                        }
                                    } else {
                                        if (tipo_gravacao != 'METLIFE') {
                                            window.location = '/comp/download.php?tipo=NAS&arquivo=' + gravacao + '.mp3' + '&tipo_gravacao=L&tipo_acao=' + tipo + '&tipo_include=' + tipo_include + '&empresa=' + empresa + '&nb=' + nb + '&grupo=' + grupo + '&bina_cliente=' + bina_cliente + '&acao_player=' + acao_player;
                                        } else {
                                            window.location = '/comp/download.php?tipo=' + tipo_gravacao + '&arquivo=' + gravacao + '.mp3';
                                        }
                                    }
                                } else {
                                    alert(ajax.responseText.substring(3));
                                }
                            }
                        }
                    }

                    ajax.send('arquivo=' + gravacao + '.mp3&servidor=' + servidor + '&diretorio=' + diretorio);
                } else {
                    alert('Entre em contato com a supervis„o [DontSupport]');
                }
            } else {
                if (tipo == "P") {
                    if (typeof(abrePopUpModal) == 'function') {
                        if (ondeAbreBootstrap == "JANELA") {
                            AbreJanela2('/callcenter/iap_player.php?tipo=P&mp3=' + gravacao + '&msg=' + mensagem + '&nas=' + servidor + '&tipo_gravacao=L&tipo_acao=' + tipo + '&tipo_include=' + tipo_include + '&empresa=' + empresa + '&nb=' + nb + '&grupo=' + grupo + '&bina_cliente=' + bina_cliente + '&acao_player=' + acao_player, 'Gravacao', 450, 450, 'IntergrALL Player');
                        } else {
                            abrePopUpModal('IntergrALL Player', '/callcenter/iap_player.php?tipo=P&mp3=' + gravacao + '&msg=' + mensagem + '&nas=' + servidor + '&tipo_gravacao=L&tipo_acao=' + tipo + '&tipo_include=' + tipo_include + '&empresa=' + empresa + '&nb=' + nb + '&grupo=' + grupo + '&bina_cliente=' + bina_cliente + '&acao_player=' + acao_player, 'Gravacao', '450', '450', 'pai');
                        }
                    } else {
                        AbreJanela2('/callcenter/iap_player.php?tipo=P&mp3=' + gravacao + '&msg=' + mensagem + '&nas=' + servidor + '&tipo_gravacao=L&tipo_acao=' + tipo + '&tipo_include=' + tipo_include + '&empresa=' + empresa + '&nb=' + nb + '&grupo=' + grupo + '&bina_cliente=' + bina_cliente + '&acao_player=' + acao_player, 'Gravacao', 450, 450, 'IntergrALL Player');
                    }
                } else {
                    window.location = '/comp/download.php?tipo=DOCS&num=' + gravacao;
                }
            }
        } else {
            if (tipo == "P") {
                if (typeof(abrePopUpModal) == 'function') {
                    if (ondeAbreBootstrap == "JANELA") {
                        AbreJanela2('/callcenter/iap_server.php?tipo=P&mp3=' + gravacao + '&msg=' + mensagem + '&tipo_gravacao=L&tipo_acao=' + tipo + '&tipo_include=' + tipo_include + '&empresa=' + empresa + '&nb=' + nb + '&grupo=' + grupo + '&bina_cliente=' + bina_cliente + '&acao_player=' + acao_player, 'ServerNas', 500, 210, 'IntergrALL Player');
                    } else {
                        abrePopUpModal('IntergrALL Player', '/callcenter/iap_server.php?tipo=P&mp3=' + gravacao + '&msg=' + mensagem + '&tipo_gravacao=L&tipo_acao=' + tipo + '&tipo_include=' + tipo_include + '&empresa=' + empresa + '&nb=' + nb + '&grupo=' + grupo + '&bina_cliente=' + bina_cliente + '&acao_player=' + acao_player, "ServerNas", '500', '210', 'pai');
                    }
                } else {
                    AbreJanela2('/callcenter/iap_server.php?tipo=P&mp3=' + gravacao + '&msg=' + mensagem + '&tipo_gravacao=L&tipo_acao=' + tipo + '&tipo_include=' + tipo_include + '&empresa=' + empresa + '&nb=' + nb + '&grupo=' + grupo + '&bina_cliente=' + bina_cliente + '&acao_player=' + acao_player, 'ServerNas', 500, 210, 'IntergrALL Player');
                }
            } else {
                if (typeof(abrePopUpModal) == 'function') {
                    if (ondeAbreBootstrap == "JANELA") {
                        AbreJanela2('/callcenter/iap_server.php?tipo=D&mp3=' + gravacao + '&tipo_gravacao=L&tipo_acao=' + tipo + '&tipo_include=' + tipo_include + '&empresa=' + empresa + '&nb=' + nb + '&grupo=' + grupo + '&bina_cliente=' + bina_cliente + '&acao_player=' + acao_player, 'ServerNas', 500, 210, 'IntergrALL Player');
                    } else {
                        abrePopUpModal('IntergrALL Player', '/callcenter/iap_server.php?tipo=D&mp3=' + gravacao + '&tipo_gravacao=L&tipo_acao=' + tipo + '&tipo_include=' + tipo_include + '&empresa=' + empresa + '&nb=' + nb + '&grupo=' + grupo + '&bina_cliente=' + bina_cliente + '&acao_player=' + acao_player, "ServerNas", '500', '210', 'pai');
                    }
                } else {
                    AbreJanela2('/callcenter/iap_server.php?tipo=D&mp3=' + gravacao + '&tipo_gravacao=L&tipo_acao=' + tipo + '&tipo_include=' + tipo_include + '&empresa=' + empresa + '&nb=' + nb + '&grupo=' + grupo + '&bina_cliente=' + bina_cliente + '&acao_player=' + acao_player, 'ServerNas', 500, 210, 'IntergrALL Player');
                }
            }
        }
    } else {
        alert('Tipo [' + tipo + '] n„o foi definido para Player.');
    }
}

function FaxDownload(arquivo, tipo_atendimento) {
    var diretorio = 'Fax/' + arquivo.substring(6, 10) + '/' + arquivo.substring(10, 12) + '/' + arquivo.substring(12, 14) + '/' + arquivo.substring(14, 16) + '/';

    if (tipo_atendimento == 'A') {
        AbreJanela('/callcenter/ia_fax_view.php?nome_arquivo=' + arquivo, 'JanFax', 600, 600);
    } else {
        ajax = newAjaxObject();

        if (ajax) {
            ajax.open('POST', '/ajax/FTPFileExists.php', false);
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4) {
                    if (ajax.status == 200) {
                        if (ajax.responseText == 'OK') {
                            window.location = '/comp/download.php?tipo=NAS&arquivo=' + arquivo + '.tif';
                        } else {
                            alert(ajax.responseText.substring(3));
                        }
                    }
                }
            }
            ajax.send('arquivo=' + arquivo + '.tif&servidor=fax');
        } else {
            alert('Entre em contato com a supervis„o [DontSupport]');
        }
    }
}

VerifiqueTAB = true;

function pulaCampo(obj, nl, alvo) {
    if (obj.value.length == nl && (VerifiqueTAB)) {
        alvo.focus();
        VerifiqueTAB = false;
    }
}

function PararTAB(quem) {
    VerifiqueTAB = false;
}

function ChecarTAB() {
    VerifiqueTAB = true;
}

function newAjaxObject() {
    //VERIFICA SE O BROWSER TEM SUPORTE A AJAX
    var ajax = null;

    try {
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
        try {
            ajax = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (ex) {
            try {
                ajax = new XMLHttpRequest();
            } catch (exc) {
                ajax = null;
            }
        }
    }
    return ajax;
}

function CallMasterLiga() {
    if (CallMasterLiga.arguments.length == 5) {
        //botao, telefone, sistema, chave, id_cli
        var botao = CallMasterLiga.arguments[0];
        var ddi = "55";
        var telefone = CallMasterLiga.arguments[1];
        if ((telefone.substr(0, 3) == "300") || (telefone.substr(0, 3) == "500") || (telefone.substr(0, 3) == "800")) {
            var ddd = "0" + telefone.substr(0, 3);
            telefone = telefone.substr(3);
        } else {
            var ddd = telefone.substr(0, 2);
            telefone = telefone.substr(2);
        }
        var sistema = CallMasterLiga.arguments[2];
        var chave = CallMasterLiga.arguments[3];
        var id_cli = CallMasterLiga.arguments[4];
        var obs_cli = "";
    } else if (CallMasterLiga.arguments.length == 8) {
        //botao, ddi, ddd, telefone, sistema, chave, id_cli, obs_cli
        var botao = CallMasterLiga.arguments[0];
        var ddi = CallMasterLiga.arguments[1];
        var ddd = CallMasterLiga.arguments[2];
        var telefone = CallMasterLiga.arguments[3];
        var sistema = CallMasterLiga.arguments[4];
        var chave = CallMasterLiga.arguments[5];
        var id_cli = CallMasterLiga.arguments[6];
        var obs_cli = CallMasterLiga.arguments[7];
    } else {
        alert("N„o È possÌvel efetuar a ligaÁ„o! Entre em contato com a Supervis„o.\nMsg: (SEM PARAMETROS)")
        return false;
    }

    var tmp = botao.value;
    botao.disabled = true;
    botao.value = "Aguarde";

    ajax = newAjaxObject();

    //SE TIVER SUPORTE AJAX
    if (ajax) {
        ajax.open("POST", "/ajax/CallMasterLiga.php", true);

        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                var resposta = ajax.responseText;
                if (resposta.substring(0, 2) == "OK") {
                    alert("LigaÁ„o Efetuada!");
                    botao.value = tmp;
                    botao.disabled = false;
                    return true;
                } else {
                    alert("N„o foi possÌvel efetuar a ligaÁ„o! Se necess·rio, entre em contato com a Supervis„o.\n\nMsg: (" + resposta + ")");
                    botao.value = tmp;
                    botao.disabled = false;
                    return false;
                }
            }
        }
        ajax.send("ddi=" + ddi + "&ddd=" + ddd + "&telefone=" + telefone + "&sistema=" + sistema + "&chave=" + chave + "&id_cli=" + id_cli + "&obs_cli=" + obs_cli);
    } else {
        alert("N„o È possÌvel efetuar a ligaÁ„o! Entre em contato com a Supervis„o.\nMsg: (SEM RECURSOS)");
        botao.value = tmp;
        botao.disabled = false;
        return false;
    }
}

function DataIntervalo(diaini, mesini, anoini, diafim, mesfim, anofim, qtd_inter) {
    var data_ini = anoini + '-' + mesini + '-' + diaini;
    var data_fim = anofim + '-' + mesfim + '-' + diafim;

    date_ini = new Date(anoini, (mesini - 1), diaini);
    date_fim = new Date(anofim, (mesfim - 1), diafim);

    if (date_fim < date_ini) {
        alert('Data inicial da pesquisa deve ser menor do que a data final.');
        return false;
    }
    date_ini = new Date(anoini, (mesini - 1), (diaini - 1));
    date_fim = new Date(anofim, (mesfim - 1), (diafim));
    if ((date_fim - date_ini) / 86400000 <= new Number(qtd_inter)) {
        return true;
    } else {
        alert('O intervalo m·ximo para consulta È de ' + qtd_inter + ' dias.');
        return false;
    }
}

/*
compara 2 datas e verifica se a data2 È maior do que a data1
se sim retorna true
*/
function comparaData(data1, data2) {

    arr_data1 = data1.split("-");
    arr_data2 = data2.split("-");

    data1 = arr_data1[2] + "-" + arr_data1[1] + "-" + arr_data1[0];
    data2 = arr_data2[2] + "-" + arr_data2[1] + "-" + arr_data2[0];

    if (parseInt(data2.split("-")[2].toString() + data2.split("-")[1].toString() + data2.split("-")[0].toString()) > parseInt(data1.split("-")[2].toString() + data1.split("-")[1].toString() + data1.split("-")[0].toString())) {
        return true;
    } else {
        return false;
    }
}

/*
compara 2 datas e verifica se a data2 È maior ou igual do que a data1
se sim retorna true
*/
function comparaDataIgual(data1, data2) {

    arr_data1 = data1.split("-");
    arr_data2 = data2.split("-");

    data1 = arr_data1[2] + "-" + arr_data1[1] + "-" + arr_data1[0];
    data2 = arr_data2[2] + "-" + arr_data2[1] + "-" + arr_data2[0];

    if (parseInt(data2.split("-")[2].toString() + data2.split("-")[1].toString() + data2.split("-")[0].toString()) >= parseInt(data1.split("-")[2].toString() + data1.split("-")[1].toString() + data1.split("-")[0].toString())) {
        return true;
    } else {
        return false;
    }
}

function comparaDatasIguais(data1, data2) {

    arr_data1 = data1.split("-");
    arr_data2 = data2.split("-");

    data1 = arr_data1[2] + "-" + arr_data1[1] + "-" + arr_data1[0];
    data2 = arr_data2[2] + "-" + arr_data2[1] + "-" + arr_data2[0];

    if (parseInt(data2.split("-")[2].toString() + data2.split("-")[1].toString() + data2.split("-")[0].toString()) == parseInt(data1.split("-")[2].toString() + data1.split("-")[1].toString() + data1.split("-")[0].toString())) {
        return true;
    } else {
        return false;
    }
}

function RamalSetObsTela(obs_tela, atu_hora) {
    ajax = newAjaxObject();

    if (ajax) {
        ajax.open("POST", "/ajax/RamalSetObsTela.php", true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.send("atu_hora=" + atu_hora + "&obs_tela=" + obs_tela);
    }
}

function getPosX(posicao, width) {
    if ((posicao == "TL") || (posicao == "CL") || (posicao == "BL")) {
        return 0;
    } else if ((posicao == "TC") || (posicao == "CC") || (posicao == "BC")) {
        return ((screen.availWidth - width) / 2);
    } else if ((posicao == "TR") || (posicao == "CR") || (posicao == "BR")) {
        return (screen.availWidth - width);
    }

    return 0;
}

function getPosY(posicao, height) {
    if ((posicao == "TL") || (posicao == "TC") || (posicao == "TR")) {
        return 0;
    } else if ((posicao == "CL") || (posicao == "CC") || (posicao == "CR")) {
        return ((screen.availHeight - height) / 2);
    } else if ((posicao == "BL") || (posicao == "BC") || (posicao == "BR")) {
        return (screen.availHeight - height);
    }

    return 0;
}

function DacOnlineOpen() {
    ajax = newAjaxObject();

    if (ajax) {
        if (DacOnlineOpen.arguments.lenght != 0) {
            ajax.open("POST", DacOnlineOpen.arguments[0], true);
        } else {
            ajax.open("POST", "/callcenter/dac_con_online_vtodos.php", true);
        }
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                var arr_info = ajax.responseText.split("|");
                if (arr_info[0] == "OK") {
                    AbreJanelaFlex(arr_info[1], arr_info[2], arr_info[3], arr_info[4]);
                } else if (arr_info[0] == "NO") {
                    alert(arr_info[1]);
                } else {
                    alert(ajax.responseText);
                }
            }
        }
        ajax.send("");
    }
}

function ExecAcaoInteligente(repre_AI, grupo_regra, acao, vars) {
    ajax = newAjaxObject();
    if (ajax) {
        ajax.open('POST', '/ajax/ExecAcaoInteligente.php', true);
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) { //QUANDO TERMINOU DE EXECUTAR A P¡GINA
                if (ajax.status == 200) { //Carregou a p·gina ok
                    if (ajax.responseText.substring(0, 8) == "Retorno:") {
                        alert(ajax.responseText);
                    } else {
                        var script = document.createElement('script');
                        script.innerHTML = ajax.responseText;
                        script.async = false;
                        document.getElementsByTagName('head')[0].appendChild(script);
                    }
                }
            }
        }

        ajax.send("repre_AI=" + repre_AI + "&grupo_regra=" + grupo_regra + "&acao=" + acao + "&" + vars);
    }
}

function DescLengthCPFCNPJ(obj_cpf_cnpj, obj_label) {
    auxTipoDado = new String('')
    if (obj_cpf_cnpj.getAttribute('tipodado')) {
        auxTipoDado = obj_cpf_cnpj.getAttribute('tipodado').toLowerCase();
    } else if (obj_cpf_cnpj.getAttribute('consistencia3')) {
        auxTipoDado = obj_cpf_cnpj.getAttribute('consistencia3').toLowerCase();
    } else if (obj_cpf_cnpj.getAttribute('consistencia2')) {
        auxTipoDado = obj_cpf_cnpj.getAttribute('consistencia2').toLowerCase();
    } else if (obj_cpf_cnpj.getAttribute('consistencia1')) {
        auxTipoDado = obj_cpf_cnpj.getAttribute('consistencia1').toLowerCase();
    } else if (obj_cpf_cnpj.getAttribute('consistencia')) {
        auxTipoDado = obj_cpf_cnpj.getAttribute('consistencia').toLowerCase();
    } else {
        auxTipoDado = 'cpfcnpj';
    }

    if (auxTipoDado != 'cpf' && auxTipoDado != 'cnpj' && auxTipoDado != 'cpfcnpj') {
        auxTipoDado = 'cpfcnpj';
    }

    if (obj_cpf_cnpj.value.length == 0) {
        obj_label.innerHTML = "";
        return;
    } else {
        obj_label.innerHTML = obj_cpf_cnpj.value.length;
    }

    if (auxTipoDado == 'cpf') {
        if (obj_label.innerHTML == "11") {
            if (checkTipoDado(obj_cpf_cnpj, auxTipoDado) == true) {
                obj_label.innerHTML = "CPF";
            } else {
                obj_label.innerHTML = "Inv·lido";
            }
        }
    } else if (auxTipoDado == 'cnpj') {
        if (obj_label.innerHTML == "14") {
            if (checkTipoDado(obj_cpf_cnpj, auxTipoDado) == true) {
                obj_label.innerHTML = "CNPJ";
            } else {
                obj_label.innerHTML = "Inv·lido";
            }
        }
    } else {
        //so chega aqui cpfcnpj
        if (obj_label.innerHTML == "11") {
            if (checkTipoDado(obj_cpf_cnpj, auxTipoDado) == true) {
                obj_label.innerHTML = "CPF";
            }
        } else if (obj_label.innerHTML == "14") {
            if (checkTipoDado(obj_cpf_cnpj, auxTipoDado) == true) {
                obj_label.innerHTML = "CNPJ";
            } else {
                obj_label.innerHTML = "Inv·lido";
            }
        }
    }
}

function DescLengthCampo(obj_em_uso, obj_label, msg, limite) {
    if (obj_em_uso.value.length == 0) {
        obj_label.innerHTML = "";
    } else {
        obj_label.innerHTML = obj_em_uso.value.length;
    }

    if (obj_label.innerHTML == limite) {
        obj_label.innerHTML = msg;
    }
}

function consisteCampo(campo) {
    if ((campo.tagName == 'OBJECT') || (campo.tagName == 'FIELDSET') || (campo.disabled == true) || ((campo.type == "checkbox") || (campo.type == "radio"))) {
        return true;
    }

    if ((campo.type != "hidden") && (campo.type != "select-multiple") && (campo.type != "file")) {
        campo.value = JTrim(campo.value);
    }

    var resposta = true;
    if (campo.getAttribute("consistencia")) {
        if ((campo.getAttribute("consistencia") == "sopreenchido") && (campo.value == "")) {
            return true;
        }

        for (var k = 1; k < 4; k++) {
            if (campo.getAttribute("consistencia" + k)) {
                if ((campo.getAttribute("consistencia" + k) == "sempre") || (campo.getAttribute("consistencia" + k) == "sopreenchido") || (campo.getAttribute("consistencia" + k) == "") || (campo.getAttribute("consistencia" + k) == null)) {
                    continue;
                }

                if (isNaN(campo.getAttribute("consistencia" + k))) {
                    if (tipodado(campo, campo.getAttribute("consistencia" + k), campo.getAttribute("msg")) != true) {
                        resposta = false;
                    }
                } else {
                    if (tamanho(campo.value, campo.getAttribute("consistencia" + k), campo.getAttribute("msg")) != true) {
                        resposta = false;
                    }
                }

                if (resposta == false) {
                    break;
                }
            }
        }
    } else {
        if (campo.getAttribute("consistir")) {
            if ((campo.getAttribute("consistir") == "sopreenchido") && (campo.value == "")) {
                return true;
            }
            if (campo.getAttribute("minlength")) {
                if (tamanho(campo.value, campo.getAttribute("minlength"), campo.getAttribute("msg")) != true) {
                    resposta = false;
                }
            }

            if (resposta == true) {
                if (tipodado(campo, campo.getAttribute("tipodado"), campo.getAttribute("msg")) != true) {
                    resposta = false;
                }
            }
        }

    }

    if (resposta == false) {
        //****************************************************************
        //caso tenha aba
        //regra para descobrir de qual aba est· o objeto
        //****************************************************************
        if (document.getElementById("id_aba_atual")) {
            if (typeof(focusCampoAba) == "function") {
                if (focusCampoAba(campo)) {
                    return resposta;
                }
            }
        }
        //****************************************************************

        if (campo.getAttribute("abaAlvo") || campo.getAttribute("divAlvo")) {
            if (campo.getAttribute("abaAlvo")) {
                dados_aba = campo.getAttribute("abaAlvo").split(":");
                if (typeof(ativaAbaIA) == "function") {
                    ativaAbaIA(dados_aba[0], dados_aba[1], campo);
                } else {
                    if (campo.type != "hidden") {
                        campo.focus();
                    }
                }
            } else {
                $("#" + campo.getAttribute("divAlvo")).show();
                if ($("#controle_" + campo.getAttribute("divAlvo"))) {
                    $("#controle_" + campo.getAttribute("divAlvo")).val("M");
                }
            }
        } else {
            if (campo.type != "hidden") {
                if (!(typeof VESAO_INTERGRALL != 'undefined') || (typeof PASSOU_CHECA != 'undefined' && PASSOU_CHECA == true)) {
                    campo.focus();
                }
            }
        }
        if (!(typeof VESAO_INTERGRALL != 'undefined') || (typeof PASSOU_CHECA != 'undefined' && PASSOU_CHECA == true)) {
            if (campo.getAttribute("idAlvo")) {
                if (document.getElementById(campo.getAttribute("idAlvo")).type != "hidden") {
                    document.getElementById(campo.getAttribute("idAlvo")).focus();
                }
            }
        }
    }

    return resposta;
}

function DacOnlineRamalOpen() {
    AbreJanela2('https://' + window.location.host + '/callcenter/' + DacOnlineRamalOpen.arguments[0], 'DacNetRamalAgente', 480, 350, 'Dacnet Ramal', 'TL');
}

function transformaQString(form) {
    dados = '';
    for (var i = 0; i < form.length; i++) {
        var str_concat = "";
        if (i > 0) {
            str_concat = "&";
        }
        if (form[i].type == 'radio') {
            if (form[i].checked == true) {
                dados = dados + str_concat + form[i].name + '=' + encodeURIComponent(form[i].value);
            }
        } else if (form[i].type == 'select-multiple') {
            var selected = [];
            if (form[i].classList.contains('select_digitavel')) {
                selected = $('#' + form[i].id).select2('val'); //pega os elementos que est„o selecionado plugin select2
            } else {
                if ($('#' + form[i].id).val() != null) {
                    selected = $('#' + form[i].id).val(); //pega os elementos que est„o selecionado no combo multiplo
                }
            }

            if (selected.length > 0) { //caso tenha pelo menos 1 selecionado
                for (var s = 0; s < selected.length; s++) { //varre todos os itens selecionados
                    if (form[i].name.indexOf("[]") !== -1) { //verifica se existe [] no nome da variavel
                        var nome_var = form[i].name.replace(/(\[\])/g, ''); //remove para montar o array com indice abaixo
                    } else {
                        var nome_var = form[i].name;
                    }
                    //concatena os itens selecionados para chegar no php um array corretamente e n„o somente o primeiro elemento.
                    dados = dados + str_concat + nome_var + '[' + s + ']=' + encodeURIComponent(selected[s]);
                }
            } else {
                if (form[i].name.indexOf("[]") !== -1) { //verifica se existe [] no nome da variavel
                    var nome_var = form[i].name.replace(/(\[\])/g, ''); //remove para montar o array com indice abaixo
                } else {
                    var nome_var = form[i].name;
                }
                //gera o array apenas com a posiÁ„o  pois n„o tem nenhum item selecionado
                dados = dados + str_concat + nome_var + '[0]=' + encodeURIComponent(form[i].value);
            }
        } else { //para os demais tipos faz o que fazia antes
            dados = dados + str_concat + form[i].name + '=' + encodeURIComponent(form[i].value);
        }
    }
    return dados;
}

function checaInteligente(form, campo_chave_2, repre_regra) {
    var var_return = true;
    ajax = newAjaxObject();
    if (ajax) {
        ajax.open('POST', 'consistencia_regra.php', false);
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                var resposta = ajax.responseText;
                arr_resposta = resposta.split("|");
                if (arr_resposta[0] == "OK") {
                    arr_alert = arr_resposta[1].split("ß");
                    alert(arr_alert[0]);
                    var_return = false;
                } else {
                    var_return = true; //OK PASSOU NAS CONSISTENCIAS
                }
            }
        }
        ajax.send("repre_regra=" + repre_regra + "&campo_chave_2=" + campo_chave_2 + "&" + transformaQString(form));

        return var_return;
    } else {
        alert('Tente novamente, Caso o problema persista contate um Analista da URANET');
        return false;
    }
}

function downloadAnexo(str) {
    if (str == "") {
        alert('Selecione um Arquivo');
        if (document.getElementById('anexo')) {
            document.getElementById('anexo').focus();
        }
        return false;
    }

    var vars = '';
    arr = str.split(':');

    if ((arr[0] != "TABMAILENV") && (arr[0] != "TABMAILREC") && (arr[0] != "TABANEXO")) {
        if (arr[0] != "TMPDOC") {
            //FAX - DOCMAILFIXO - DOCFAXFIXO - FTP
            if (arr.length != 4) {
                return false;
            }
            if (arr[0] != "NAS") {
                vars = 'tipo=FTP';
            } else {
                vars = 'tipo=' + arr[0];
            }
            vars += '&servidor=' + arr[2] + '&diretorio=' + encodeURIComponent(arr[3]) + '&arquivo=' + encodeURIComponent(arr[1]);
        } else {
            //TMPDOC
            vars = 'tipo=' + arr[0] + '&seq=' + arr[1].toString() + '&arquivo=' + encodeURIComponent(arr[2]);
        }
    } else {
        //TABMAILENV - TABMAILREC - TABANEXO
        if (arr.length != 5) {
            return false;
        }
        if (isNaN(arr[3]) == true) {
            if (arr[0] == "TABMAILENV") {
                arr[3] = 1;
            } else {
                arr[3] = 2;
            }
        }
        if (arr[0] != "TABANEXO") {
            vars = 'tipo=' + arr[0].substring(3, 7) + '&origem=' + arr[0].substring(7);
        } else {
            vars = 'tipo=' + arr[0].substring(3);
        }
        vars += '&anomes=' + arr[1] + '&num=' + arr[2] + '&seq=' + arr[3].toString() + '&arquivo=' + encodeURIComponent(arr[4]);
    }

    ajax = newAjaxObject();
    if (ajax) {
        ajax.open('POST', '/ajax/FileExists.php', false);
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    if (ajax.responseText == 'OK') {
                        window.location = '/comp/download.php?' + vars;
                    } else {
                        alert(ajax.responseText.substring(3));
                    }
                }
            }
        }
        ajax.send(vars);
    } else {
        alert('Entre em contato com a supervis„o [DontSupport]');
    }
}

function utf8_encode(argString) {
    if (argString === null || typeof argString === "undefined") {
        return "";
    }

    var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    var utftext = "",
        start, end, stringl = 0;

    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.slice(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }

    if (end > start) {
        utftext += string.slice(start, stringl);
    }

    return utftext;
}

function utf8_decode(str_data) {

    var tmp_arr = [],
        i = 0,
        ac = 0,
        c1 = 0,
        c2 = 0,
        c3 = 0;

    str_data += '';

    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if (c1 > 191 && c1 < 224) {
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }

    return tmp_arr.join('');
}



function MKU(dado_xxxx_aux) {
    auxmku = MKUDecode(dado_xxxx_aux);
    eval("mku_xxxx_aux = " + auxmku + ";"); // n„o tirar esta linha por favor.. qualquer coisa falar com o david
    mku_xxxx_aux = mku_xxxx_aux.replace(/[¢]+/g, '_____');
    return MKUEncode(mku_xxxx_aux);
}



function MKUEncode(data) {

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = "",
        tmp_arr = [];

    if (!data) {
        return data;
    }

    //  data = this.utf8_encode(data + '');

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    var r = data.length % 3;

    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}

function MKUDecode(data) {

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        dec = "",
        tmp_arr = [];

    if (!data) {
        return data;
    }

    data += '';

    do { // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));

        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;

        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);

    dec = tmp_arr.join('');
    dec = this.utf8_decode(dec);

    return dec;
}
//SUBSTITUI OU REMOVE CARACTERES QUE N√O S√O ACEITOS NOS ENDERE«OS EM SISTEMAS DE TERCEIROS
function limpaEndereco(string) {
    if (string != null) {
        string = string.replace(/[\.]/, "");
        string = string.replace(/[\"'`¥]/, " ");
        string = string.replace(/[¿-≈]/, "A");
        string = string.replace(/[‡-Â]/, "a");
        string = string.replace(/[«]/, "C");
        string = string.replace(/[Á]/, "c");
        string = string.replace(/[»-À]/, "E");
        string = string.replace(/[Ë-Î]/, "e");
        string = string.replace(/[Ã-œ]/, "I");
        string = string.replace(/[Ï-Ô]/, "i");
        string = string.replace(/[—]/, "N");
        string = string.replace(/[Ò]/, "n");
        string = string.replace(/[“-÷]/, "O");
        string = string.replace(/[Ú-ˆ]/, "o");
        string = string.replace(/[Ÿ-‹]/, "U");
        string = string.replace(/[˘-¸]/, "u");
        string = string.replace(/[›]/, "Y");
        string = string.replace(/[˝]/, "y");
        string = string.replace(/[™]/, " A");
        string = string.replace(/[∫∞]/, " O");
    }

    return string;
}

function AbreJanelaFormMK(nome_janela, width, height, posicao, endereco, campos_mk) {
    if (!document.form_extra) {
        var node = document;
        var element = document.createElement('form');
        element.name = 'form_extra';
        node.appendChild(element);
    }

    //PRIMEIRO TENTA CRIAR O ELEMENTO POR COMPLETO DEVIDO A UM BUG DO IE8 OU ANTERIOR, QUE IMPEDE A CRIACAO DO ATRIBUTO 'NAME' VIA:
    // setAttribute:
    //Ex.: node.setAttribute('name', 'exemplo');
    //ou
    // acesso direto:
    //Ex.: node.name = 'exemplo';
    //
    //CASO N√O CONSEGUIR (OUTROS NAVEGADORES COM COMPILADOR PADR√O) UTILIZA O M…TODO PADR√O DE CRIA«√O DE ELEMENTOS
    if (!document.form_extra.form_campos_mk) {
        var node = document.form_extra;
        var element;

        try {
            element = document.createElement('<input type="hidden" name="form_campos_mk" value="">');
        } catch (e) {
            element = document.createElement("input");
            element.type = "hidden";
            element.name = "form_campos_mk";
        }

        node.appendChild(element);
    }

    if (!document.form_extra.tipo_popup) {
        var node = document.form_extra;
        var element;

        try {
            element = document.createElement('<input type="hidden" name="tipo_popup" value="">');
        } catch (e) {
            element = document.createElement("input");
            element.type = "hidden";
            element.name = "tipo_popup";
        }

        node.appendChild(element);
    }

    AbreJanela("about:blank", nome_janela, width, height, posicao);

    document.form_extra.form_campos_mk.value = campos_mk;
    document.form_extra.tipo_popup.value = "AJ2";

    document.form_extra.method = "POST";
    document.form_extra.target = nome_janela;
    document.form_extra.action = endereco;
    document.form_extra.submit();

    document.form_extra.form_campos_mk.value = "";
    document.form_extra.tipo_popup.value = "";

    document.form_extra.target = "";
    document.form_extra.action = "";
}

function verificaUsuarioUranet(login) {
    if (login.substring(0, 3) == "re0" || login.substring(0, 3) == "ra0" || login.substring(0, 3) == "rs0" || login.substring(0, 3) == "rb0" || login.substring(0, 3) == "rr0") {
        return true;
    } else {
        return false;
    }
}

function autoTab(event, element, selector) {
    var ignoredKeyCodes = ',9,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45,144,145,';

    if (ignoredKeyCodes.indexOf(',' + event.which + ',') > -1) {
        return true;
    }

    if (((event.which == 8) || (event.which == 46)) && (event.type == 'keydown')) {
        return true;
    }

    var $this = $(element);
    var curLen = $this.val().length;
    var maxLen = $this.attr('maxlength');

    if ((event.which == 8) && (curLen == 0)) {
        var fields = selector.filter(":visible");

        var index = fields.index(element);

        if (index > -1 && ((index - 1) < fields.length)) {
            var $prev = fields.eq(index - 1);
            $prev.focus();
            tmpStr = $prev.val();
            $prev.val('');
            $prev.val(tmpStr);
        }
    }

    if (curLen == maxLen) {
        var fields = selector.filter(":visible");

        var index = fields.index(element);

        if (index > -1 && ((index + 1) < fields.length)) {
            fields.eq(index + 1).focus();
        }
    }
}

function limpaTelefoneMK(id_ddd, id_telefone, id_ramal) {
    ddd_ant = $('#' + id_ddd).val(); //guarda o ddd digitado
    telefone = $('#' + id_telefone).val(); //guarda o telefone digitado
    telefone = telefone.replace(/[^0-9]+/g, ''); //remove tudo que n„o seja numÈrico
    telefone = telefone.replace(/^0+/g, ''); //remove 0 a esquerda
    tamanho_telefone = telefone.length;

    if (tamanho_telefone == '10' || tamanho_telefone == '11') { //verifica se o telefone foi digitado com DDD junto
        ddd = telefone.substring(0, 2); //pega o ddd digitado junto com o telefone
        telefone = telefone.substring(2, tamanho_telefone); //pega o telefone digitado
    } else {
        ddd = ""; //n„o tem ddd junto entao zera o ddd
        telefone = telefone.substring(0, 9); //pega o telefone digitado e limita o tamanho do telefone digitado a 9 que seria um telefone celular
    }

    $("#" + id_telefone).val(telefone); //atualiza o campo do telefone j· limpo

    if (ddd != "" && ddd_ant == "") { //caso tenha digitado o ddd junto com o telefone e n„o tenha digitado o ddd no campo ddd preenche o mesmo.
        $("#" + id_ddd).val(ddd);
    }

    qtd_pula = 8; //padrao pula com 8 digitos telefones fixo e nextel

    if (telefone.substring(0, 1) == 9) { //se for celular pula com 9 digitos
        qtd_pula = 9;
    }

    if (id_ramal != "") {
        pula($("#" + id_telefone)[0], qtd_pula, $("#" + id_ramal)[0]); //aciona a funÁ„o pula de acordo se È um celular ou n„o.
    }
}

function intergrallNotifyGeral(parametros) {
    var now = new Date();

    if (parametros.ico == "") {
        parametros.ico = "https://intergrall.com.br/images/logo_intergrall_login.png";
    }
    if (parametros.msg == "") {
        alert("Par‚metro [msg] inv·lido");
        return false;
    } else {
        if (parametros.msg.length > 197) {
            parametros.msg = parametros.msg.substring(0, 197) + "...";
        }
    }

    if (parametros.titulo == "") {
        parametros.titulo = "NotificaÁ„o IntergrALL";
    }
    if (parametros.funcao_click != "") {
        if (typeof parametros.funcao_click !== 'function') {
            alert("Par‚metro [funcao_click] inv·lido. Deve ser uma funÁ„o.");
            return false;
        }
    }

    if (parametros.tag_id == "") {
        parametros.tag_id = now.getMilliseconds();
    }

    if (parametros.tmp_fecha != "") {
        if (parseInt(parametros.tmp_fecha) < 1 || parseInt(parametros.tmp_fecha) > 20) {
            alert("Par‚metro [tmp_fecha] inv·lido. Deve ser entre 1 e 20 (segundos).");
            return false;
        }
        parametros.tmp_fecha = parseInt(parametros.tmp_fecha) * 1000;
    } else {
        parametros.tmp_fecha = 5000;
    }

    if (parametros.obrig != "S") {
        parametros.obrig = "N";
    }

    if (parametros.falar != "S" && parametros.falar != "V") {
        parametros.falar = "N";
        parametros.form_falar = "";
    } else {
        if (parametros.id_form_falar != '') {
            if (typeof($("#" + parametros.id_form_falar)[0]) != 'object') {
                alert("Par‚metro [id_form_falar] inv·lido.");
                return false;
            }
        }
        if (parametros.param_falar == "" || parametros.param_falar == "msg") {
            parametros.param_falar = parametros.msg;
        } else if (parametros.param_falar == "titulo") {
            parametros.param_falar = parametros.titulo;
        } else {
            alert("Par‚metro [param_falar] inv·lido. Somente [msg], [titulo] ou []");
            return false;
        }
    }

    // Vamos verificar se o navegador suporta notificaÁıes
    //  var compativel = "Notification" in window;
    var compativel = window.Notification;
    if (compativel) {
        //verificar se o usu·rio est· com a permiss„o para receber notificaÁ„o
        if (Notification.permission === "granted") {
            // Se estiver permiss„o, vamos criar uma notificaÁ„o
            var notification = new Notification(parametros.titulo, {
                icon: parametros.ico,
                body: parametros.msg,
                tag: parametros.tag_id
            });
            if (parametros.funcao_click) {
                notification.onclick = function() {
                    parametros.funcao_click.call(this);
                    this.close();
                };
            }
            setTimeout(notification.close.bind(notification), parametros.tmp_fecha);

            if (parametros.falar == "V") {
                var id_audio = "audio_" + parametros.tag_id + "_" + now.getMilliseconds();
                $("#div_notificacao_audio").remove();
                $("#" + parametros.id_form_falar).append("<div id='div_notificacao_audio'></div>");
                $("#div_notificacao_audio").html("<audio controls preload='auto' autoplay style='display: none;' id='" + id_audio + "'><source src='https://" + window.location.host + "/callcenter/docs.php?speech=true&text=" + parametros.param_falar + "' type='audio/wav' ></audio>");
            }
            // Caso contr·rio, precisamos pedir permiss„o ao usu·rio
            // ObservaÁ„o, o Chrome n„o implementa a propriedade est·tica de permiss„o
            // Ent„o temos que verificar se n„o est· 'denied' em vez de 'default'
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function(permission) {
                // Seja qual for o usu·rio responde, garantimos que o Chrome armazene as informaÁıes
                if (!('permission' in Notification)) {
                    Notification.permission = permission;
                }
                //Se o usu·rio estiver dado a periss„o, vamos criar uma notificaÁ„o
                if (permission === "granted") {
                    var notification = new Notification(parametros.titulo, {
                        icon: parametros.ico,
                        body: parametros.msg,
                        tag: parametros.tag_id
                    });
                    if (parametros.funcao_click) {
                        notification.onclick = function() {
                            parametros.funcao_click.call(this);
                            this.close();
                        };
                    }
                    setTimeout(notification.close.bind(notification), parametros.tmp_fecha);

                    if (parametros.falar == "V") {
                        var id_audio = "audio_" + parametros.tag_id + "_" + now.getMilliseconds();
                        $("#div_notificacao_audio").remove();
                        $("#" + parametros.id_form_falar).append("<div id='div_notificacao_audio'></div>");
                        $("#div_notificacao_audio").html("<audio controls preload='auto' autoplay style='display: none;' id='" + id_audio + "'><source src='https://" + window.location.host + "/callcenter/docs.php?speech=true&text=" + parametros.param_falar + "' type='audio/wav' ></audio>");
                    }
                }
            });
        } else {
            if (parametros.obrig == "S") {
                alert('AtenÁ„o! Ative a opÁ„o no seu navegador para receber notificaÁıes.');
            }
        }
    } else {
        //o navegador n„o È compatÌvel
        //console.log("Este navegador n„o suporta notificaÁıes.");
    }
}
// FunÁıes para validaÁ„o da linha digit·vel.
function linhaDigitavel(ldig) {

    // var ldig = document.querySelector("#linha_digitavel").value;
    if (ldig.length != 47) {
        // alert("Quantidade de caracteres inv·lida. (" + ldig.length + ")");
        return false;
    }

    // ValidaÁ„o do dÌgito por campo
    var cp1 = ldig.substr(0, 9);
    var dg1 = ldig.substr(9, 1);
    var cp2 = ldig.substr(10, 10);
    var dg2 = ldig.substr(20, 1);
    var cp3 = ldig.substr(21, 10);
    var dg3 = ldig.substr(31, 1);

    if (validaCampoLinha(cp1, dg1) !== true || validaCampoLinha(cp2, dg2) !== true || validaCampoLinha(cp3, dg3) !== true) {
        return false;
    }

    // ValidaÁ„o do dÌgito geral
    var dig;
    var pt1 = 0;
    var pt2 = 0;
    var pt3 = 0;
    var pt4 = 0;

    pt1 = parseInt(ldig.substr(30, 1)) * 2;
    pt1 += parseInt(ldig.substr(29, 1)) * 3;
    pt1 += parseInt(ldig.substr(28, 1)) * 4;
    pt1 += parseInt(ldig.substr(27, 1)) * 5;
    pt1 += parseInt(ldig.substr(26, 1)) * 6;
    pt1 += parseInt(ldig.substr(25, 1)) * 7;
    pt1 += parseInt(ldig.substr(24, 1)) * 8;
    pt1 += parseInt(ldig.substr(23, 1)) * 9;
    pt1 += parseInt(ldig.substr(22, 1)) * 2;
    pt1 += parseInt(ldig.substr(21, 1)) * 3;
    pt1 += parseInt(ldig.substr(19, 1)) * 4;
    pt1 += parseInt(ldig.substr(18, 1)) * 5;
    pt1 += parseInt(ldig.substr(17, 1)) * 6;

    pt2 = parseInt(ldig.substr(16, 1)) * 7;
    pt2 += parseInt(ldig.substr(15, 1)) * 8;
    pt2 += parseInt(ldig.substr(14, 1)) * 9;
    pt2 += parseInt(ldig.substr(13, 1)) * 2;
    pt2 += parseInt(ldig.substr(12, 1)) * 3;
    pt2 += parseInt(ldig.substr(11, 1)) * 4;
    pt2 += parseInt(ldig.substr(10, 1)) * 5;
    pt2 += parseInt(ldig.substr(8, 1)) * 6;
    pt2 += parseInt(ldig.substr(7, 1)) * 7;
    pt2 += parseInt(ldig.substr(6, 1)) * 8;
    pt2 += parseInt(ldig.substr(5, 1)) * 9;
    pt2 += parseInt(ldig.substr(4, 1)) * 2;

    pt3 = parseInt(ldig.substr(46, 1)) * 3;
    pt3 += parseInt(ldig.substr(45, 1)) * 4;
    pt3 += parseInt(ldig.substr(44, 1)) * 5;
    pt3 += parseInt(ldig.substr(43, 1)) * 6;
    pt3 += parseInt(ldig.substr(42, 1)) * 7;
    pt3 += parseInt(ldig.substr(41, 1)) * 8;
    pt3 += parseInt(ldig.substr(40, 1)) * 9;
    pt3 += parseInt(ldig.substr(39, 1)) * 2;
    pt3 += parseInt(ldig.substr(38, 1)) * 3;
    pt3 += parseInt(ldig.substr(37, 1)) * 4;
    pt3 += parseInt(ldig.substr(36, 1)) * 5;
    pt3 += parseInt(ldig.substr(35, 1)) * 6;
    pt3 += parseInt(ldig.substr(34, 1)) * 7;
    pt3 += parseInt(ldig.substr(33, 1)) * 8;

    pt4 = parseInt(ldig.substr(3, 1)) * 9;
    pt4 += parseInt(ldig.substr(2, 1)) * 2;
    pt4 += parseInt(ldig.substr(1, 1)) * 3;
    pt4 += parseInt(ldig.substr(0, 1)) * 4;

    dig = ((pt1 + pt2 + pt3 + pt4) * 10) % 11;
    dig = (dig == 0 || dig == 1 || dig == 10) ? 1 : dig;

    if (dig != parseInt(ldig.substr(32, 1))) {
        // alert("DÌgito verificador da linha digit·vel inv·lido.");
        return false;
    } else {
        return true;
    }
}

function validaCampoLinha(campo, dig) {
    var soma = 0;
    var aux = 0;
    for (var i = campo.length; i > 0; i--) {
        var mult;
        mult = aux % 2 == 0 ? parseInt(campo.substr(i - 1, 1)) * 2 : parseInt(campo.substr(i - 1, 1)) * 1;
        mult = mult > 9 ? (parseInt(mult.toString().substr(0, 1)) + parseInt(mult.toString().substr(1, 1))) : mult;
        soma += mult;
        aux++;
    }
    return ((soma % 10 == 0) && dig == 0) ? true : (10 - (soma % 10) == dig) ? true : false;
}


/*
re023418 Matheus H S 14/01/2019 -> abertura de janela/popup que permita alterar o timezone de um usu·rio. Utilizando amcharts4 para montar o mapa.
*/
function btnJanelaTimezone(nomeJanela, usuario, repre, tipoAbre) {
    if (tipoAbre == 'janela') {
        AbreJanela2('popup_timezone.php?usuario=' + usuario + '&repre=' + repre + '&janela=' + nomeJanela + '&tipoAbre=' + tipoAbre, nomeJanela, '80%', '80%', 'Selecionar TimeZone');
    } else {
        abrePopUpModal('Selecionar TimeZone', 'popup_timezone.php?usuario=' + usuario + '&repre=' + repre + '&janela=' + nomeJanela, nomeJanela, '80%', '80%');
    }
}