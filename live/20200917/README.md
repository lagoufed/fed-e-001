# 反馈问题

- vue ssr 鉴权、路由拦截、cookies传递问题
- vue  ssr 路由拦截     2.vue ssr 鉴权     3.vue ssr cookies传递问题
  - https://www.nuxtjs.cn/examples/auth-routes
  - https://www.nuxtjs.cn/examples/auth-external-jwt
  - https://www.nuxtjs.cn/guide/routing#%E4%B8%AD%E9%97%B4%E4%BB%B6

```js
export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    if (process.client) {
    }
  })
}
```

- ssr服务器端渲染跟pwa对比的差异，优缺点
- 希望能扩展讲下 nginx 等服务端工具的使用
- Nuxt.js遇到错误就跳转到Error页面，除了指定自定义的error页面，有没有办法直接阻止这个行为？
- 使用lerna发布过程中  gitHead 字段被添加了，但在发布完后又被删除了，这算正常么？gitHead 是做什么用的呢？
- gridsome的重写规则可以讲下么，如何为动态路由手动重定向？视频中没讲
  - https://gridsome.org/docs/dynamic-routing/#generating-rewrite-rules
- Nuxt属于同构渲染，那我们课程里的real-world这个案例的页面应该是服务端渲染吧，Nuxt是不是只是个使用了Vue语法的服务端的渲染？          
- Nuxt是前后端不分离模式的吗，还是说Nuxt依旧属于前端，只不过将部分渲染工作先在服务端完成了？     
- CI/CD自动化部署到远程服务器上的版本如何进行回退？
- pm2  启动 nuxt ，运行一段时间之后会报错切 无法自动重启。只能手动重启。     2. 关于 nuxt实际性能及生产环境部署方式

# 购买服务器/部署应用

- 47.242.35.65
- nllcoder.com
## 阿里云服务器 - CentOS 8
### 购买服务器

- [https://www.aliyun.com/product/ecs?spm=5176.6660585.h2v3icoap.14.496e6bf8b6KqcF](https://www.aliyun.com/product/ecs?spm=5176.6660585.h2v3icoap.14.496e6bf8b6KqcF)
- 购买香港节点（域名不需要备案）
- 系统选择的是 CentOS 8，或者其它系统

### 远程登录服务器
```bash
ssh root@47.242.35.65

curl https://www.google.com

ssh -D 1080 root@nllcoder.com
```
### SSH 免密登陆

- http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html
- 客户端操作
  - **使用 scp 的时候路径中不能有中文 ！**

```bash
# 生成密钥对
cd C:\Users\Administrator\.ssh
ssh-keygen

# 把公钥拷贝到服务器
scp nllcoder_com_rsa.pub root@nllcoder.com:/root/.ssh
```

- 客户端操作---修改本机的 .ssh/config 文件

```
Host nllcoder.com
HostName nllcoder.com
User root
PreferredAuthentications publickey
IdentityFile C:\Users\Administrator\.ssh\nllcoder_com_rsa
```

- 服务器

```bash
cd ~/.ssh
# 找到 authorized_keys 文件
# 把 nllcoder_com_rsa.pub 文件内容追加到 authorized_keys 文件末尾
cat >> authorized_keys < nllcoder_com_rsa.pub
# 重启 ssh 服务
systemctl restart sshd
```



### 安装 Node.js

- 使用 nvm 安装 Node.js
- [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
```bash
# 查看环境变量
echo $PATH

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
# 重新连接 ssh
nvm --version

# 查看环境变量
echo $PATH

# 安装 Node.js lts
nvm install --lts
```

- 安装 pm2
```bash
npm i pm2 -g
```

- pm2 log xx 查看出错日志

![image-20200917113125348](assets/image-20200917113125348.png)
## 部署 Nuxt.js 项目
### 手工部署

- baseURL: https://conduit.productionready.io

- .nuxt
- static
- nuxt.config.js
- package.json
- package-lock.json
- pm2.config.json
```bash
# 服务器 root 下创建 realworld 文件夹
mkdir realworld

# 本地运行
scp ./release.zip root@47.242.35.65:/home/realworld

cd realworld

# 服务器上解压
unzip release.zip

# 查看隐藏目录
ls -a

# 安装依赖
npm i

# npm run start
pm2 start npm -- start

pm2 start pm2.config.json

pm2 stop xxxx
```

### 服务器开放端口 - 3000、80

![image-20200917144747017](assets/image-20200917144747017.png)

![image-20200917144819689](assets/image-20200917144819689.png)

### 自动部署

#### Github

- 创建远程仓库
- 个人设置-Developer settings-Personal access tokens
   - eb3809d4386be83cbdffe294aca53a2372835dab
- 项目设置-Secrets

## 购买域名/域名解析

- https://homenew.console.aliyun.com/


## 部署 Vue.js 项目
### 安装 Nginx
```bash
yum install nginx

which nginx
nginx -v

# 启动 Nginx
nginx
nginx -s reload
nginx -s stop

# 检查配置文件是否 ok
nginx -t

# 

```
### Nginx 配置

- 备份配置文件
  - cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.default

- 修改配置文件路径
   - vim /etc/nginx/nginx.conf

- 查看错误日志
   - cat /var/log/nginx/error.log

### 部署 Vue.js 项目 - Node.js

- 查看运行 nginx 进程的账号

```
ps aux | grep nginx
```

- 更改 www 目录的所有者

```
chown nginx:nginx -R .
```

### Github actions 部署

- 安装 git

```bash
yum install git
```

- YML
```bash
name: Publish And Deploy Demo
on:
  push:
    branches:    
      - master

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    # 部署到服务器
    - name: Deploy
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        password: ${{ secrets.PASSWORD }}
        port: ${{ secrets.PORT }}
        debug: true
        script: |
          cd /tmp
          git clone http://github.com/goddlts/vue-deploy-demo.git
          cd /tmp/vue-deploy-demo
          chmod +x ./deploy.sh
          ./deploy.sh
```

- deploy.sh
```bash
#!/bin/bash

# 安装依赖
npm install
# 打包 
npm run build
# 删除 ngnix 指向的文件夹下得文件
rm -rf /home/www/*

# 将打包好的文件复制过去
mv /tmp/vue-deploy-demo/dist/*  /home/www
# 删除 clone 的代码
rm -rf /tmp/vue-deploy-demo
```
- 如果 nginx 启动失败，查看错误日志，权限问题，使用下面方式解决

```bash
# 查看错误日志
cat /var/log/nginx/error.log
cd /home/www
# 更改 www 目录的所有者
chown nginx:nginx -R .
```



## Nginx 配置**浏览器缓存**

- memory cache(内存缓存)
- disk cache(硬盘缓存) 
- 强缓存
   - <- cache-control: max-age=600
   - <- expires: Mon, 14 Sep 2020 09:02:20 GMT
- 协商缓存 
   - <- last-modified: Fri, 07 Aug 2020 02:35:59 GMT
   - -> if-modified-since: Fri, 07 Aug 2020 02:35:59 GMT
   - <- etag: W/“5f2cbe0f-2382"
   - -> if-none-match: W/"5f2cbe0f-2382"

### Nginx 配置

- gzip 和 etag
```yaml
http {
  # 开启gzip
  gzip on;
  # 启用gzip压缩的最小文件；小于设置值的文件将不会被压缩
  gzip_min_length 1k;
  # gzip 压缩级别 1-10 
  gzip_comp_level 2;
  # 进行压缩的文件类型。
  gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
  # 是否在http header中添加Vary: Accept-Encoding，建议开启
  gzip_vary on;
  
  etag on;
}
```

- 强缓存配置
```
server {

	location ~* \.(html)$ {
    access_log off;
    add_header  Cache-Control  max-age=no-cache;
  }

  location ~* \.(css|js|png|jpg|jpeg|gif|gz|svg|mp4|ogg|ogv|webm|htc|xml|woff)$ {
    access_log off;
    add_header    Cache-Control  max-age=360000;
  }
}

```
## 反向代理配置


```
location /api/ {
  add_header Access-Control-Allow-Credentials true;
  add_header Access-Control-Allow-Origin $http_origin;
  add_header Access-Control-Allow-Methods 'GET, POST, PUT, PATCH, DELETE, OPTIONS';
  add_header Access-Control-Allow-Headers 'Authorization, Content-Type, Accept, Origin, User-Agent, DNT, Cache-Control, X-Mx-ReqToken, X-Requested-With';
  add_header Access-Control-Max-Age 86400;
  proxy_pass http://realworld.api.fed.lagounews.com/api/;
}
```

## HTTPS 配置

- https://buy.cloud.tencent.com/ssl
- **HTTPS 域名还需要配置！！**

```
ssl_certificate "/etc/pki/nginx/server.crt";
ssl_certificate_key "/etc/pki/nginx/private/server.key";
```

- 安全组规则里打开 443 端口
```bash
server {
        listen       443 ssl http2 default_server;
        # listen       [::]:443 ssl http2 default_server;
        server_name  www.nllcoder.com;
        root         /usr/share/nginx/html;

        ssl_certificate "/etc/pki/nginx/www.nllcoder.com_bundle.crt";
        ssl_certificate_key "/etc/pki/nginx/private/www.nllcoder.com.key";
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
        ssl_ciphers PROFILE=SYSTEM;
        ssl_prefer_server_ciphers on;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }

```
```bash
location /api/ {
	proxy_pass http://realworld.api.fed.lagounews.com/api/;
}

location / {
	proxy_pass http://127.0.0.1:3000;
}
```
```bash
return 301 https://www.nllcoder.com$request_uri;
```

### HTTP/2 Server Push

- http://www.ruanyifeng.com/blog/2018/03/http2_server_push.html

```
location / {
  http2_push /css/app.3d328b21.css;
  http2_push /js/app.03455d91.js;
  http2_push /js/chunk-vendors.b2150c02.js;
}
```

