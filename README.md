# 集成 chatgpt-share-server 和 fucluade 开发的外挂程序

## 项目声明

本项目集成了以下服务：

- **[chatgpt-share-server](https://github.com/xyhelper/chatgpt-share-server-deploy)**，感谢 xyhelper 大佬。
- **[fuclaude](https://github.com/wozulong/fuclaude)**，感谢 wozulong 大佬。

# chatgpt-share-server-expander(付费版)
#### 同时支持ChatGPT和claude。
#### 99一个月。不限制用户数量，新增需求不额外收费。

### 演示站：https://940309.xyz

# 产品亮点

## 文档不经常更新，请以演示站为准。

- 官网登录注册ui
![image](https://github.com/user-attachments/assets/29fd9252-20b8-49ca-99ff-bdbd364ef756)
![image](https://github.com/user-attachments/assets/93a2bc1f-212f-4625-b272-d97d478e84a3)
![image](https://github.com/user-attachments/assets/ab1583ae-6197-47ba-8831-793104de62f9)

- 游客模式：登录就能用，可以选择让游客用普号还是plus，也可以设置游客的对话速率
![image](https://github.com/user-attachments/assets/c2037608-7927-4c0e-a5ee-2758642a53e5)

- 登录以后，显示个人中心，速率信息，自动选车、使用说明、导出对话、备用站点、使用claude、站内购买，公告等等...
![image](https://github.com/user-attachments/assets/430545d6-b43d-4cfe-8e49-88b65eac8d41)

- 选车页面
![image](https://github.com/user-attachments/assets/c30afdf2-78e6-43bf-9d54-44267204be9f)
- 明亮和暗黑模式
![image](https://github.com/user-attachments/assets/ad59cd00-a314-4d3e-9054-09a11e1b5b85)
- 多语言
![image](https://github.com/user-attachments/assets/7c6623f1-370a-4607-957f-452dbbf65879)
- 在线商店
![image](https://github.com/user-attachments/assets/de739768-9183-4b50-a45e-06c8cb328d12)

- 卡密兑换
![image](https://github.com/user-attachments/assets/4ed76a50-7c73-4078-a335-cdfc499b10ea)

- 推广返现 
![image](https://github.com/user-attachments/assets/ef62a62a-2c44-42f1-9025-45041f67604f)

- 等等 

# 功能优势
- 支持邮箱注册、登录、找回密码
- 支持免费、4o、plus、claude节点划分
- 支持站内支付（虎皮椒、易支付、当面付、蓝兔、微信native、usdt）、卡密购买、兑换。
- 支持系统通知、站内公告、使用说明设置
- 支持暗黑模式和多语言
- 支持客服脚本
- 支持免登进入选车页面
- 支持邀请功能（复制邀请码、查看邀请人信息）
- 支持用户数据统计
- 支持批量获取gpt session功能
- 支持claude session管理功能
- 支持订阅管理
- 支持订单管理
- 支持卡密管理（生成、批量导出）
- 支持gpt虚拟车队 （plus虚拟车）
- 支持claude虚拟车队
- 支持优惠卷管理功能
- 支持用户引导功能
- 会员到期邮件提醒
- 支持推广返现
- 登录直接进入对话页面
- 支持备用api站功能
- 用户独立速率限制
- 用户对话隔离
- 自动换号功能
- 免登模式（无需登录就能对话）

# 更新日志及开发计划
https://docs.qq.com/doc/DQlh2QXdQdG9rUFZQ?u=69a770bc021543a98f39cd968dc02db2


# 快速部署
```
curl -sSfL https://raw.githubusercontent.com/seven2202/chatgpt-share-server-expander/deploy/quick-install.sh | bash
```
# 启动配置
### 需要填写网关地址
### 需要填写站点域名。
### 更多配置可以去docker compose.yml文件中修改，然后执行一下restart.sh脚本。

# nginx配置方式

## 新建一个php项目或者反代项目都可

![image](https://github.com/user-attachments/assets/6bc97b1f-4347-43f4-96fd-58ec1dcb095e)

## 点击你新建好的项目，进行反代配置

![image](https://github.com/user-attachments/assets/e32f6d65-6035-4106-b20c-fcbc8e3908d7)

![image](https://github.com/user-attachments/assets/870082a7-a0e9-499f-b501-4641a9864424)

根据你的代理新增反代信息

# nginx和caddy选择其中一种即可

## nginx 新增反代信息（方式一）

复制粘贴即可，存在重复的属性就删除它

```shell
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header REMOTE-HOST $remote_addr;

# 禁用Nginx缓冲，确保流式传输
proxy_buffering off;	# 关闭响应缓冲	
proxy_request_buffering off;	#关闭请求缓冲	
proxy_cache off;	#禁用缓存(可选)

location /list/ {
    proxy_pass http://localhost:8400/app/index.html;
}
location /app/ {
    proxy_pass http://localhost:8400/app/;
}
location /api/ {
    proxy_pass http://localhost:8400/api/;
}
```
# caddy配置方式（方式二）

找到你的caddy配置文件,把xxx.com改成自己的域名

```
xxx.com {

   handle_path /list/* {
        rewrite * /app/index.html
        reverse_proxy localhost:8400
        }

   handle /api/* {
        reverse_proxy localhost:8400
        }

   handle /app/* {
        reverse_proxy localhost:8400
        }

reverse_proxy localhost:8300

}
```

配置完成后，直接访问你的域名即可


# 管理后台展示

## 管理后台入口

只有admin管理员账号才显示此入口

![image](https://github.com/user-attachments/assets/96d8781c-3192-4bf6-bc47-60c50c293e79)

## 数据统计（粗糙）

![image](https://github.com/user-attachments/assets/eb810f82-3875-4b45-ae8d-45e636bf2d33)


## 用户管理

![image](https://github.com/user-attachments/assets/0a8014ee-69f3-4a6e-ae0e-4c50d8c1c9fd)


## 账号管理

包含gpt和claude账号管理

![image](https://github.com/user-attachments/assets/669edf84-a2e7-4541-9f7b-9510ca6b4264)

![image](https://github.com/user-attachments/assets/594a295f-9942-41e6-8e6d-735bdf6fe710)


## 订阅管理

![image](https://github.com/user-attachments/assets/ca5fe696-b2c2-40dd-bb65-c9f671556d4b)


## 营销管理

包含公告通知、优惠卷、激活码

![image](https://github.com/user-attachments/assets/527dcf59-5e61-4c83-a88f-7aa32290b9be)

![image](https://github.com/user-attachments/assets/e2b8563d-9e22-4adc-b928-88d58005ab21)

![image](https://github.com/user-attachments/assets/c836b58b-dbb0-4d75-b49b-a68a1158f4b5)

![image](https://github.com/user-attachments/assets/49cca475-2250-430b-a776-d468c093615e)


## 订单管理

包含支付设置、订单信息

![image](https://github.com/user-attachments/assets/548957f8-7f77-45f1-ad7c-495c25bc2d94)

![image](https://github.com/user-attachments/assets/a77778b3-dbfe-4279-860b-eef866f101c6)

![image](https://github.com/user-attachments/assets/c7516b50-4b7c-490f-b6ae-5eb564ed46e5)


## 对话管理

![image](https://github.com/user-attachments/assets/04fd4cf0-4c89-4420-bfb8-3301f8206f87)


## 系统配置

包含系统设置、会员管理、邮箱配置、前台配置、节点设置

![image](https://github.com/user-attachments/assets/ce286501-cba3-4f33-83fc-767209d6920b)

![image](https://github.com/user-attachments/assets/58ba5d9d-59e0-4842-b018-a52ea5efd6bd)

![image](https://github.com/user-attachments/assets/d270024c-37e4-4b6b-a752-c3eeb4d74a92)

![image](https://github.com/user-attachments/assets/ae9fc766-1f8e-42d8-b5b4-60b002660ef1)

![image](https://github.com/user-attachments/assets/ea10ef3a-538e-4de3-9d71-2ef9ba29bcf9)

# 选车页面手机端显示

![image](https://github.com/user-attachments/assets/8e548a15-5ea6-4092-87da-31ca4d42d3a5)

![image](https://github.com/user-attachments/assets/eb98622b-2053-40fc-a1eb-a4ffbf5d2a12)

![image](https://github.com/user-attachments/assets/1cac2a9c-2340-4b82-b649-89be8816d013)

![image](https://github.com/user-attachments/assets/88420edb-93e7-487f-a489-3d4035c40d0b)

![image](https://github.com/user-attachments/assets/c4e1cb36-8b04-4ecb-92d6-a8c47e739060)


# 如果访问受限，请联系我ip过白。

![1730078998194](https://github.com/user-attachments/assets/d2992892-f19a-4389-ab82-24cf0bcccdd3)


# expander 交流群

![image](https://github.com/user-attachments/assets/5aea5554-300a-4327-9c43-49c3bee3abcc)





# 如果搞不定，提供有偿部署服务，200一次

# 部分迁移用户适用(原版share不需要操作)

先用一键脚本部署程序，**建议不要放在和原来share程序一个地方**！！！
```
curl -sSfL https://raw.githubusercontent.com/seven2202/chatgpt-share-server-expander/deploy/quick-install.sh | bash
```

## 迁移旧系统的数据

### 进入你旧系统的docker compose.yml所在目录

运行脚本，该脚本只迁移**用户会话表**、**支付订单记录表**、**用户表**的数据

```
docker compose exec mysql sh -c 'exec mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" cool chatgpt_conversations chatgpt_epaylogs chatgpt_user --no-create-info --skip-triggers --complete-insert' >./cool-$(date +%Y%m%d-%H%M%S).sql

```

运行完在当前位置下找到**cool-日期.sql**的文件，此为你要迁移的数据

如果是同一个服务器，复制备份的sql脚本到刚刚运行的脚本下

如果是不同服务器，先把备份的sql脚本下载本地再上传新环境的服务器。

### 脚本运行的目录里面

进入新系统的**docker compose.yml**所在目录，自己修改下方sql脚本文件名

执行命令
```
docker compose exec -T mysql sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD" cool' <./cool-日期.sql
```

### 更新用户权益

![image](https://github.com/user-attachments/assets/3437cc40-44e4-4a34-ac4c-63227616e152)

执行后，会同步原有用户的plus权益，迁移后只需要执行一次即可。


