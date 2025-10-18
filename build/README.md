# Docker Setup for Sigma Application

This directory contains optimized Docker configurations for the Sigma application with best practices for production deployment.

## 📁 Files Overview

- `Dockerfile.frontend` - Multi-stage build for React TypeScript frontend
- `Dockerfile.backend` - Optimized Python Flask backend 
- `docker-compose.yml` - Orchestration for both services
- `nginx.conf` - Production-ready Nginx configuration
- `.dockerignore` - Optimized Docker ignore patterns

## 🚀 Quick Start

### Prerequisites

- Docker Engine 20.10+
- Docker Compose v2.0+

### Build and Run

```bash
# From the sigma root directory
cd build
docker-compose up --build
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Checks**:
  - Frontend: http://localhost:3000/health
  - Backend: http://localhost:5000/health

## 🏗️ Architecture

### Frontend (React + TypeScript + Vite)

- **Base Image**: `node:20-alpine` (build) → `nginx:alpine` (production)
- **Build Strategy**: Multi-stage build for minimal production image
- **Security**: Non-root user, security headers
- **Performance**: Gzip compression, static asset caching
- **Size**: ~25MB (vs ~1GB with Node.js runtime)

### Backend (Python Flask)

- **Base Image**: `python:3.11-alpine`
- **Production Server**: Gunicorn with 4 workers
- **Security**: Non-root user, minimal attack surface
- **Performance**: Connection pooling, request limits
- **Size**: ~80MB (vs ~200MB with standard Python image)

## 🔧 Configuration

### Environment Variables

#### Frontend

- `NODE_ENV=production` - Production optimizations

#### Backend

- `FLASK_ENV=production` - Flask production mode
- `PYTHONPATH=/app` - Python module path

### Port Mapping

- Frontend: `3000:8080` (host:container)
- Backend: `5000:5000` (host:container)

## 🛡️ Security Features

1. **Non-root users** in both containers
2. **Minimal base images** (Alpine Linux)
3. **Security headers** (XSS, CSRF protection)
4. **Health checks** for container monitoring
5. **Resource limits** and restart policies

## 📊 Performance Optimizations

### Frontend

- Static asset caching (1 year)
- Gzip compression
- Efficient routing for SPA
- Minimal image layers

### Backend

- Gunicorn with optimized worker configuration
- Request limits and timeouts
- Connection keep-alive
- Python bytecode optimization

## 🔍 Monitoring

### Health Checks

- **Interval**: 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3 attempts
- **Start Period**: 40 seconds

### Logging

- Nginx access and error logs
- Python application logs via Gunicorn
- Container stdout/stderr capture

## 🚀 Deployment

### Development

```bash
docker-compose up --build
```

### Production

```bash
# Build images
docker-compose build --no-cache

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f
```

### Scaling

```bash
# Scale backend instances
docker-compose up --scale backend=3
```

## 🛠️ Customization

### Adding Environment Variables

Edit `docker-compose.yml`:

```yaml
environment:
  - CUSTOM_VAR=value
  - DATABASE_URL=postgresql://...
```

### Volume Mounts

For persistent data:

```yaml
volumes:
  - ./data:/app/data
  - db_data:/var/lib/postgresql/data
```

### Network Configuration

The services communicate via the `sigma-network` bridge network.

## 📋 Troubleshooting

### Common Issues

1. **Build Failures**

   ```bash
   # Clean build cache
   docker system prune -a
   docker-compose build --no-cache
   ```

2. **Port Conflicts**

   ```bash
   # Check port usage
   netstat -tulpn | grep :3000
   # Change ports in docker-compose.yml
   ```

3. **Permission Issues**

   ```bash
   # Ensure proper file permissions
   chmod -R 755 ./sigma
   ```

### Logs and Debugging

```bash
# View container logs
docker-compose logs frontend
docker-compose logs backend

# Access container shell
docker-compose exec frontend sh
docker-compose exec backend sh

# Check container status
docker-compose ps
```

## 🔄 Updates and Maintenance

### Updating Dependencies

1. Update `package.json` or `requirements.txt`
2. Rebuild containers: `docker-compose build --no-cache`
3. Restart services: `docker-compose up -d`

### Security Updates

```bash
# Rebuild with latest base images
docker-compose build --pull --no-cache
```

## 📈 Production Considerations

1. **Use environment-specific configs**
2. **Implement proper logging aggregation**
3. **Set up monitoring (Prometheus/Grafana)**
4. **Configure backup strategies**
5. **Implement CI/CD pipelines**
6. **Use secrets management**
7. **Set up reverse proxy (Traefik/Nginx)**

## 🤝 Contributing

When modifying Docker configurations:

1. Test locally with `docker-compose up --build`
2. Verify health checks pass
3. Check image sizes with `docker images`
4. Ensure security best practices
5. Update this documentation

---

**Note**: This configuration is optimized for production use with minimal image sizes, enhanced security, and performance optimizations.
