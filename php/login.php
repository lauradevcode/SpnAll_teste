<?php

    
    require("config.php");
    require("db.php");

    session_start(); 

 

    if (isset($_POST['login'])) {

        $data = array();

        if(array_key_exists('cnpj', $_POST)){
            $data['cnpj'] =   filter_input(INPUT_POST, "cnpj", FILTER_SANITIZE_STRING);
        }

        if(array_key_exists('password', $_POST)){
            $data['password'] =   filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
        }

        var_dump($data);

        if(isset($data['cnpj']) && isset($data['password'])){
            if(!empty($data['cnpj']) && !empty($data['password']) ){

                $cliente = getUser($data, $conexao);

                if(!empty($cliente)){
                    $_SESSION['login_spnall_admin'] = true;
                    $_SESSION['cliente_spnall_admin'] = array('nome' => $cliente['nome'], 'email' => $cliente['email'], 'cnpj' => $cliente['cnpj']);
                    header('Location: '.INCLUDE_PATH.'pages/posloginfornecedor.html');
                    die();
                }

            }
        }


         //Falhou
         header('Location: '.INCLUDE_PATH.'pages/login.html');
         die();

    }

  
    function getUser($data, $conexao){
        $sqlBusca = 'SELECT * FROM `cliente` WHERE cnpj = "'.$data['cnpj'].'" AND senha = "'.$data['password'].'"';
    
        $resultado = mysqli_query($conexao, $sqlBusca);

        $cliente = array();

        while ($user = mysqli_fetch_assoc($resultado)) {
            $cliente[] = $user;
        }

        return $cliente;
    }



?>