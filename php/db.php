<?php

    $conexao = mysqli_connect(HOST, USER, PASSWORD, DATABASE);

    if (mysqli_connect_errno($conexao)) {
        die("Problemas para conectar no banco. Verifique os dados!");
    }

?>