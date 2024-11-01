部署 Ruyu-Blog 的步骤很详细，下面是一个精简版的总结，帮助你快速理解整个流程。

### 准备工作
1. **服务器要求**: 至少 2 核 4G 的 CentOS 7 服务器。
2. **安装依赖**:
   - Git
   - Docker
   - Docker Compose
   - MySQL 8.0
   - Redis >= 7.2.3
   - RabbitMQ
   - Minio

### 1. 环境准备
#### 1.1 安装 Docker
```bash
sudo yum install -y yum-utils
yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo systemctl start docker
docker -v
```
#### 1.2 设置国内镜像和配置
在 `/etc/docker/daemon.json` 中添加镜像源，然后重启 Docker：
```bash
systemctl daemon-reload
service docker restart
docker info
```

#### 1.3 安装 MySQL
1. 创建挂载目录：
   ```bash
   mkdir -p /data/mysql/data /data/mysql/conf
   ```
2. 创建 `docker-compose.yml` 配置文件：
   ```yaml
   version: '3'
   services:
     mysql:
       image: mysql:8.0
       container_name: mysql
       volumes:
         - /data/mysql/data:/var/lib/mysql
         - /data/mysql/conf/my.cnf:/etc/mysql/mysql.conf.d/mysqld.cnf
       restart: always
       ports:
         - 3306:3306
       environment:
         MYSQL_ROOT_PASSWORD: 123456
   ```

3. 创建 MySQL 配置文件 `my.cnf`。

4. 启动 MySQL：
   ```bash
   cd /data/mysql
   docker-compose up -d
   ```

#### 1.4 安装 Redis
1. 创建挂载目录：
   ```bash
   mkdir -p /data/redis
   ```
2. 创建 `docker-compose.yml`：
   ```yaml
   version: '3'
   services:
     redis:
       image: redis:7.2.3
       container_name: redis
       restart: always
       ports:
         - 6379:6379
       volumes:
         - /data/redis/redis.conf:/etc/redis/redis.conf
   ```

3. 创建 `redis.conf`，并启用密码保护。

4. 启动 Redis：
   ```bash
   cd /data/redis
   docker-compose up -d
   ```

#### 1.5 安装 RabbitMQ
```bash
docker pull rabbitmq
docker run -d --hostname my-rabbit --name rabbit -p 15672:15672 -p 5672:5672 rabbitmq
```

#### 1.6 安装 Minio
1. 创建挂载目录：
   ```bash
   mkdir -p /data/minio
   ```
2. 创建 `docker-compose.yml`：
   ```yaml
   version: '3'
   services:
     minio:
       image: "minio/minio"
       ports:
         - "9000:9000"
         - "9001:9001"
       environment:
         MINIO_ROOT_USER: admin
         MINIO_ROOT_PASSWORD: 12345678
       volumes:
         - /data/minio/data:/data
   ```

3. 启动 Minio：
   ```bash
   cd /data/minio
   docker-compose up -d
   ```

### 2. 申请第三方登录
根据需要在 Gitee 和 GitHub 注册应用并获取密钥。

### 3. 本地运行项目
#### 3.1 拉取项目
```bash
git clone git@gitee.com:kuailemao/ruyu-blog.git
```

#### 3.2 运行后端
1. 使用 IDE 打开项目，配置 `application-dev.yml`。
2. 启动后端。

#### 3.3 运行前端
在前端目录下运行：
```bash
pnpm install
pnpm run dev
```

### 4. 部署
#### 4.1 部署后端
1. 打包项目：
   ```bash
   ./mvnw package
   ```
2. 上传 JAR 文件，创建 Dockerfile。
3. 构建镜像并运行。

#### 4.2 部署前端
1. 打包前端：
   ```bash
   pnpm build
   ```
2. 上传 `dist` 文件夹，创建 Dockerfile 和 Nginx 配置。

完成以上步骤后，你的 Ruyu-Blog 应该就成功部署在服务器上了！记得定期检查服务状态和更新。