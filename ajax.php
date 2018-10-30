<?
$action = $_POST['action'];

switch($action) {
    case 'get-folders' :
        $folders = scandir($_SERVER['DOCUMENT_ROOT']. '/local/eq-fields');
        array_shift($folders);
        array_shift($folders);

        echo json_encode($folders);

        break;

    case 'add-field' :
        $fieldName = $_POST['field-name'];
        $fieldText = $_POST['field-text'];
        $folderName = $_POST['folder-name'] ? $_POST['folder-name'] : 'common';

        $response = [
            "status" => "unavailable"
        ];

        if($fieldName && $fieldText) {
            if(!file_exists($_SERVER['DOCUMENT_ROOT']. '/local/eq-fields/' .$folderName. '/' .$fieldName. '.php')) {
                file_put_contents($_SERVER['DOCUMENT_ROOT'] . '/local/eq-fields/' . $folderName . '/' . $fieldName . '.php', $fieldText);
                $response["status"] = "success";
            } else {
                $response["status"] = "already_exists";
            }
        }

        echo json_encode($response);

        break;

    case 'add-folder' :

        $folderName = $_POST['new-folder-name'];

        $response = [
            "status" => "unavailable"
        ];

        if (!file_exists($_SERVER['DOCUMENT_ROOT']. '/local/eq-fields/' .$folderName)) {
            mkdir($_SERVER['DOCUMENT_ROOT']. '/local/eq-fields/' .$folderName, 0777, true);
            $response["status"] = "success";
        } else {
            $response["status"] = "already_exists";
        }

        echo json_encode($response);

        break;
}


