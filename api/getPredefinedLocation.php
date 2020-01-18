<?php

header('Access-Control-Allow-Origin: *');
define('AESKEY', '71d559e83650gg23');
include '../../db.php';

$sql = "SELECT REPLACE(LHC_NAMA_CAWANGAN, '-', ' - ') LHC_NAMA_CAWANGAN, LHC_SINGKATAN, LHC_ID FROM LKP_HR_CAWANGAN ORDER BY 1";
$rs = $myQuery->query($sql, 'SELECT', 'NAME');

echo json_encode([
	"status" => $rs?"ok":"ko",
	"data" => $rs
]);