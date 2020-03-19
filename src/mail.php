<?php

$siteKey = "6LeXKt8UAAAAAIjeFbwzyhhfH_4rLT3zBJ6CTwqZ";
$secretKey = "6LeXKt8UAAAAAJtgWaJt8zMz3xEKCeUa27dik3Yc";
$verifyURL = "https://www.google.com/recaptcha/api/siteverify";
$recaptchaResponse = $_POST['g-recaptcha-response'];
$data = array(
    'secret' => $secretKey,
    'response' => $recaptchaResponse
);

$emailTo = "vostok@vlogistic.ru";
$content = "";
$projectName = "VL логистик";

$headers = "MIME-Version: 1.0" . PHP_EOL .
    "Content-Type: text/html; charset=utf-8" . PHP_EOL .
    'From: ' . adopt($projectName) . ' <' . $emailTo . '>' . PHP_EOL .
    'Reply-To: ' . $emailTo . '' . PHP_EOL;

$myCurl = curl_init();
curl_setopt_array($myCurl, array(
    CURLOPT_URL => $verifyURL,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($data)
));
$response = curl_exec($myCurl);
curl_close($myCurl);

$result = json_decode($response, true);

// Проверяем тип запроса, обрабатываем только POST

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // согласие на обработку персональных данных
    if (!empty($_POST["user_agreement"])) {

        // не ввели капчу
        if (!$result['success']) {
            // Что-то не то с капчей
            http_response_code(500);

            die ("Сначала пройдите проверку");
        } else {
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

    } // Если не согласен
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

function adopt($text)
{
    return '=?UTF-8?B?' . Base64_encode($text) . '?=';
}