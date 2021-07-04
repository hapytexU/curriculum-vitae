#!/bin/bash

qst=$(curl 'https://api.stackexchange.com/2.2/users/67579/answers?order=desc&sort=activity&site=stackoverflow&filter=total' -q 2>/dev/null --output - | gunzip | jq -r '.total')
echo $qst
