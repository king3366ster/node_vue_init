# node_npm_init
npm init framework for webpack and postcss (frontend) and koa(nodejs)/django(python) (backend) with babel for es6 compatible

## mark
css/js/html in webapp directory is just a practice for testing vue/vue-router/postcss/babal configures which checks whether the webpack/postcss is right or not. 

## usage
1. config the backend project (like proj in examples) & cd into the root directory
2. enter "npm install"
3. enter "npm run dev" to build webpack/postcss configs (often runtime）
4. start server & enjoy

## project in examples (for test)
1. python-django
- frontend build: 
npm run dev
- server start: 
python manage.py runserver [host:port]

2. node-koa
- frontend build: 
npm run dev
- server start: 
npm start
