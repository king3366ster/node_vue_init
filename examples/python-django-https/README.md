1.安装django依赖
django-extensions 
django-werkzeug-debugger-runserver 
pyOpenSSL 
执行pip install命令安装：
pip install django-extensions
pip install django-werkzeug-debugger-runserver
pip install pyOpenSSL

2.配置settings.py

原来的settings.py  
加入以下两行：

    'werkzeug_debugger_runserver',
    'django_extensions',


3.开启cmd，工作目录切换到项目的主目录下
执行
python manage.py runserver_plus --cert server.crt 127.0.0.1:7000