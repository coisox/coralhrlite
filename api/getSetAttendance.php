<?php

header('Access-Control-Allow-Origin: *');
define('AESKEY', '71d559e83650gg23');
include '../../db.php';

//=============================================== checking key
$USERID = openssl_decrypt($_POST['key'], "AES-256-CBC", AESKEY, 0, AESKEY);
if(!$USERID) {
	echo json_encode(["status" => "ko", "message" => "Invalid key"]); die;
}

//=============================================== getting user info
$sql = "
	SELECT A.STF_NOKP_BARU KM_NOKP_STAFF, B.NAME KM_NAMA_STAF
	FROM HR_STAF_PERIBADI A, PRUSER B
	WHERE A.STF_USERNAME = B.USERNAME AND B.USERID = '".$USERID."'
";
$rs = $myQuery->query($sql, 'SELECT', 'NAME');
if(!$rs) {
	echo json_encode(["status" => "ko", "message" => "Missing user profile"]); die;
}

//=============================================== checking prior action
$in = ($_POST['type']=='checkin');
$sql = "
	SELECT
		KM_KOD_TRANSAKSI,
		CASE
			WHEN KM_MASA = '".$_POST['KM_MASA']."' THEN 1
			ELSE 0
		END TOO_EARLY,
		CASE
			WHEN KM_KOD_TRANSAKSI = 'Cz' THEN 1
			ELSE 0
		END PREV_CHECK_IN
	FROM ENCHR.HR_KELUARMASUK
	WHERE
		KM_NOKP_STAFF = '".$rs[0]['KM_NOKP_STAFF']."'
		AND TO_CHAR(KM_TARIKH, 'YYYY-MM-DD') = '".$_POST['KM_TARIKH']."'
		AND NVL(KM_ORG_SUBCODE, KM_ORG_SUBCODE_NEW) = '".($_POST['KM_ORG_SUBCODE']?:$_POST['KM_ORG_SUBCODE_NEW'])."'
	ORDER BY KM_ID DESC
";
$rs2 = $myQuery->query($sql, 'SELECT', 'NAME');

//first time
if(!$rs2) {
	if(!$in) {
		echo json_encode(["status" => "ko", "message" => "Please check in before check out"]); die;
	}
}
//previous is check in
else if($rs2[0]['PREV_CHECK_IN']) {
	if($in) {
		echo json_encode(["status" => "ko", "message" => "You had already check in"]); die;
	}
	else if($rs2[0]['TOO_EARLY']) {
		echo json_encode(["status" => "ko", "message" => "Check out must be at least 1 minute after check in."]); die;
	}
}
//previous is check out
else if(!$rs2[0]['PREV_CHECK_IN']) {
	if(!$in) {
		echo json_encode(["status" => "ko", "message" => "You had already check out"]); die;
	}
	else if($rs2[0]['TOO_EARLY']) {
		echo json_encode(["status" => "ko", "message" => "Check in must be at least 1 minute after check out."]); die;
	}
}

//=============================================== finally
$sql = "
	INSERT INTO ENCHR.HR_KELUARMASUK (
		KM_ID,
		KM_TARIKH,
		KM_MASA,
		KM_NAMA_STAF,
		KM_KOD_TRANSAKSI,
		KM_KOD_KETERANGAN,
		KM_ORG_CODE,
		KM_ORG_SUBCODE,
		KM_TRK_CIPTA,
		KM_NOKP_STAFF,
		KM_ORG_SUBCODE_NEW,
		KM_CAWANGAN_ID
	) VALUES (
		HR_KELUARMASUK_ID_SEQ.nextval,
		TO_DATE('".$_POST['KM_TARIKH']."', 'YYYY-MM-DD'),
		'".$_POST['KM_MASA']."',
		'".$rs[0]['KM_NAMA_STAF']."',
		'".($_POST['type']=='checkin'?'Cz':'Cy')."',
		'".($_POST['type']=='checkin'?'EDF Check In':'EDF Check Out')."',
		'ENC',
		'".$_POST['KM_ORG_SUBCODE']."',
		CURRENT_DATE,
		'".$rs[0]['KM_NOKP_STAFF']."',
		'".$_POST['KM_ORG_SUBCODE_NEW']."',
		'".$_POST['KM_CAWANGAN_ID']."'
	)
";
			
$myQuery->query($sql, 'RUN');
echo json_encode(["status" => "ok"]);