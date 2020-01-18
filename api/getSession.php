<?php

header('Access-Control-Allow-Origin: *');
define('AESKEY', '71d559e83650gg23');
include '../../db.php';

$sql = "SELECT USERID, NAME FROM PRUSER WHERE USERNAME = '".$_POST['username']."' AND USERPASSWORD = '".md5($_POST['password'])."'";
$rs = $myQuery->query($sql, 'SELECT', 'NAME');

echo json_encode([
	"status" => $rs?"ok":"ko",
	"session" => [
		"key" => openssl_encrypt($rs[0]['USERID'], 'AES-256-CBC', AESKEY, 0, AESKEY),
		"name" => $rs[0]['NAME']
	]
]);