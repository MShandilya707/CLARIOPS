# Deployment Guide

This guide covers deploying the ClariOps API to various platforms.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] OpenAI API key obtained and tested
- [ ] WhatsApp Business account set up
- [ ] SSL certificate (HTTPS required for webhooks)
- [ ] Domain name or public URL
- [ ] Database configured (if using persistence)

## Local Development with ngrok

Perfect for testing WhatsApp integration locally.

### Steps

1. **Start the API server:**
```bash
npm run dev
```

2. **Install and start ngrok:**
```bash
npm install -g ngrok
ngrok http 3001
```

3. **Configure WhatsApp webhook:**
   - Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)
   - Go to Meta Developer Console → WhatsApp → Configuration
   - Set Webhook URL: `https://abc123.ngrok.io/webhook`
   - Set Verify Token: (from your `.env`)
   - Subscribe to `messages`

4. **Test by sending a message to your WhatsApp Business number**

**Note:** ngrok URLs change on restart. Update webhook URL each time.

## Heroku Deployment

### Prerequisites
- Heroku account
- Heroku CLI installed

### Steps

1. **Create Heroku app:**
```bash
heroku create clariops-api
```

2. **Set environment variables:**
```bash
heroku config:set NODE_ENV=production
heroku config:set OPENAI_API_KEY=your_key
heroku config:set WHATSAPP_PHONE_NUMBER_ID=your_id
heroku config:set WHATSAPP_ACCESS_TOKEN=your_token
heroku config:set WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_verify_token
```

3. **Add Procfile:**
Create `server/Procfile`:
```
web: npm start
```

4. **Deploy:**
```bash
git subtree push --prefix server heroku main
```

5. **Configure WhatsApp webhook:**
   - Use: `https://your-app.herokuapp.com/webhook`

6. **Monitor logs:**
```bash
heroku logs --tail
```

### Scaling
```bash
heroku ps:scale web=2
```

## AWS EC2 Deployment

### Prerequisites
- AWS account
- EC2 instance (t2.micro or larger)
- SSH key pair

### Steps

1. **Launch EC2 instance:**
   - Ubuntu 22.04 LTS
   - Security group: Allow ports 22 (SSH), 80 (HTTP), 443 (HTTPS)

2. **SSH into instance:**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. **Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

4. **Clone and setup:**
```bash
git clone https://github.com/MShandilya707/CLARIOPS.git
cd CLARIOPS/server
npm install
npm run build
```

5. **Configure environment:**
```bash
nano .env
# Add your environment variables
```

6. **Start with PM2:**
```bash
pm2 start dist/index.js --name clariops-api
pm2 startup
pm2 save
```

7. **Setup Nginx reverse proxy:**
```bash
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/clariops
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/clariops /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

8. **Setup SSL with Let's Encrypt:**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

9. **Configure WhatsApp webhook:**
   - Use: `https://your-domain.com/webhook`

### Monitoring
```bash
pm2 logs clariops-api
pm2 monit
```

## Google Cloud Run

### Prerequisites
- Google Cloud account
- gcloud CLI installed
- Docker installed

### Steps

1. **Create Dockerfile:**
Create `server/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

2. **Create .dockerignore:**
Create `server/.dockerignore`:
```
node_modules
npm-debug.log
.env
dist
*.md
```

3. **Build and push:**
```bash
gcloud builds submit --tag gcr.io/your-project/clariops-api
```

4. **Deploy:**
```bash
gcloud run deploy clariops-api \
  --image gcr.io/your-project/clariops-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="NODE_ENV=production,OPENAI_API_KEY=your_key,WHATSAPP_PHONE_NUMBER_ID=your_id,WHATSAPP_ACCESS_TOKEN=your_token,WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_token"
```

5. **Get URL and configure webhook:**
```bash
gcloud run services describe clariops-api --format='value(status.url)'
```

## DigitalOcean App Platform

### Steps

1. **Connect repository:**
   - Go to DigitalOcean App Platform
   - Create new app from GitHub
   - Select repository and `server` directory

2. **Configure environment:**
   - Set source directory: `server`
   - Set build command: `npm run build`
   - Set run command: `npm start`

3. **Add environment variables:**
   - Add all required env vars from `.env.example`

4. **Deploy:**
   - App Platform will auto-deploy

5. **Get URL and configure webhook:**
   - Use the provided App Platform URL

## Docker Compose (Self-Hosted)

### docker-compose.yml

```yaml
version: '3.8'

services:
  api:
    build: ./server
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - WHATSAPP_PHONE_NUMBER_ID=${WHATSAPP_PHONE_NUMBER_ID}
      - WHATSAPP_ACCESS_TOKEN=${WHATSAPP_ACCESS_TOKEN}
      - WHATSAPP_WEBHOOK_VERIFY_TOKEN=${WHATSAPP_WEBHOOK_VERIFY_TOKEN}
    restart: unless-stopped
    volumes:
      - ./server/logs:/app/logs
    networks:
      - clariops-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - api
    networks:
      - clariops-network

networks:
  clariops-network:
    driver: bridge
```

### Deploy

```bash
docker-compose up -d
```

## Environment Variables Management

### Development
Use `.env` file (never commit!)

### Production Options

#### 1. Platform-specific
- Heroku: `heroku config:set`
- AWS: EC2 user data or Systems Manager Parameter Store
- Google Cloud: Secret Manager

#### 2. Environment variable manager
```bash
# Install dotenv-vault
npm install -g dotenv-vault

# Login and sync
dotenv-vault login
dotenv-vault push
```

## Post-Deployment Steps

1. **Test webhook endpoint:**
```bash
curl https://your-domain.com/api/health
```

2. **Verify WhatsApp webhook:**
   - Meta Console should show "Verified" status

3. **Send test message:**
   - Send a WhatsApp message to your business number
   - Check logs for processing

4. **Monitor logs:**
```bash
# Heroku
heroku logs --tail

# AWS/PM2
pm2 logs

# Docker
docker-compose logs -f
```

5. **Set up monitoring:**
   - Enable error tracking (Sentry, Rollbar)
   - Set up uptime monitoring (UptimeRobot)
   - Configure alerts

## Security Best Practices

### 1. Environment Variables
- Never commit `.env` to git
- Use secrets management in production
- Rotate tokens regularly

### 2. HTTPS
- Always use HTTPS in production
- WhatsApp requires HTTPS for webhooks
- Use valid SSL certificates

### 3. Rate Limiting
Add rate limiting middleware:
```bash
npm install express-rate-limit
```

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 4. Helmet.js
Add security headers:
```bash
npm install helmet
```

```typescript
import helmet from 'helmet';
app.use(helmet());
```

### 5. CORS
Configure CORS properly:
```typescript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  optionsSuccessStatus: 200
}));
```

## Monitoring and Logging

### Application Monitoring

#### Sentry
```bash
npm install @sentry/node
```

```typescript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV
});
```

#### Winston Logger
```bash
npm install winston
```

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Infrastructure Monitoring

- **Uptime:** UptimeRobot, Pingdom
- **Performance:** New Relic, Datadog
- **Logs:** Loggly, Papertrail, CloudWatch

## Scaling Strategies

### Vertical Scaling
- Upgrade server resources (CPU, RAM)
- Good for initial growth

### Horizontal Scaling
- Add more server instances
- Use load balancer
- Session storage in Redis

### Database Scaling
- Read replicas
- Connection pooling
- Caching layer (Redis)

### Queue System
```
Webhook → Redis Queue → Workers → LLM
```

Benefits:
- Handle traffic spikes
- Retry failed messages
- Better error handling

## Backup and Recovery

### 1. Database Backups
```bash
# PostgreSQL
pg_dump dbname > backup.sql

# Automated daily backups
crontab -e
0 2 * * * pg_dump dbname > /backups/$(date +\%Y\%m\%d).sql
```

### 2. Configuration Backups
- Store env vars in secrets manager
- Version control all code
- Document manual configuration steps

### 3. Disaster Recovery Plan
1. Maintain staging environment
2. Test restore procedures
3. Document recovery steps
4. Keep contact list updated

## Cost Optimization

### 1. OpenAI
- Use GPT-3.5-turbo (cheaper than GPT-4)
- Set max_tokens limit
- Cache common responses
- Monitor usage

### 2. Infrastructure
- Right-size servers
- Use spot instances (AWS)
- Auto-scaling rules
- CDN for static assets

### 3. WhatsApp
- Understand pricing model
- Optimize message volume
- Use templates for common responses

## Troubleshooting

### Webhook not receiving messages
1. Check webhook URL is publicly accessible
2. Verify HTTPS certificate is valid
3. Check webhook verification token
4. Review Meta Console webhook status
5. Check server logs for errors

### OpenAI errors
1. Verify API key is valid
2. Check quota and billing
3. Monitor rate limits
4. Check error messages in logs

### High response times
1. Check LLM API latency
2. Monitor server resources
3. Check network connectivity
4. Review concurrent requests

### Memory leaks
1. Monitor memory usage over time
2. Check for unclosed connections
3. Review session cleanup logic
4. Profile with Node.js tools

## Support

For deployment issues:
- Create an issue on GitHub
- Contact: support@clariops.com
- Check documentation: https://docs.clariops.com
