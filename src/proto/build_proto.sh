#!/bin/bash

PROTO_DIR=./src/proto

# Generate TypeScript code (.ts)
yarn run proto-loader-gen-types \
    --longs=String \
    --enums=String \
    --defaults \
    --oneofs \
    --outDir=$PROTO_DIR \
    --grpcLib=@grpc/grpc-js \
    ./src/proto/*.proto
