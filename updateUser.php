<?php
        require 'vendor/autoload.php';
        session_id($_REQUEST["sid"]);
        session_start();
        date_default_timezone_set('UTC');
        $client = new MongoDB\Client("mongodb://localhost:27017");
        $collection = $client->spikl->salts;
        $users = $client->spikl->users;
        if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {
                header("Location:login.php");
                exit();
        }
	$language = $_REQUEST["language"];
	$prof = 3;
        $result = $users->updateOne(['userName' => $_SESSION["email"]],  ['$set' => ['languages' => ['language' => ['name' => $language, 'prof' => $prof]]]]);
?>

