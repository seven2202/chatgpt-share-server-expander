#!/bin/bash
set -e

## 克隆仓库到本地
echo "开始拉取代码..."
git clone -b deploy --depth=1 https://github.com/seven2202/chatgpt-share-server-expander.git chatgpt-share-expander

## 进入目录
cd chatgpt-share-expander
echo "开始配置 docker-compose.yml 信息..."

# 提示用户输入 CHATPROXY 和 OAUTH_URL
echo -n "请输入接入 xyhelper 的网关地址 (如：https://a.baidu.com)："
read CHATPROXY < /dev/tty

echo -n "请输入网站域名地址 (如：https://b.baidu.com)："
read OAUTH_URL < /dev/tty


# 替换 docker-compose.yml 文件中的 CHATPROXY 和 OAUTH_URL
sed -i "s|CHATPROXY: .*|CHATPROXY: \"$CHATPROXY\"|g" docker-compose.yml

# 替换 OAUTH_URL 中的域名部分，保持 /api/user/oauth 路径不变
sed -i "s|OAUTH_URL: https://[^/]*/api/user/oauth|OAUTH_URL: \"$OAUTH_URL/api/user/oauth\"|g" docker-compose.yml

# 生成一个 UUID 并写入到配置文件中
UUID=$(uuidgen)
sed -i "s|APIAUTH: .*|APIAUTH: \"$UUID\"|g" docker-compose.yml


# 提示用户确认是否继续执行
echo -n "配置信息已更新，是否继续拉取并启动 Docker 服务？(y/n)："
read confirm < /dev/tty

if [[ $confirm == "y" ]]; then
    docker compose pull
    docker compose up -d --remove-orphans
    echo "请先配置 nginx"
    echo "nginx 配置完成后，请访问 $OAUTH_URL"
    echo "管理员账号: admin"
    echo "管理员密码: 123456"
    echo "请及时修改管理员密码!!!"
else
    echo "操作已取消。"
fi
