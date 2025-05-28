#!/bin/bash

echo "🛑 Stopping Docker Compose Services..."
echo "======================================="

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

stop_service() {
    local service_path=$1
    local service_name=$(basename "$service_path")
    
    echo "📦 Stopping $service_name..."
    cd "$service_path" && docker-compose -f docker-compose.dev.yml down
    cd - > /dev/null
}

echo "🔧 Stopping microservices..."
services_count=0
if [ -d "$PROJECT_ROOT/apps" ]; then
    for service_dir in "$PROJECT_ROOT/apps"/*; do
        if [ -d "$service_dir" ] && [ -f "$service_dir/docker-compose.dev.yml" ]; then
            stop_service "$service_dir"
            ((services_count++))
        fi
    done
fi

[ $services_count -eq 0 ] && echo "⚠️  No services found" || echo "✅ Stopped $services_count services"

echo "🏠 Stopping root infrastructure..."
cd "$PROJECT_ROOT"
if [ -f "docker-compose.dev.yml" ]; then
    docker-compose -f docker-compose.dev.yml down
    echo "✅ Root infrastructure stopped"
else
    echo "⚠️  No docker-compose.dev.yml found in project root"
fi

echo ""
echo "🎉 All services stopped!" 