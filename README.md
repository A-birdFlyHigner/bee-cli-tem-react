# 小区乐新版后台

> 基于 React + LePage 的脚手架项目

## 目录结构

### 路由配置

### Host

``` 
# local
127.0.0.1 test-life-seller.51bushou.com

# test
空
```

- 清除host

```
chrome://net-internals/#sockets
```

### Nginx

- /usr/local/etc/nginx/nginx.conf

```
# 引入自己定义的config
include my_conf/*.conf;
```

- my_conf/life_seller.conf

``` conf
server {
    listen       80;
    server_name  test-life-seller.51bushou.com;

    location ^~ /(leadmin|lebranch|lesupplier)/ {
        # rewrite ^(.*)[^.(js|css|png|jpg|jpeg|gif)]$ / break;

        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host  $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_set_header Connection "";
        proxy_pass   http://127.0.0.1:8000/;
        proxy_redirect default ;
    }

    location /api/ {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host  $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_set_header Connection "";
        proxy_pass   http://101.37.228.181/api/;
        proxy_redirect default ;
    }

    location / {
        proxy_pass   http://127.0.0.1:8000/;
    }
}
```

- 启动

```
$ nginx
```

- 重启

```
$ nginx -s reload
```

- 停止

```
$ nginx -s stop
```
