<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <title>Генератор полей</title>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="script.js?v=<?= time(); ?>"></script>
    <link rel="stylesheet" href="style.css?v=<?= time(); ?>">
</head>

<body>

<div class="content">
    <div class="container">

        <div class="container-block container-block-forms">
            <form class="add-field">

                <div class="eq-input-item">
                    <div class="eq-input-label">Имя поля:</div>
                    <div class="eq-input-line">
                        <div class="input-container">
                            <input type="text" name="field-name" required>
                        </div>

                        <div class="select-input-plus" data-incerement-field-trigger>
                            <img src="img/plus.png" alt="">
                        </div>
                    </div>
                </div>

                <div class="eq-input-item">
                    <div class="eq-input-label">Текст поля:</div>
                    <div class="input-container">
                        <textarea name="field-text" required></textarea>
                    </div>
                </div>

                <div class="eq-input-item">
                    <div class="eq-input-label">Группа:</div>

                    <div class="eq-input-line">
                        <div class="input-container select-input-container" data-select-container>
                            <input name="folder-name" type="text" class="eq-input eq-select" value="" readonly  data-select-input>
                            <div class="select-options" data-select-options-parent>

                            </div>
                            <div class="select-input-arrow"></div>
                        </div>

                        <div class="select-input-plus" data-add-folder-trigger>
                            <img src="img/plus.png" alt="">
                        </div>
                    </div>

                </div>

                <div class="eq-input-item">
                    <input type="submit" value="Добавить поле">
                </div>
            </form>
            <form class="add-folder">
                <div class="eq-input-item">
                    <div class="eq-input-label">Название группы</div>
                    <div class="input-container">
                        <input type="text" name="new-folder-name">
                    </div>
                </div>

                <div class="eq-input-item">
                    <input type="submit" value="Добавить группу">
                </div>

            </form>
        </div>

        <div class="container-block container-block-text">
            <div class="text-output" data-text-output></div>
        </div>


    </div>
</div>

</body>

</html>