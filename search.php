<?php
        require 'vendor/autoload.php';
        date_default_timezone_set('UTC');
        $client = new MongoDB\Client("mongodb://localhost:27017");
        $collection = $client->spikl->salts;
        $users = $client->spikl->users;
        $q = $_REQUEST["functionName"];
        if($q == "searchByLang"){
                $language = $_REQUEST["lang"];
		$select = [];
		for($i=10; $i>=0; $i--){
                	$result = $users->find(['languages' => ['name' => $language, 'prof' => $i]]);
                	if($result != 0){
				foreach($result as $doc){
					$path = $doc["picture"];
        				$type = pathinfo($path, PATHINFO_EXTENSION);
					$data = file_get_contents($path);
        				$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
					array_push($select,  [$doc["languages"], $doc["firstName"], $doc["lastName"], $base64]);
               	 		}
			}
		}
		echo json_encode($select);
        }
?>
