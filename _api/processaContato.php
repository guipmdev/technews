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

// Read and normalize inputs. Trim and enforce reasonable length limits to
// avoid abuse. Keys match the fields submitted by _pages/contact.html.
$nome     = isset($_POST['nome'])     ? trim((string) $_POST['nome'])     : '';
$email    = isset($_POST['email'])    ? trim((string) $_POST['email'])    : '';
$mensagem = isset($_POST['mensagem']) ? trim((string) $_POST['mensagem']) : '';

if ($nome === '' || $email === '' || $mensagem === '') {
    http_response_code(422);
    exit('Todos os campos são obrigatórios.');
}

if (mb_strlen($nome) > 200 || mb_strlen($email) > 254 || mb_strlen($mensagem) > 5000) {
    http_response_code(422);
    exit('Um ou mais campos excedem o tamanho máximo permitido.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    exit('E-mail inválido.');
}

// Escape every value before echoing it back to prevent reflected XSS.
$safeNome     = htmlspecialchars($nome,     ENT_QUOTES | ENT_HTML5, 'UTF-8');
$safeEmail    = htmlspecialchars($email,    ENT_QUOTES | ENT_HTML5, 'UTF-8');
$safeMensagem = htmlspecialchars($mensagem, ENT_QUOTES | ENT_HTML5, 'UTF-8');

header('Content-Type: text/html; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

echo "Nome: {$safeNome} <br>";
echo "Email: {$safeEmail} <br>";
echo "Mensagem: {$safeMensagem} <br>";
