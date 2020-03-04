<?php
$emailTo = "pikpr.dev@gmail.com";
$content = "";
$projectName = "VL логистик";

$headers = "MIME-Version: 1.0" . PHP_EOL .
    "Content-Type: text/html; charset=utf-8" . PHP_EOL .
    'From: '.adopt($projectName).' <'.$emailTo.'>' . PHP_EOL .
    'Reply-To: '.$emailTo.'' . PHP_EOL;
// Проверяем тип запроса, обрабатываем только POST

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // согласие на обработку персональных данных
    if (!empty($_POST["user_agreement"])) {
        // Получаем параметры, посланные с javascript
        $name = $_POST['user_name'];
        $phone = $_POST['user_phone'];
        $email = $_POST["user_email"];
        $comment = $_POST["user_comment"];

        if (!empty($name)) {
            $content .= "{$name} оставил заявку с формы обратной связи<br>";
        }
        if (!empty($phone)) {
            $content .= "Телефон отправилтеля: {$phone}<br>";
        }
        if (!empty($email)) {
            $content .= "E-mail отправителя: {$email}<br>";
        }
        if (!empty($comment)) {
            $content .= "Комментарий отправителя: <br> {$comment}";
        }

        // Первый параметр - кому отправляем письмо, второй - тема письма, третий - содержание
        $success = mail($emailTo, 'Заявка с формы обратной связи', $content, $headers);

        if ($success) {
            // Отдаем 200 код ответа на http запрос
            http_response_code(200);
            echo "Письмо отправлено";
        } else {
            // Отдаем ошибку с кодом 500 (internal server error).
            http_response_code(500);
            echo "Письмо не отправлено";
        }
    }
    // Если не согласен
    else {
        // Отдаем ошибку с кодом 500 (internal server error).
        http_response_code(500);
        echo "Письмо не отправлено";
    }
} else {
    // Если это не POST запрос - возвращаем код 403 (действие запрещено)
    http_response_code(403);
    echo "Данный метод запроса не поддерживается сервером";
}

function adopt($text) {
    return '=?UTF-8?B?'.Base64_encode($text).'?=';
}