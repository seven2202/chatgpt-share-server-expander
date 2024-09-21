# 基于chatgpt-share-server开发的外挂程序，支持xyhelper网关。
#### 项目地址：[chatgpt-share-server](https://github.com/xyhelper/chatgpt-share-server-deploy) 感谢xyhelper大佬的辛勤付出，敬礼！！！
# chatgpt-share-server-expander(付费版)
#### 同时支持ChatGPT和claude，拥有较为完整的用户管理体系。
#### 支持暗黑模式和多语言，用户使用速率单独控制。支持站内（易支付、当面付、虎皮椒）和站外支付等。
#### 全款49.9￥/月，无任何其他费用，支持用户数据迁移。最主要的是新增功能不收费，也不会根据用户数去阶梯收费喔。
### 本项目我愿称之为【觉醒吧，韭菜们】

# 功能优势
- 支持邮箱注册、登录、找回密码
- 支持免费、4o、plus、claude节点划分
- 支持站内支付（虎皮椒、易支付、当面付）、卡密购买、兑换。
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
- 支持卡密管理
- 支持虚拟车队
- 支持优惠卷管理功能
- 更多功能

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

proxy_buffering off;
proxy_cache_bypass no_cache;

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

   handle_path /list {
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

# 前端界面展示

## 登录页面

![image](https://github.com/user-attachments/assets/ef66aeb1-f162-429d-a756-25ab90b25e54)

## 注册页面

![image](https://github.com/user-attachments/assets/3d82b33b-3666-4289-8ef0-1d3c33c629ac)

## 忘记密码

![image](https://github.com/user-attachments/assets/cfe960a2-2dde-4d6b-806f-fb0b95d2b79a)

## 选车页面

免登陆可见：

![image](https://github.com/user-attachments/assets/8adc04c7-7c66-45c5-a147-11cb5a065431)

登录后：

![image](https://github.com/user-attachments/assets/dfbed8e5-b531-4324-91ae-0481b9986993)

![image](https://github.com/user-attachments/assets/daa1c5e4-7a44-46f7-bf45-f06f877c39ca)

![image](https://github.com/user-attachments/assets/05f37c89-e4c9-47c0-8e0c-c4da4af136a8)

![image](https://github.com/user-attachments/assets/78571a5e-46e8-4697-b120-c5c0ca00c859)

## 站内支付

![image](https://github.com/user-attachments/assets/e663acb4-f641-4f69-8b00-ff9a07f3c001)


## 卡密购买

后台配置发卡地址，前台进行跳转

![image](https://github.com/user-attachments/assets/22ab51e0-695b-49dc-bca0-95a7b49f6c20)

## 卡密兑换

![image](https://github.com/user-attachments/assets/7eaf6940-3bc9-49d5-a3ab-a34a617724d4)

## 站内公告

![image](https://github.com/user-attachments/assets/e787e219-70f8-48ac-ba91-eebc76c2f1d1)


## 使用说明

后台配置使用说明文档地址（如腾讯文档地址、飞书等等），前台进行跳转。

![image](https://github.com/user-attachments/assets/5b69a33d-6188-4329-be1d-6360d717632e)


## 系统通知

![image](https://github.com/user-attachments/assets/523a1606-47d7-4d14-8042-d7bb26f0f24b)

## 暗黑模式

![image](https://github.com/user-attachments/assets/3505e582-2be9-4e63-be82-d6f4c641143c)

## 多语言

目前只做了部分英汉，待完善

![image](https://github.com/user-attachments/assets/6f6eca28-3761-4ab8-bbfd-95714cb1924b)

## 个人中心

![image](https://github.com/user-attachments/assets/da0907f7-3e4c-45fe-bf43-985ae247b755)

### 会员信息展示

续费跳转、邀请链接复制，修改密码，邀请详情

![image](https://github.com/user-attachments/assets/76194c2e-98a9-4831-b242-4bdfc8ac7ece)


## 退出登录

![image](https://github.com/user-attachments/assets/a7c8af65-f983-46af-b066-ef5f679fae12)


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

![image](https://github.com/user-attachments/assets/857b0a80-af26-4b59-8951-2c45b30b7866)


# 如果搞不定，提供有偿部署服务

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


