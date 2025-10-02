#!/bin/bash
# Test script for ClariOps API

API_URL="http://localhost:3001"

echo "Testing ClariOps API..."
echo ""

# Test 1: Health Check
echo "1. Testing Health Check..."
curl -s "${API_URL}/api/health" | jq .
echo ""
echo ""

# Test 2: Generate Response (without OpenAI key)
echo "2. Testing LLM Response Generation..."
curl -s -X POST "${API_URL}/api/generate-response" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are your pricing plans?",
    "conversationId": "test_123"
  }' | jq .
echo ""
echo ""

# Test 3: Root endpoint
echo "3. Testing Root Endpoint..."
curl -s "${API_URL}/" | jq .
echo ""
echo ""

echo "Tests completed!"
