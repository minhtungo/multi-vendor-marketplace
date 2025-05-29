#!/bin/bash

echo "🚀 Starting Docker Compose Services..."
echo "======================================="

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

start_service() {
    local service_path=$1
    local service_name=$(basename "$service_path")
    
    echo "📦 Starting $service_name..."
    cd "$service_path" && docker-compose -f docker-compose.dev.yml up -d
    cd - > /dev/null
}

echo "🏠 Starting root infrastructure..."
cd "$PROJECT_ROOT"
if [ -f "docker-compose.dev.yml" ]; then
    docker-compose -f docker-compose.dev.yml up -d || exit 1
    echo "✅ Root infrastructure started"
else
    echo "⚠️  No docker-compose.dev.yml found in project root"
fi


echo "🔧 Starting microservices..."
services_count=0
if [ -d "$PROJECT_ROOT/apps" ]; then
    for service_dir in "$PROJECT_ROOT/apps"/*; do
        if [ -d "$service_dir" ] && [ -f "$service_dir/docker-compose.dev.yml" ]; then
            start_service "$service_dir"
            ((services_count++))
        fi
    done
fi

[ $services_count -eq 0 ] && echo "⚠️  No services found" || echo "✅ Started $services_count services"

echo ""
echo "🎉 All services started!"
echo ""
echo "📋 Summary of all running services:"
echo "===================================="
docker ps --format "table {{.Names}}\t{{.Ports}}" --filter "status=running"
echo ""
echo "📋 Check status: docker ps"
echo "📋 Stop all: ./scripts/stop-services.sh" 