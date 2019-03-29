<?php

echo "\n\n";
echo "> Fetching data as JSON";
echo "\n\n";

$projectPath = realpath(dirname(dirname(__FILE__)));
$responsePath = $projectPath . DIRECTORY_SEPARATOR . 'scripts' . DIRECTORY_SEPARATOR . 'data.json';
$season = "1819";
$seasonFirebase = "2018-2019";
$urlFetch = "https://pkgstore.datahub.io/sports-data/english-premier-league/season-{$season}_json/data/121aec954d44d69659e8da82196f0997/season-{$season}_json.json";

system("curl {$urlFetch} > {$responsePath}");

echo "\n\n";
echo "> Reading JSON";
echo "\n\n";

// Read JSON file
$json = file_get_contents($responsePath);

// Replace Team Name to be equals firebase
$json = str_replace('Man United', 'Manchester United', $json);
$json = str_replace('Man City', 'Manchester City', $json);
$json = str_replace('Wolves', 'Wolverhampton', $json);

// Decode JSON
$jsonData = json_decode($json);

echo "\n\n";
echo "> Dividing JSON into pieces of 10";
echo "\n\n";

// Divide array in piece of 10
$jsonData = array_chunk($jsonData, 10);

$dataFinal = [
    "seasons" => [
        "{$seasonFirebase}" => $jsonData
    ]
];

echo "\n\n";
echo "> Finishing writing data";
echo "\n\n";

file_put_contents($responsePath, json_encode($dataFinal));
