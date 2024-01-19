# Simple-CDN
Simple CDN source code using express

## Configuration 
add the following in `config.js`
- `port` -> default 8080
- `filesPath` -> path to files folder with `/` at the end, default: `./files/`

## End Points

1. ### Upload
  - Method: `POST`
  - URL: `https://<base>/upload/<file name>`
2. ### Delete
  - Method: `DELETE`
  - URL: `https://<base>/delete/<file name>`
3. ## Access
  - Method: `GET`
  - URL: `https://<base>/view/<file name>`

## Response 
```js
{
  status: 'ok',
  filename: 'lol.png',
  buffer: <Buffer>
}
```
```js
{
  status: 'error',
  message: 'Error occured'
}
```

## Discord
- https://discord.com/invite/xS8b8jQZZK
