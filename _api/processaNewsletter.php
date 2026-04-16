<?php
// Only accept POST requests.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit('Method Not Allowed');
}

if (!isset($_POST['acao'])) {
    http_response_code(400);
    exit('Bad Request');
}

$email = isset($_POST['email']) ? trim((string) $_POST['email']) : '';

if ($email === '') {
    http_response_code(422);
    exit('O e-mail é obrigatório.');
}

if (mb_strlen($email) > 254) {
    http_response_code(422);
    exit('O e-mail excede o tamanho máximo permitido.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    exit('E-mail inválido.');
}

// Escape the value before echoing it back to prevent reflected XSS.
$safeEmail = htmlspecialchars($email, ENT_QUOTES | ENT_HTML5, 'UTF-8');

header('Content-Type: text/html; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

echo "Email: {$safeEmail} <br>";
echo "Obrigado por se registrar em nossa Newsletter! <br>";
