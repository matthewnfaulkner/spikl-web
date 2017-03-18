<?php
	session_start();
	require 'vendor/autoload.php';
	date_default_timezone_set('UTC');
	$client = new MongoDB\Client("mongodb://localhost:27017");
	$collection = $client->spikl->salts;
	$users = $client->spikl->users;
	$q = $_REQUEST["functionName"];
	if($q == "getFreshSalt"){
		$factory = new \RandomLib\Factory;
		$generator = $factory->getMediumStrengthGenerator();
		$salt = $generator->generateString(16, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz234567');
		$insert = ['salt' => $salt];
		$result = $collection->insertOne($insert);
		$id = $result->getInsertedId();
		echo $salt;
		}

	if($q == "getSalt"){
		$email = $_REQUEST["email"];
		$salt = $_REQUEST["salt"];
		$result = $users->findOne(['email' => $email]);
		if($result != 0){
			echo $result["salt"];
		}
		else{
			echo "no salt for you";
		}
	}

	if($q == "checkAndUpdate"){
		$pass = $_REQUEST["saltHash"];
		$salt =  $_REQUEST["salt"];
		$email = $_REQUEST["email"];
		$result = $collection->findOne(['salt' => $salt]);
		$user = $users->findOne(['email' => $email]);
		if($user != 0){
			if($user["password"] == $pass){
				echo "true ";
				$_SESSION["email"] = $email;
				echo htmlspecialchars(SID);
				exit();
		}
			else{
				echo "false";
			}
		}
		else{
			echo "User";
		}
	}

	if($q == "signUp"){
		$userName = $_REQUEST["userName"];
		$passWord = $_REQUEST["newSaltHash"];
		$salt = $_REQUEST["salt"];
		echo $salt;
		$insert = ['userName' => $userName, 'password' => $passWord, 'salt' => $salt];
		$users->insertOne($insert);
		echo "signed up";
	}

?>
