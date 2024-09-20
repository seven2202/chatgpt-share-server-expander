# chatgpt-share-server-expander

#### 基于chatgpt-share-server开发的外挂程序，属于增强收费版。
#### 同时支持ChatGPT和claude，拥有较为完整的用户管理体系。支持暗黑模式和多语言。支持站内和站外支付等。
#### 29.9￥/月，不限制用户人数。佛系更新！

# 功能介绍
## 用户端：
- 支持邮箱注册、登录、找回密码
- 支持免费、4o、plus、claude节点划分
- 支持站内支付、卡密购买、兑换。
- 支持系统通知、站内公告、使用说明
- 支持暗黑模式
- 支持多语言（英汉）
- 支持客服脚本
- 支持优惠卷折扣功能
- 免登进入选车页面，使用功能才需要登录
- 新增个人中心（查看用户信息、修改密码、查看邀请人、邀请用户）
## 管理端：
管理端需要重构，之前想集成进去，后面功能越写越多...
- 支持用户数据统计（粗糙，请忽略）
- 支持批量导入ChatGPT 账号，不需要一个个添加。
- 支持Claude session账号添加。
- 用户管理
- 系统通知
- 订阅管理
- 订单管理
- 支付管理、支付成功邮件通知管理员
- 优惠卷管理
- 卡密管理
- 系统配置

# 更新日志

2024-09-01
- 新增单个gpt账号添加功能
  
# 近期更新计划

- 管理端界面重构
- 完善其他支付方式（当面付、虎皮椒...）
- 完善其他登录方式（微信登录、手机号登录）
- 用户速率独立设置
- claude次数统计功能


# 快速部署
```
curl -sSfL https://raw.githubusercontent.com/seven2202/chatgpt-share-server-expander/deploy/quick-install.sh | bash
```
# 启动配置

## 修改docker compose文件

![image](https://github.com/user-attachments/assets/adb7f6da-0c42-41ba-85db-b7f1f32449c0)


# 配置

## 新建一个php项目或者反代项目都可
![image](https://github.com/user-attachments/assets/91643de3-794c-4a84-88ee-d598c7bdfb0a)

![image](https://github.com/user-attachments/assets/e3a8a29a-d515-4611-bd30-5583603621bf)

## 点击你新建好的项目，进行反代配置

![image](https://github.com/user-attachments/assets/d539ad98-de8f-4e92-8015-06449e7073e7)


![image](https://github.com/user-attachments/assets/21fe38e1-0f34-44ba-adaf-ee61d0295d0b)

## 点击配置文件开始进行nginx配置
![image](https://github.com/user-attachments/assets/4ef56575-57e8-4bb7-87e2-864f22158664)


![image](https://github.com/user-attachments/assets/2007ba58-e028-4d76-afa9-e3ec7a3f5f98)


## nginx 新增反代信息

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


# 管理后台展示（辣眼睛）

## 管理后台入口
只有admin管理员账号才显示此入口
![image](https://github.com/user-attachments/assets/5072b433-e84f-4c58-bd84-051ebce3e6f4)

## 数据统计（粗糙）
![image](https://github.com/user-attachments/assets/d9e08504-70f4-4945-90fb-2613b26eaad8)

## gpt 账号管理
![image](https://github.com/user-attachments/assets/ead899a0-24df-4340-a858-2a03a649d8b7)

## claude 账号管理
![image](https://github.com/user-attachments/assets/596ca1ea-57c7-401a-8745-e73ac8e96ef8)

## 用户管理
![image](https://github.com/user-attachments/assets/9fb8fedd-76f8-4851-a4a7-29659d59bcf3)

## 公告管理
![image](https://github.com/user-attachments/assets/bdc4bfc2-1e32-4335-a551-5b658e1c27c9)

## 订阅管理
![image](https://github.com/user-attachments/assets/615377b7-882d-455d-8229-a8e49ec3c3b6)

## 订单管理
![image](https://github.com/user-attachments/assets/79c37624-2d94-4888-b0e5-0a5275e8f0dd)

## 支付管理
有空再完善其他支付方式吧，预留了。
![image](https://github.com/user-attachments/assets/50df0efa-1988-4519-9a19-cd8292c570ef)

## 优惠卷管理
![image](https://github.com/user-attachments/assets/ea6b3e12-fbf8-4bab-99ed-84fb4eaaf439)

## 卡密管理
![image](https://github.com/user-attachments/assets/31fb589d-cf47-4bc1-a416-57509c9b2431)

## 系统配置

### 会员设置
![image](https://github.com/user-attachments/assets/e09cdf1f-5754-4d7f-8218-43c077d1cd53)

### 邮箱设置
![image](https://github.com/user-attachments/assets/3c374cf5-ed62-48fb-9506-cfe62a7ff6f8)

### 其他配置（粗糙）
![image](https://github.com/user-attachments/assets/dba1fa38-17d2-41d9-8563-10169bf02fc1)

# 选车页面手机端显示
![image](https://github.com/user-attachments/assets/d058d20d-df73-41a0-b649-ab8015387a00)
![image](https://github.com/user-attachments/assets/571de06a-9007-4b17-9485-77b36c5f2cf7)
![image](https://github.com/user-attachments/assets/6a7774cd-6df2-401b-a142-de51a30c4ea1)
![image](https://github.com/user-attachments/assets/cb0d7ee3-5032-4de2-ab57-f20217bc89f6)
![image](https://github.com/user-attachments/assets/5b2dcd8a-6a88-4dcd-a005-888129b9810e)

# 如果这种情况，请联系我ip过白。
![image](https://github.com/user-attachments/assets/ef396127-ceac-436a-a76c-51b33e938a78)

![image](https://github.com/user-attachments/assets/7cdd347a-dc56-4d97-8dcf-48ef37d040f3) 

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

进入mysql的容器中，执行以下更新sql，迁移旧完成了。

```
UPDATE chatgpt_user AS u1
JOIN (
    SELECT id, expireTime 
    FROM chatgpt_user 
    WHERE deleted_at IS NULL AND isPlus = 1
) AS u2 ON u1.id = u2.id  
SET u1.plusExpireTime = u2.expireTime
WHERE u1.deleted_at IS NULL;
```


