#!/bin/sh
which clay
if [ $? -eq 0 ]; then
    rm -rf build
    clay build
    cd build
    git init
    git config user.name "Festa di Solidarieta'"
    git config user.email info@festasolidarieta.it
    git add -A
    git commit -m "deploy static website"
    git push -u git@github.com:festasolidarieta/festasolidarieta.github.io master:master --force
fi
