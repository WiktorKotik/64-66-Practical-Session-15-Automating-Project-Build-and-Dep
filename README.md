# REC/Studio

Веб-приложение для студии звукозаписи, мой индивидуальный проект. В нём три страницы: лендинг для гостя, страница входа в личный кабинет и дашборд с ближайшими сессиями, альбомами и уведомлениями.

Этот репозиторий сделан для практической работы 64-66 «Автоматизация сборки и деплоя проекта через GitHub Actions/GitLab и Docker».

![Test and Build Docker Image](https://github.com/WiktorKotik/rec-studio/actions/workflows/build.yml/badge.svg)

Автор: Шумейко В. П., группа ПР-25.106, вариант 22.
ГБПОУ НСО «Новосибирский авиационный технический колледж имени Б.С. Галущака».
Дисциплина: Проектирование, разработка и оптимизация веб-приложений, специальность 09.02.07.

## Что сделано в работе

- проект упакован в Docker-образ на основе Nginx (файлы `Dockerfile` и `.dockerignore`);
- настроен workflow GitHub Actions в файле `.github/workflows/build.yml`;
- при каждом push в ветку main сначала проверяются html-страницы (правила в файле `.htmlhintrc`), потом собирается Docker-образ;
- готовый образ автоматически публикуется в GitHub Container Registry (GHCR);
- на pull request запускается только проверка страниц, образ не публикуется;
- пароли и ключи не хранятся в репозитории, для них используются GitHub Secrets.

## Структура проекта

```
rec-studio/
├── .github/
│   └── workflows/
│       └── build.yml
├── assets/
├── css/
├── js/
├── .dockerignore
├── .gitignore
├── .htmlhintrc
├── Dockerfile
├── dashboard.html
├── index.html
├── login.html
└── README.md
```

## Запуск в Docker

Нужен установленный Docker Desktop.

Собрать образ:

```
docker build -t rec-studio .
```

Запустить контейнер:

```
docker run -d -p 8080:80 --name recstudio-site rec-studio
```

После этого сайт открывается в браузере по адресу http://localhost:8080. Страница входа лежит по адресу `/login.html`, дашборд по адресу `/dashboard.html`.

Проверить контейнер и остановить его:

```
docker ps
docker stop recstudio-site
```

## Как работает GitHub Actions

Workflow называется Test and Build Docker Image и запускается при push в ветку main и при любом pull request.

1. Задание `test` скачивает код, ставит Node.js и проверяет все html-файлы программой htmlhint. Если в разметке есть ошибка, задание падает и сборка образа не начинается.
2. Задание `build` запускается только после успешного `test`, и только при push в main. Оно входит в GHCR с помощью `GITHUB_TOKEN`, собирает образ по Dockerfile и публикует его с двумя тегами: `latest` и хэш коммита.

Результаты запусков можно посмотреть на вкладке Actions. В истории есть неудачный запуск (в `dashboard.html` у картинки не было атрибута `alt`) и следующий за ним успешный после исправления.

## Готовый образ

Образ опубликован в разделе Packages этого репозитория. Скачать и запустить его можно так:

```
docker pull ghcr.io/WiktorKotik/rec-studio:latest
docker run -d -p 8080:80 ghcr.io/WiktorKotik/rec-studio:latest
```

## Pull Request

Для проверки работы с Pull Request была создана ветка `feature/login-text` с изменением текста на странице входа. Pull Request можно посмотреть на вкладке Pull requests. В нём видно, что проверка `test` прошла, а задание `build` было пропущено, так как образ публикуется только после слияния в main.
