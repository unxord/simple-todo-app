# To-Do List - Pet Project

[![Node.js Version](https://img.shields.io/badge/node-v20.19.2-blue.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Material UI](https://img.shields.io/badge/Material%20UI-7.0.2-0081CB?logo=mui&logoColor=white)](https://mui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📝 Описание

Это pet-проект, представляющий собой веб-приложение для управления списком задач (To-Do List). Приложение разработано с использованием современного стека технологий, включая React, TypeScript и Material UI, и демонстрирует реализацию стандартных и некоторых продвинутых функций для подобных приложений.

## 🚀 Демо

Демо-версия приложения доступна по адресу: [simple-todo-app-wheat.vercel.app](https://simple-todo-app-wheat.vercel.app)

## ✨ Возможности

* **Создание:** Добавление новых задач с текстом, опциональным сроком выполнения и приоритетом
* **Просмотр:** Отображение всех задач в виде списка
* **Отметка выполнения:** Возможность пометить задачу как выполненную или активную с анимацией перехода
* **Удаление:** Удаление ненужных задач из списка
* **Массовое удаление:** Возможность удаления всех задач по текущему фильтру
* **Редактирование:** Изменение текста существующих задач
* **Установка срока:** Добавление и отображение даты, к которой задача должна быть выполнена
* **Установка приоритета:** Назначение приоритета задачам (Низкий, Средний, Высокий) и его визуальное отображение
* **Фильтрация задач:** Просмотр всех, только активных или только завершенных задач
* **Drag-and-Drop сортировка:** Изменение порядка задач в списке путем перетаскивания
* **Сохранение данных:** Все задачи, их статус, порядок и другие атрибуты сохраняются в `localStorage` браузера
* **Адаптивный дизайн:** Интерфейс адаптирован для разных размеров экранов благодаря Material UI
* **Смена темы:** Возможность переключения между светлой и темной темами оформления
* **Интернационализация:** Поддержка двух языков интерфейса (Русский / Английский) с возможностью переключения

## 🛠 Технологический стек

### Frontend
* **React** (v19.1.0) - библиотека для создания пользовательских интерфейсов
* **TypeScript** (v5.8.3) - типизированный JavaScript
* **Material UI** (v7.0.2) - компонентная библиотека для React
* **React Hook Form** - управление формами
* **@dnd-kit/core**, **@dnd-kit/sortable** - реализация Drag-and-Drop
* **@mui/x-date-pickers** - компоненты для выбора даты
* **date-fns** & **@date-io/date-fns** - работа с датами
* **react-i18next**, **i18next**, **i18next-browser-languagedetector** - интернационализация

### Сборка
* **Create React App** - инструмент для создания React-приложений

### Хранение данных
* **localStorage** - локальное хранилище браузера

## 📋 Требования

* Node.js v20.19.2 (рекомендуется)
* npm или yarn

## 🚀 Начало работы

### Установка

1. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/unxord/simple-todo-app.git
   cd simple-todo-app
   ```

2. **Установите зависимости:**
   ```bash
   npm install --legacy-peer-deps
   # или
   yarn install --legacy-peer-deps
   ```

3. **Запустите приложение в режиме разработки:**
   ```bash
   npm start
   # или
   yarn start
   ```
   Приложение откроется в вашем браузере по адресу `http://localhost:3000`.

## 📁 Структура проекта

```
simple-todo-app/
├── public/             # Статические файлы и index.html
├── src/                # Исходный код приложения
│   ├── components/     # Переиспользуемые React компоненты
│   │   ├── AddTaskForm
│   │   ├── TaskItem
│   │   ├── TaskList
│   │   └── TaskFilter
│   ├── hooks/          # Кастомные хуки
│   │   └── useTasks
│   ├── i18n/           # Конфигурация i18next
│   │   └── config.ts
│   ├── locales/        # Файлы переводов
│   │   ├── en/
│   │   └── ru/
│   ├── theme/          # Настройки темы Material UI
│   │   └── theme.ts
│   ├── types/          # TypeScript типы и интерфейсы
│   │   └── index.ts
│   ├── App.tsx         # Корневой компонент приложения
│   └── index.tsx       # Точка входа React приложения
├── .gitignore
├── package.json        # Зависимости и скрипты проекта
└── README.md          # Документация проекта
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функциональности (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте изменения в репозиторий (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📝 Лицензия

Этот проект распространяется под лицензией MIT. Подробности смотрите в файле [LICENSE](LICENSE).