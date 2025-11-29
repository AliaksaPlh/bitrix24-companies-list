# Bitrix24 Companies Fetcher

Приложение для получения и отображения списка компаний из Битрикс24 через REST API.

## Структура проекта

Проект состоит из двух независимых частей:

- **server** - Node.js сервер (Express)
- **client** - React приложение

## Установка и запуск

### Сервер (Node.js)

1. Перейдите на сервер:

```bash
cd server
```

2. Установите зависимости:

```bash
npm install
```

3. Создайте файл `.env` на основе `.env.example`:

```bash
cp .env.example .env
```

4. Запустите сервер:

```bash
npm start
```

Сервер доступен по адресу: `http://localhost:3010`

### Клиент (React)

1. Откройте новый терминал и перейдите в директорию клиента:

```bash
cd client
```

2. Установите зависимости:

```bash
npm install
```

3. Запустите React приложение:

```bash
npm start
```

Приложение откроется автоматически в браузере по адресу: `http://localhost:3000`

## Использование

1. Запустите сервер и клиент (в разных терминалах)
2. В инпут введите URL вебхука Битрикс24
3. Нажмите "Загрузить"
4. Дождитесь загрузки данных
5. Получите список компаний

## Формат вебхука

Вебхук должен иметь следующий формат:

```
https://your-domain.bitrix24.ru/rest/1/webhook_code/
```

Где:

- `your-domain` - домен вашего Битрикс24
- `webhook_code` - код вебхука, полученный в настройках Битрикс24

## API Endpoints

### GET /health

Проверка работоспособности сервера.

```
http://localhost:3010/health
```

### POST /api/companies

Получение списка компаний из Битрикс24 (по 50 за раз)

**Тело запроса:**

```json
{
  "webhook": "https://your-domain.bitrix24.ru/rest/1/webhook_code/",
  "limit": 10000
}
```

**Ответ:**

```json
{
  "success": true,
  "count": 10000,
  "companies": [arr of companies]
}
```

## Технологии

**Сервер:**

- Node.js
- Express
- Axios
- CORS

**Клиент:**

- React 18
- Axios
- CSS3
