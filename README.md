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
![1726714190503](https://github.com/user-attachments/assets/7c87e475-d751-4d68-a4e7-f640216e1881)

# nginx配置方式

## 新建一个php项目或者反代项目都可
![image](https://github.com/user-attachments/assets/91643de3-794c-4a84-88ee-d598c7bdfb0a)

![image](https://github.com/user-attachments/assets/e3a8a29a-d515-4611-bd30-5583603621bf)

## 点击你新建好的项目，进行反代配置

![image](https://github.com/user-attachments/assets/d539ad98-de8f-4e92-8015-06449e7073e7)


![image](https://github.com/user-attachments/assets/21fe38e1-0f34-44ba-adaf-ee61d0295d0b)

## 点击配置文件开始进行nginx配置
![image](https://github.com/user-attachments/assets/4ef56575-57e8-4bb7-87e2-864f22158664)


![image](https://github.com/user-attachments/assets/2007ba58-e028-4d76-afa9-e3ec7a3f5f98)

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
![image](https://github.com/user-attachments/assets/1da69242-54f8-407c-973e-f9e71fd4cc55)

## 注册页面
![image](https://github.com/user-attachments/assets/a3e36c6b-de06-4c39-8037-80700646d025)

## 忘记密码
![image](https://github.com/user-attachments/assets/3056b35d-2cd8-48b7-b2c7-42213f2bdec8)

## 选车页面
免登陆可见：
![image](https://github.com/user-attachments/assets/18d41510-a6b8-497f-b34a-87a8fa70f18c)
登录后：
![image](https://github.com/user-attachments/assets/e5ec1042-9c09-4d34-b25b-bd43294147e8)
![image](https://github.com/user-attachments/assets/826d72ed-88cd-4db4-8096-655d30f881ec)
![image](https://github.com/user-attachments/assets/f31f9eaf-e45a-41d9-afb0-73d0ae644760)
![image](https://github.com/user-attachments/assets/a5ffdf92-0167-4bfa-9e04-89aac759d50b)

## 站内支付
![image](https://github.com/user-attachments/assets/8bc21d04-5ba0-4e8c-b0b2-3f54c7ae88ab)

## 激活码
后台配置发卡地址，前台进行跳转
## 卡密兑换
![image](https://github.com/user-attachments/assets/e14e3579-b55d-44e6-b38d-a8c64bd3432f)

## 站内公告
比较粗糙
![image](https://github.com/user-attachments/assets/485ef419-6379-4d4c-9da1-44a95f4b6f03)

## 使用说明
后台配置使用说明文档地址（如腾讯文档地址、飞书等等），前台进行跳转。

## 系统通知
![image](https://github.com/user-attachments/assets/ea199f90-1f3b-476f-8e44-a7fe23220f6c)

## 暗黑模式
![image](https://github.com/user-attachments/assets/ad1787fb-81bf-4fb3-bd45-81cfc247097a)
![image](https://github.com/user-attachments/assets/f7104848-e645-4792-ba29-048eec010caf)

## 多语言
目前只做了部分英汉，待完善
![image](https://github.com/user-attachments/assets/a79c7669-6c2a-4bcc-a9b7-a16e9496060b)

## 个人中心
![image](https://github.com/user-attachments/assets/6ee6a676-be28-4382-8e99-08fff57190cc)

### 会员信息展示
续费跳转、邀请链接复制
![image](https://github.com/user-attachments/assets/843b97a4-768f-4343-ab86-9cea9820f1aa)

### 修改密码
![image](https://github.com/user-attachments/assets/c3d0f0cc-8f38-4c71-a9fb-b777517887e8)

### 邀请详情
![image](https://github.com/user-attachments/assets/8329af51-9d54-402e-b21c-5fadfcd4e61f)

## 退出登录
![image](https://github.com/user-attachments/assets/690eb933-62cc-4f60-91eb-5037b380a20b)


# 管理后台展示

## 管理后台入口
只有admin管理员账号才显示此入口
![image](https://github.com/user-attachments/assets/5072b433-e84f-4c58-bd84-051ebce3e6f4)

## 数据统计（粗糙）
![image](https://github.com/user-attachments/assets/6bfedc99-f193-4940-9bbf-063d9ebae2e5)


## gpt 账号管理
![image](https://github.com/user-attachments/assets/be3ef772-ead5-4ec8-b27c-f41d24d917f0)


## claude 账号管理
![image](https://github.com/user-attachments/assets/85f8010c-2290-48f0-a045-6f3ae340f72f)


## 用户管理
![image](https://github.com/user-attachments/assets/57961bab-087a-4270-b513-5f34a52b8a72)


## 公告管理
![image](https://github.com/user-attachments/assets/c005f369-ba34-4832-9b4b-99efcf80a5c2)


## 订阅管理
![image](https://github.com/user-attachments/assets/ea8bde82-72c6-4ea2-bc0b-9de39a411148)


## 订单管理
![image](https://github.com/user-attachments/assets/d43030d6-3f54-4109-9999-1fd7ac016b03)


## 支付管理
![image](https://github.com/user-attachments/assets/3e55002c-f52f-489d-b0f1-705c3aa23b50)


## 优惠卷管理
![image](https://github.com/user-attachments/assets/ede44377-244e-4b2c-ad10-252ae885c7d6)


## 卡密管理
![image](https://github.com/user-attachments/assets/b602398e-e34f-40bf-9ec7-92a51a2e5428)


## 系统配置

![image](https://github.com/user-attachments/assets/2ec71264-5cde-4291-8537-eaca7683bf88)


### 会员设置
![image](https://github.com/user-attachments/assets/d3c7a1ed-f672-4b94-a975-f1d53a7e3f37)


### 邮箱设置
![image](https://github.com/user-attachments/assets/faa0cb35-b411-40a2-b97b-7b7446082c74)


### 其他配置
![image](https://github.com/user-attachments/assets/1872724c-d033-4148-ba12-4db8e2e8056c)


# 选车页面手机端显示
![image](https://github.com/user-attachments/assets/d058d20d-df73-41a0-b649-ab8015387a00)
![image](https://github.com/user-attachments/assets/571de06a-9007-4b17-9485-77b36c5f2cf7)
![image](https://github.com/user-attachments/assets/6a7774cd-6df2-401b-a142-de51a30c4ea1)
![image](https://github.com/user-attachments/assets/cb0d7ee3-5032-4de2-ab57-f20217bc89f6)
![image](https://github.com/user-attachments/assets/5b2dcd8a-6a88-4dcd-a005-888129b9810e)

# 如果访问受限，请联系我ip过白。
![image](https://github.com/user-attachments/assets/ef396127-ceac-436a-a76c-51b33e938a78)

![01fdf29f9db4e530174832ea6d9d77b](https://github.com/user-attachments/assets/620b8cce-f84f-42f9-a650-ada01229b1bd)


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

![image](https://github.com/user-attachments/assets/c8707258-55c9-42e1-ae90-707ee27b64ee)

执行后，会同步原有用户的plus权益，迁移后只需要执行一次即可。


