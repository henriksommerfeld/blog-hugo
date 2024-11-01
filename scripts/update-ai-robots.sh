#!/usr/bin/env bash

set -eo pipefail

scriptDir=$(dirname -- "$(readlink -f -- "${BASH_SOURCE[0]}")")
robots_txt_path="$scriptDir/../static/robots.txt"
temp_file=$(mktemp)
trap 'rm -f $temp_file' 0 2 3 15
curl -s "https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/refs/heads/main/robots.txt" -o "$temp_file"

lead='^# Begin ai.robots.txt$'
tail='^# End ai.robots.txt$'
sed --in-place -e "/$lead/,/$tail/{ /$lead/{p; r $temp_file
        }; /$tail/p; d }" "$robots_txt_path"
