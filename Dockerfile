# Use the official Node.js image as base
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (better layer caching)
COPY package.json package-lock.json ./

# Install only production dependencies first
RUN npm ci --only=production

# Copy the entire project
COPY . .

# Install all dependencies including devDependencies
RUN npm ci

# Build the Next.js app
RUN npm run build

# Use a smaller Node.js image for production
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose port 3000
EXPOSE 3000

# Start Next.js app
CMD ["npm", "run", "start"]
