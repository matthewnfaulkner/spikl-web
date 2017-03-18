<?php
	require 'vendor/autoload.php';
	session_id($_REQUEST["sid"]);
	session_start();
        date_default_timezone_set('UTC');
        $client = new MongoDB\Client("mongodb://localhost:27017");
        $collection = $client->spikl->salts;
        $users = $client->spikl->users;
	if (!isset($_SESSION['email']) || empty($_SESSION['email'])) {
      		header("Location:login.php");
		exit();
     	}

	$result = $users->findOne(['email' => $_SESSION["email"]]);
//	echo json_encode([$result["languages"], $result["firstName"], $result["lastName"]]);
	$path = $result["picture"];
	$type = pathinfo($path, PATHINFO_EXTENSION);;
	$data = file_get_contents($path);
	$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
	echo json_encode([$result["languages"], $result["firstName"], $result["lastName"], $base64]);
//	header('Content-Type:'.$type);
//	header('Content-Length: ' . filesize($file));
//	readfile($file);
?>
