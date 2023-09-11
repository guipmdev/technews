<?php
if(isset($_POST['acao'])){
    $email = $_POST['email'];

    echo "Email: $email <br>";
    echo "Obrigado por se registrar em nossa Newsletter! <br>";
}
?>