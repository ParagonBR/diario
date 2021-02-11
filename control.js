/*
*
*Autor Josué Gomes
*/
function newRegistro(select){
    jQuery.ajax({
        url:'../diario-bordo/tipo-registro.php',
        dataType:'html',
        type:'post',
        data:{'tipo':select}
    }).done(function(resposta){
        jQuery('#add_registro').append(resposta);
    });
}
let reload_form = jQuery(document).on('change','#select_regis',function(){
    jQuery('#new_registro').remove();
    var element = jQuery(this);
    var select = element.val();
    if(select === '')
        jQuery('#new_registro').remove();
    else if (select === 'IN' || select === 'SR' || select === 'JO')
        newRegistro(select);
});


jQuery(document).on('change','#tipo_chamado',function(){

    var tipo= jQuery(this).val();

    if (tipo === 'Não Se Aplica'){
        jQuery("#n_chamado,#sistema,#impacto").removeAttr('required');
    }
    else{
        jQuery("#n_chamado,#sistema,#impacto").attr('required','required');
    }






});


/*
Controle do formulario
*/
jQuery(document).on('submit','#form_sr',function(){
    jQuery.ajax({
        url:'../diario-bordo/upload.php',
        type:'post',
        dataType:'html',
        data:
        {
            'case':'SR',
            'n_chamado': jQuery('#n_chamado').val(),
            'motivo': jQuery('#motivo').val(),
            'sistema': jQuery('#sistema').val(),
            'status': jQuery('#status').val(),
            'criacao': jQuery('#data').val(),
            'natureza': jQuery('#natureza').val(),
            'desc': jQuery('#desc').val()
        }
    }).done(function(resposta){
        console.log(resposta);
        if(resposta==='1'){
            jQuery.alert({
                title:'Sucesso',
                content:'Registro Salvo',
                type:'green',
                buttons:{
                    Fechar:{
                        text:'Fechar',
                        btnClass:'btn-red'
                    }
                }
            });
            jQuery('#form_sr')[0].reset();
        }else{
            jQuery.alert({
                title: 'Falha',
                content: 'Erro ao tentar salvar os dados, o chamado pode já existir na base',
                type: 'red',
                buttons: {
                    Fechar: {
                        text: 'Fechar',
                        btnClass: 'btn-red'
                    }
                }
            });
        }

    });
    return false;
});

jQuery(document).on('submit','#form_in',()=>{
    console.log(jQuery('#form_in').serialize())
    jQuery.ajax({
        url:'../diario-bordo/upload.php',
        dataType:'html',
        type:'post',
        data:{
            'case':'IN',
            'n_chamado': jQuery('#n_chamado').val(),
            'sistema': jQuery('#sistema').val(),
            'tipo': jQuery('#tipo_chamado').val(),
            'impacto': jQuery('#impacto').val(),
            'datainicio': jQuery('#datainicio').val(),
            'datafim': jQuery('#datafim').val(),
            'canal': jQuery('#canal').val(),
            'cat': jQuery('#cat').val(),
            'segmento': jQuery('#segmento').val(),
            'comentario': jQuery('#comentario').val(),
            'status': jQuery('#status').val(),
            'n_noc': jQuery('#n_noc').val(),
            'pqa': jQuery('#pqa').val(),
            'retorno':jQuery('#r1h').val()
        },
        error:(err)=>{console.log(err)},
        success:(result)=>{
            jQuery.alert({
                title: 'Sucesso',
                content: 'Adicionado com Sucesso',
                type: 'green',
                buttons: {
                    fechar: {
                        text: 'Fechar',
                        btnClass: 'btn-red',
                        action: function () {
                            jQuery('#form_in')[0].reset()
                        }
                    }
                }
            
            });
            console.log(result)
        }
    })
    return false
})



jQuery(document).on('submit','#form_po',()=>{
    var form = new FormData(document.getElementById('form_po'));
    jQuery.ajax({
        url:'../diario-bordo/upload_po.php',
        type:'post',
        dataType:'html',
        contentType: false,
        processData: false,
        cache: false,
        data:form,
        success: (resposta) => {
            jQuery.alert({
                title: 'Sucesso',
                content: 'Adicionado com Sucesso',
                type: 'green',
                buttons: {
                    fechar: {
                        text: 'Fechar',
                        btnClass: 'btn-red',
                        action: function () {
                            jQuery('#form_po')[0].reset()
                        }
                    }
                }
            
            });
            console.log(resposta);
        },
        error: (resposta) => {
            

            jQuery.alert({
                title: 'Falha',
                content: 'teste',
                type: 'red',
                buttons: {
                    fechar: {
                        text: 'Fechar',
                        btnClass: 'btn-red'
                    }
                }
            });

console.log(resposta);
        }
    })
    return false
})