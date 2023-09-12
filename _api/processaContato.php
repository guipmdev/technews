<?php
if(isset($_POST['acao'])){
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $mensagem = $_POST['telefone'];
    echo "Gênero: $nome <br>";
    echo "Email: $email <br>";
    echo "Telefone: $mensagem <br>";
}
?>