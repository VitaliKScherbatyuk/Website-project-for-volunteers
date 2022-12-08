<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exeption.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail -> CharSet = 'UTF-8';
$mail -> setLanguage('ua', 'phpmailer/language/');
$mail -> isHTML(true);

$mail -> setFrom('email');
$mail -> addAddress('vitaliktuhata@gmail.com');
$mail -> Subject = 'Повідомлення з сайту';

if(trim(!empty($_POST['name']))){
	$body.='<p><strong>Ім\'я:</strong>'.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
	$body.='<p><strong>Email:</strong>'.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['message']))){
	$body.='<p><strong>Повідомлення:</strong>'.$_POST['message'].'</p>';
}

if(!$mail -> send()){
	$message = 'Помилка відправлення';
}else {
	$message = 'Лист відправлено';
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);

?>