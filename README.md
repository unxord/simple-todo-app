# To-Do List - Pet Project

## Описание

Это pet-проект, представляющий собой веб-приложение для управления списком задач (To-Do List). Приложение разработано с использованием современного стека технологий, включая React, TypeScript и Material UI, и демонстрирует реализацию стандартных и некоторых продвинутых функций для подобных приложений.

Данные сохраняются локально в браузере пользователя с помощью `localStorage`.

## Возможности

* **Создание:** Добавление новых задач с текстом, опциональным сроком выполнения и приоритетом.
* **Просмотр:** Отображение всех задач в виде списка.
* **Отметка выполнения:** Возможность пометить задачу как выполненную или активную.
* **Удаление:** Удаление ненужных задач из списка.
* **Редактирование:** Изменение текста существующих задач.
* **Установка срока:** Добавление и отображение даты, к которой задача должна быть выполнена.
* **Установка приоритета:** Назначение приоритета задачам (Низкий, Средний, Высокий) и его визуальное отображение.
* **Фильтрация задач:** Просмотр всех, только активных или только завершенных задач.
* **Drag-and-Drop сортировка:** Изменение порядка задач в списке путем перетаскивания.
* **Сохранение данных:** Все задачи, их статус, порядок и другие атрибуты сохраняются в `localStorage` браузера.
* **Адаптивный дизайн:** Интерфейс адаптирован для разных размеров экранов благодаря Material UI.
* **Смена темы:** Возможность переключения между светлой и темной темами оформления.
* **Интернационализация:** Поддержка двух языков интерфейса (Русский / Английский) с возможностью переключения.

## Технологический стек

* **Frontend:**
    * React (v18+)
    * TypeScript
    * Material UI (MUI v5) - для UI компонентов и стилизации
    * React Hook Form - для управления формами
    * `@dnd-kit/core`, `@dnd-kit/sortable` - для реализации Drag-and-Drop
    * `@mui/x-date-pickers` - для выбора даты
    * `date-fns` & `@date-io/date-fns` - для работы с датами
    * `react-i18next`, `i18next`, `i18next-browser-languagedetector` - для интернационализации
* **Сборка:** Create React App
* **Хранение данных:** `localStorage` браузера

## Начало работы

Для запуска проекта локально выполните следующие шаги:

1.  **Клонируйте репозиторий:**
    ```bash
    git clone https://github.com/unxord/simple-todo-app.git
    ```
    ```bash
    cd simple-todo-app
    ```

2.  **Установите зависимости:**
    Убедитесь, что у вас установлены Node.js (рекомендуется LTS версия) и npm (или yarn).
    ```bash
    npm install
    ```
    или
    ```bash
    yarn install
    ```

3.  **Запустите приложение в режиме разработки:**
    ```bash
    npm start
    ```
    или
    ```bash
    yarn start
    ```
    Приложение откроется в вашем браузере по адресу `http://localhost:3000`.

## Структура проекта

```
simple-todo-app/
├── public/             # Статические файлы и index.html
├── src/                # Исходный код приложения
│   ├── components/     # Переиспользуемые React компоненты (AddTaskForm, TaskItem, TaskList, TaskFilter)
│   ├── hooks/          # Кастомные хуки (useTasks)
│   ├── i18n/           # Конфигурация i18next (config.ts)
│   ├── locales/        # Файлы переводов (en/translation.json, ru/translation.json)
│   ├── theme/          # Настройки темы Material UI (theme.ts)
│   ├── types/          # TypeScript типы и интерфейсы (index.ts)
│   ├── App.tsx         # Корневой компонент приложения
│   ├── index.tsx       # Точка входа React приложения
│   └── ...             # Другие файлы конфигурации
├── .gitignore
├── package.json        # Зависимости и скрипты проекта
└── README.md           # Этот файл
```

## MIT License

Copyright (c) 2025 unxord

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
