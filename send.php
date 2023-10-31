<?php
error_reporting(0);
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Отримання даних з форми
    $name = $_POST["user_name"];
    $email = $_POST["user_email"];
    $service = $_POST["service"];
    if (isset($service)) {
        $service = implode(', ', $service);
    } else {
        $service = "Service not selected";
    }

    $price = $_POST["price"];
    if (isset($price)) {
        $price = implode(', ', $price);
    } else {
        $price = "Price not selected";
    }

    if (isset($_FILES["file"])) {
        $file_name = $_FILES["file"]["name"];
        $file_tmp = $_FILES["file"]["tmp_name"];
        $file_size = $_FILES["file"]["size"];

        $destination = "uploads/" . $file_name;
        move_uploaded_file($file_tmp, $destination);
    } else {
        $file_name = "No file uploaded";
    }

    $token = "6433430469:AAFnptbwcmoQ6-nmwDUjHmYVjA2YJptDimQ";
    $group_chat_id = -4065477019;


    $message = "<b>Name:</b> $name\n<b>E-mail:</b> $email\n<b>Service:</b> $service\n<b>Price:</b> $price\n<b>File:</b> $file_name";

    // Відправка повідомлення в Telegram
    $telegram_url = "https://api.telegram.org/bot{$token}/sendMessage?chat_id={$group_chat_id}&parse_mode=html&text=" . urlencode($message);
    $result = file_get_contents($telegram_url);

    // Відправка даних на електронну пошту
    $to = "sketch2site@gmail.com";
    $subject = "New Project Request from $user_name";
    $email_message = "Name: $name\nE-mail: $email\nService: $service\nPrice: $price";
    $headers = "From: $email";

    if (isset($file_path)) {
        $boundary = md5(time());
        $headers .= "\r\nMIME-Version: 1.0\r\nContent-Type: multipart/mixed; boundary=\"$boundary\"";
        $email_message = "--$boundary\r\nContent-Type: text/plain; charset=us-ascii\r\nContent-Transfer-Encoding: 7bit\r\n\r\n$email_message\r\n\r\n";
        $file = file_get_contents($file_path);
        $file = base64_encode($file);
        $email_message .= "--$boundary\r\nContent-Type: application/octet-stream; name=\"$file_name\"\r\nContent-Transfer-Encoding: base64\r\nContent-Disposition: attachment\r\n\r\n$file\r\n\r\n";
    }
	 if ($result) {
        // Відправлено успішно
        header('Location: index.html');
        exit;
    }
}
?>
