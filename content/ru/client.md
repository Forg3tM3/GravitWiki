---
title: Клиент
description: ''
position: 7
category: 'Minecraft'
support:
-   Любой Vanilla версии с 1.7.10 до 1.18.1
-   Любой Forge версии с 1.7.10 до 1.16.5
-   Любой Fabric версии с 1.13 до 1.18.1
---
На текущий момент поддерживается запуск:

<list :items="support"></list>

## Скачивание клиента с зеркала

Список клиентов, доступных на зеркале можно посмотреть тут:  [клиенты](https://mirror.gravit.pro/clients/)  и  [ассеты](https://mirror.gravit.pro/assets/)

Выполните команду ```downloadclient ВЕРСИЯ НАЗВАНИЕ``` для скачки клиента
Выполните команду ```downloadasset ВЕРСИЯ НАЗВАНИЕ``` для скачки ассетов

<alert>Примечание

-   Для скачки клиента с стороннего зеркала вместе с профилем вам нужно использовать такую команду: ```downloadclient ВЕРСИЯ НАЗВАНИЕ mirror```   
-   Название папки ассетов как правило записывается в виде ```assetВЕРСИЯ```, например:  **asset1.7.10**,  **asset1.17.1**
-   Версии клиента 1.12.2 и ниже включают в себя Forge по умолчанию

</alert>

## Сборка Authlib (MineCraft до 1.16.4)

Для сборки Authlib следуйте инструкции:

-   Скопируйте файл  [authlib-clean](https://github.com/GravitLauncher/Launcher/blob/master/compat/authlib/authlib-clean.jar)  в папку libraries вашего клиента
-   Скопируйте из артефактов сборки файл LauncherAuthlib в папку libraries вашего клиента

## Сборка Authlib (MineCraft с 1.16.5-1.17.1)

Для сборки Authlib следуйте инструкции:

### Переименование
-   Скачайте файл  [LauncherAuthlib 2](https://mirror.gravit.pro/compat/authlib/2/LauncherAuthlib2-5.2.0.jar)
-   Переименуйте его в "0-launcher-authlib.jar" и скопируйте его в папку ```libraries/com/mojang/authlib/ВЕРСИЯ/``` вашего клиента

### Сборка
-   Скачайте файл  [LauncherAuthlib 2](https://mirror.gravit.pro/compat/authlib/2/LauncherAuthlib2-5.2.0.jar)
-   Откройте его архиватором и распакуйте папку com в отдельную папку
-   Откройте вашу authlib по пути ```libraries/com/mojang/authlib/ВЕРСИЯ/``` архиватором и вставьте с заменой файлы, распакованные на предыдущем этапе

## Сборка Authlib (MineCraft с 1.18 и выше)

Для сборки Authlib следуйте инструкции:

### Переименование
-   Скачайте файл  [LauncherAuthlib 3](https://mirror.gravit.pro/compat/authlib/3/LauncherAuthlib3.jar)
-   Переименуйте его в "0-launcher-authlib.jar" и скопируйте его в папку ```libraries/com/mojang/authlib/ВЕРСИЯ/``` вашего клиента

### Сборка
-   Скачайте файл  [LauncherAuthlib 3](https://mirror.gravit.pro/compat/authlib/3/LauncherAuthlib3.jar)
-   Откройте его архиватором и распакуйте папку com в отдельную папку
-   Откройте вашу authlib по пути ```libraries/com/mojang/authlib/ВЕРСИЯ/``` архиватором и вставьте с заменой файлы, распакованные на предыдущем этапе

## Настройка профиля

Список параметров профиля с пояснениями:

```json
{
  "title": "Vanilla1.17", // Заголовок профиля
  "uuid": "fa9c1a52-6fa9-4da6-a488-9fc80250095c", // UUID профиля (profileUUID)
  "version": "1.17", // Версия майнкрафта
  "info": "Информация о сервере", // Информация о сервере в окне выбора серверов
  "dir": "Vanilla1.17", // Папка клиента в updates
  "sortIndex": 0, // Порядковый номер в окне выбора серверов
  "assetIndex": "1.17", // Название используемого индекса в ассетах
  "assetDir": "asset1.17", // Папка с ассетами
  "update": [ // Список файлов и папок, которые будут перекачиваться при старте клиента
    "servers.dat"
  ],
  "updateExclusions": [], // Список файлов и папок, которые не надо проверять
  "updateVerify": [ // Список файлов и папок, которые будут перекачиваться при старте клиента и  во время работы
    "libraries",
    "natives",
    "minecraft.jar",
    "forge.jar",
    "liteloader.jar",
    "mods"
  ],
  "updateOptional": [], // Список опциональных модов и дополнительных аргументов
  "jvmArgs": [ // Аргументы JVM
    "-XX:+DisableAttachMechanism",
    "-XX:+UseG1GC",
    "-XX:+UnlockExperimentalVMOptions",
    "-XX:G1NewSizePercent\u003d20",
    "-XX:MaxGCPauseMillis\u003d50",
    "-XX:G1HeapRegionSize\u003d32M",
    "-Djava.library.path\u003dnatives",
    "-Dfml.ignorePatchDiscrepancies\u003dtrue",
    "-Dfml.ignoreInvalidMinecraftCertificates\u003dtrue"
  ],
  "classPath": [ // Список файлов и библиотек, загружаемых при запуске выбранным загрузчиком классов
    "libraries",
    "minecraft.jar",
    "forge.jar",
    "liteloader.jar"
  ],
  "altClassPath": [], // Список файлов и библиотек, загружаемых при запуске системным загрузчиком классов
  "clientArgs": [], // Дополнительные аргументы клиента
  "compatClasses": [], // Список дополнительных MainClass, которые будут запущены перед основным
  "properties": {}, // Кастомная информация о профиле
  "servers": [ // Список серверов
    {
      "name": "Vanilla1.17", // Название (serverName)
      "serverAddress": "localhost", // Адрес сервера
      "serverPort": 25535, // Порт сервера
      "isDefault": true, // По умолчанию
      "socketPing": true // Прямой пинг для получения онлайна
    }
  ],
  "classLoaderConfig": "LAUNCHER", // Тип загрузчика классов (LAUNCHER, AGENT, SYSTEM_ARGS)
  "runtimeInClientConfig": "NONE", // Запуск GUI рантайма при старте клиента (NONE, BASIC, FULL)
  "recommendJavaVersion": 16, // Рекомендуемая версия Java
  "minJavaVersion": 16, // Минимальная версия Java
  "maxJavaVersion": 999, // Максимальная версия Java
  "warnMissJavaVersion": true, // Предупреждение о несоответствии Java требованиям для запуска
  "settings": { // Настройки по умолчанию
    "ram": 0, // Количество ОЗУ (в мегабайтах), 0 - автоматически
    "autoEnter": false, //Авто—вход, может крашиться
    "fullScreen": false // Полноэкранный режим
  },
  "updateFastCheck": true, // Быстрая проверка файлов
  "limited": false, // Ограничен permissions
  "mainClass": "net.minecraft.client.main.Main" // MainClass клиента
}
```

<alert>Примечание:
-   ```limited``` так-же должен быть ```true```, для работы ```profileWhitelist```
</alert>

## Опциональные моды

```json
"updateOptional": [
    {
       "actions": [ //Список действий опционального мода
        { //Первое действие
          "files": {
            "mods/1.7.10/NotEnoughItems-1.7.10-1.0.5.118-universal.jar": "", //Простое добавление файла без переименований
            "mods/SuperStrangeMod0.jar": "mods/SuperStrangeMod.jar", //Добавление файла с перемещением. на стороне лаунчсервера файл находится по пути "mods/SuperStrangeMod0.jar", а в клиент он попадет сюда "mods/SuperStrangeMod.jar"
            "mods2/LowStrangeMod.jar": "mods/LowStrangeMod.jar", //Между папками перемещение тоже работает
            "config2/ic2": "config/ic2" //Перемещение папок тоже работает
          },
          "type": "file" //Тип действия - обработка файлов
        }
      ],
       "info": "Мод, показывающий рецепты", //Описание
       "visible": true, //Видимость
       "mark": true, //Включен по умолчанию
       "limited": false, //Ограничен permissions
       "permissions": 0, //Маска привилегий. 0 - мод для всех, 1 - только для админов.
       "name": "NotEnoughItems" //Имя
    },
    {
       "actions": [
        {
          "files": {
            "mods/Waila_1.5.10_1.7.10.jar": ""
          },
          "type": "file"
        }
      ],
       "info": "Мод, показывающий дополнительную информацию при наведении на блок",
       "name": "Walia",
       "permissions": 0,
       "visible": true,
       "dependenciesFile": [{"name":"NotEnoughItems"/* Имя зависимого мода */}],
       "conflictFile": [{"name":"ClientFixer"/* Имя конфликтующего мода */}],
       "subTreeLevel": 2  //Смещение относительно первого мода. Используется для создания визуального отображения дерева зависимостей
    },
    {
       "actions": [
         {
           "args": [
             "--add-modules",
             "jdk.unsupported"
           ],
           "type": "jvmArgs"
         }
       ],
       "triggers": [], //Триггеры, о них ниже
       "info": "Аргументы Java 9+",
       "visible": false,
       "permissions": 0,
       "name": "Java9Args"
    },
    {
       "actions": [
        {
          "files": {
            "mods/1.7.10/OptiFine_1.7.10_HD_U_E7.jar": ""
          },
          "type": "file"
        }
      ],
       "info": "Улучшение производительности",
       "permissions": 0,
       "visible": true,
       "name": "OptiFine HD"
    }
  ],
```
Триггеры - возможность включать опциональный мод при выполнении некоторых условий