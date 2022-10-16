#!/bin/zsh
(kitty -T bb-filesync-transpile -e "/home/rhi/code/bitburner-scripts/tp.sh" &)
(kitty -T bb-filesync-watch -e "/home/rhi/code/bitburner-scripts/wa.sh" &)
