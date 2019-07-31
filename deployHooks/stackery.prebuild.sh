#!/bin/bash

for i in src/*; do echo transpiling $i function; (cd $i; npm run build); done