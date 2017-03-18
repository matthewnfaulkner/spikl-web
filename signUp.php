<?php   
	require 'vendor/autoload.php';
	date_default_timezone_set('UTC');
        $client = new MongoDB\Client("mongodb://localhost:27017");
        $collection = $client->spikl->salts;
        $users = $client->spikl->users;
        $q = $_REQUEST["functionName"];
	if($q == "checkEmail"){
		$email = $_REQUEST["email"];
		$result = $users->findOne(['email'=> $email]);
		if($result != 0){
			echo "true";
		}
		else{
			echo "false";
		}
	}
	else{
		$email = $_POST["email"];
		$password = $_POST["password"];
		$salt = $_POST["salt"];
		$dob = $_POST["date"];
		$gender = $_POST["gender"];
		$study = $_POST["course"];
		$nationality = $_POST["nationality"];
		$firstName = $_POST["firstName"];
		$lastName = $_POST["lastName"];
		$target_dir = "uploads/" . $email;
		echo $target_dir;
		mkdir($target_dir, 0775, true);
		$path = $target_dir . "/" .  basename($_FILES["img"]["name"]);
		$ext = pathinfo($path, PATHINFO_EXTENSION);
		$target_file = $target_dir . "/profilePic." . $ext;
		$check = getimagesize($_FILES["img"]["tmp_name"]);
		if(move_uploaded_file($_FILES["img"]["tmp_name"], $target_file)){
			echo "hahha";
		}
		$insert = ['email'=> $email, 'password'=> $password, 'salt' => $salt, 'dob' => $dob, 'gender'=> $gender,
 'study'=> $study, 'nationality'=> $nationality, 'lastName' => $lastName, 'firstName'=> $firstName, 'picture' => $target_file];
		$result = $users->insertOne($insert);
		echo "yay";
	}

?>
